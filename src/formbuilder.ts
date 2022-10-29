import toDoManipulator from "./todomanipulator";
import formGetter from "./formgetter";

const formBuilder = (() => {
  const createCloseButton = (formDiv:HTMLDivElement) => {
    const closeButtonDiv:HTMLDivElement = document.createElement('div');
    closeButtonDiv.setAttribute('id', 'closebuttondiv');
    const closeButton:HTMLButtonElement = document.createElement('button');
    closeButton.setAttribute('id', 'closebutton');
    closeButton.innerHTML = '<span class="material-symbols-outlined">close</span>';
    closeButton.addEventListener(('click'), () => {
      formDiv.style.display = 'none';
      content.classList.remove('blurred');
    });
    closeButtonDiv.appendChild(closeButton);
    return closeButtonDiv;
  }
  const labelCreator = (forElement: string, labelText: string) => {
    const label:HTMLLabelElement = document.createElement('label');
    label.setAttribute('for', forElement);
    label.textContent = labelText;
    return label;
  }
  const inputFieldCreator = (fieldType: string, fieldName: string, fieldValue:string = 'empty') => {
    const field:HTMLInputElement = document.createElement('input');
    field.setAttribute('type', fieldType);
    field.setAttribute('name', fieldName);
    field.setAttribute('id', fieldName);
    if (fieldValue !== 'empty') {
      field.setAttribute('value', fieldValue);
    }
    return field;
  }
  const radioCreator = (radioName: string, radioOptions: string[]) => {
    const inputDiv:HTMLDivElement = document.createElement('div');
    inputDiv.classList.add('inputdiv');
    inputDiv.appendChild(labelCreator('radiocontainer', 'Priority:'));
    const radioDiv:HTMLDivElement = document.createElement('div');
    radioDiv.setAttribute('id', 'radiocontainer');
    radioOptions.forEach((option) => {
      const radioButton:HTMLInputElement = document.createElement('input');
      radioButton.setAttribute('type', 'radio');
      radioButton.setAttribute('name', radioName);
      radioButton.setAttribute('value', option);
      radioButton.setAttribute('id', option);
      const radioLabel:HTMLLabelElement = document.createElement('label');
      radioLabel.setAttribute('for', option);
      radioLabel.textContent = option[0].toUpperCase() + option.substring(1);
      radioDiv.appendChild(radioButton);
      radioDiv.appendChild(radioLabel);
    })
    inputDiv.appendChild(radioDiv);
    return inputDiv
  }
  const buttonCreator = () => {
    const submitButton:HTMLButtonElement = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'todosubmit');
    submitButton.textContent = 'Add';
    return submitButton;
  }
  const inputCreator = (fieldType: string, fieldName: string, labelText: string) => {
    const inputDiv:HTMLDivElement = document.createElement('div');
    inputDiv.classList.add('inputdiv');
    inputDiv.appendChild(labelCreator(fieldName, labelText));
    inputDiv.appendChild(inputFieldCreator(fieldType, fieldName));
    return inputDiv;
  }
  const buildForm = () => {
    const priorities:string[] = ['low', 'standard', 'high'];
    const formDiv:HTMLDivElement = document.createElement('div');
    formDiv.setAttribute('id', 'formdiv');
    const formHeading:HTMLHeadingElement = document.createElement('h2');
    formHeading.setAttribute('id', 'formheading');
    formHeading.textContent = 'Add a new ToDo';
    const form:HTMLFormElement = document.createElement('form');
    form.appendChild(inputCreator('text', 'todotitle', 'Title:'));
    form.appendChild(inputCreator('text', 'todocontent', 'Content:'))
    form.appendChild(inputCreator('date', 'tododate', 'Due date:'));
    form.appendChild(radioCreator('todopriority', priorities));
    form.appendChild(buttonCreator());
    formDiv.appendChild(createCloseButton(formDiv));
    formDiv.appendChild(formHeading);
    formDiv.appendChild(form);
    form.addEventListener(('submit'), (e) => {
      const toDoData = formGetter.getFormData(e);
      toDoManipulator.createToDo(toDoData[0], toDoData[1], toDoData[2], toDoData[3]);
    });
    return formDiv;
  };
  return { buildForm };
})()

export default formBuilder;