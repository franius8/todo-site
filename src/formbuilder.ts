import toDoManipulator from "./todomanipulator";
import formHandler from "./formhandler";
import dateConverter from "./dateconverter";
import domManipulator from "./dom-manipulator";

const formBuilder = (() => {
  const priorities:string[] = ['Low', 'Standard', 'High'];
  const projectPriorities:string[] = ['Normal', 'Urgent'];

  const content:HTMLElement = (document.getElementById('content') || document.createElement('content'));
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
  const inputFieldCreator = (fieldType: string, fieldName: string, fieldValue = 'empty', required:boolean) => {
    const field:HTMLInputElement = document.createElement('input');
    field.setAttribute('type', fieldType);
    field.setAttribute('name', fieldName);
    field.setAttribute('id', fieldName);
    if (required === true) {
      field.setAttribute('required', 'true');
    }
    if (fieldValue !== 'empty') {
      field.setAttribute('value', fieldValue);
    }
    return field;
  }
  const radioCreator = (radioName: string, radioOptions: string[], checkedValue:string = null) => {
    const inputDiv:HTMLDivElement = document.createElement('div');
    inputDiv.classList.add('inputdiv');
    inputDiv.appendChild(labelCreator('radiocontainer', 'Priority:'));
    const radioDiv:HTMLDivElement = document.createElement('div');
    radioDiv.classList.add('radiocontainer');
    radioOptions.forEach((option) => {
      const radioButton:HTMLInputElement = document.createElement('input');
      radioButton.setAttribute('type', 'radio');
      radioButton.setAttribute('name', radioName);
      radioButton.setAttribute('value', option);
      radioButton.setAttribute('id', option);
      if (option === checkedValue) {
        radioButton.setAttribute('checked', 'checked');
      }
      const radioLabel:HTMLLabelElement = document.createElement('label');
      radioLabel.setAttribute('for', option);
      radioLabel.textContent = option[0].toUpperCase() + option.substring(1);
      radioDiv.appendChild(radioButton);
      radioDiv.appendChild(radioLabel);
    })
    inputDiv.appendChild(radioDiv);
    return inputDiv
  }
  const createSubmitButton = () => {
    const submitButton:HTMLButtonElement = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'todosubmit');
    submitButton.textContent = 'Add';
    return submitButton;
  }
  const inputCreator = (fieldType: string, fieldName: string, labelText: string, required = true) => {
    const inputDiv:HTMLDivElement = document.createElement('div');
    inputDiv.classList.add('inputdiv');
    inputDiv.appendChild(labelCreator(fieldName, labelText));
    inputDiv.appendChild(inputFieldCreator(fieldType, fieldName, 'empty', required));
    return inputDiv;
  }
  const editInputCreator = (fieldType: string, fieldName: string, labelText: string, required = true, fieldValue: string) => {
    const field:HTMLDivElement = inputCreator(fieldType, fieldName, labelText, required);
    const inputField:HTMLInputElement = field.querySelector(`#${fieldName}`);
    inputField.value = fieldValue;
    return field;
  }
  const buildForm = () => {
    const formDiv:HTMLDivElement = document.createElement('div');
    formDiv.setAttribute('id', 'formdiv');
    const formHeading:HTMLHeadingElement = document.createElement('h2');
    formHeading.classList.add('formheading');
    formHeading.textContent = 'Add a new ToDo';
    const form:HTMLFormElement = document.createElement('form');
    form.appendChild(inputCreator('text', 'todotitle', 'Title:'));
    form.appendChild(inputCreator('text', 'todocontent', 'Content (optional):', false))
    form.appendChild(inputCreator('date', 'tododate', 'Due date:'));
    form.appendChild(radioCreator('todopriority', priorities));
    form.appendChild(createSubmitButton());
    formDiv.appendChild(createCloseButton(formDiv));
    formDiv.appendChild(formHeading);
    formDiv.appendChild(form);
    form.addEventListener(('submit'), (e) => { 
      formHandler.handleFormSubmission(e);
      content.classList.remove('blurred');
    });
    return formDiv;
  };
  const buildEditForm = (e:MouseEvent) => {
    const target:HTMLElement = e.target as HTMLElement;
    const targetParent:HTMLElement = (<HTMLElement>(target.parentNode));
    const toDoDiv:HTMLElement = (<HTMLElement>(targetParent.parentNode));
    const toDoContent:HTMLElement = toDoDiv.querySelector('.todocontent');
    const toDo = toDoManipulator.findTodDo(Number(target.getAttribute('objectid')));
    const { heading:headerContent, text:textContent, date:dateContent, priority:priorityContent} = toDo;
    toDoContent.innerHTML = '';
    toDoContent.classList.add('duringedit');
    toDoContent.classList.remove('todocontent');
    const form = document.createElement('form');
    form.classList.add('todocontent');
    form.setAttribute('id', 'editform');
    form.appendChild(editInputCreator('text', 'todotitleedit', 'Title:', true, headerContent));
    form.appendChild(editInputCreator('text', 'todocontentedit', 'Content (optional):', false, textContent));
    form.appendChild(editInputCreator('date', 'tododateedit', 'Due date:', true, dateConverter.convertToInputFormat(dateContent)));
    form.appendChild(radioCreator('todopriorityedit', priorities, priorityContent));
    toDoContent.appendChild(form);
    targetParent.innerHTML = '';
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancelbutton');
    cancelButton.innerHTML = '<span class="material-symbols-outlined">undo</span>';
    cancelButton.addEventListener(('click'), () => {
      domManipulator.displayToDos(toDoManipulator.getToDoAry());
    });
    const acceptButton = document.createElement('button');
    acceptButton.classList.add('acceptbutton');
    acceptButton.setAttribute('type', 'submit')
    acceptButton.setAttribute('form', 'editform');
    acceptButton.innerHTML = '<span class="material-symbols-outlined">check</span>';
    form.addEventListener(('submit'), (e) => {
      formHandler.handleEditFormSubmission(e);
    })
    targetParent.appendChild(cancelButton);
    targetParent.appendChild(acceptButton);
  }
  const buildNewProjectForm = () => {
    const formDiv:HTMLDivElement = document.createElement('div');
    formDiv.setAttribute('id', 'projectformdiv');
    const formHeading:HTMLHeadingElement = document.createElement('h2');
    formHeading.classList.add('formheading');
    formHeading.textContent = 'Add a new Project';
    const form:HTMLFormElement = document.createElement('form');
    form.appendChild(inputCreator('text', 'projectname', 'Name:'));
    form.appendChild(inputCreator('date', 'projectdate', 'Due date:'));
    form.appendChild(radioCreator('projectpriority', projectPriorities));
    form.appendChild(createSubmitButton());
    formDiv.appendChild(createCloseButton(formDiv));
    formDiv.appendChild(formHeading);
    formDiv.appendChild(form);
    form.addEventListener(('submit'), (e) => {
      formHandler.handleNewProjectFormSubmission(e);
      content.classList.remove('blurred');
    });
    return formDiv;
  }
  const buildAddProjectToDoForm = (e:MouseEvent, iD:number, toDoDiv:HTMLDivElement) => {
    const formDiv:HTMLDivElement = document.createElement('div');
    formDiv.setAttribute('id', 'projecttodosformdiv');
    formDiv.style.display = 'block';
    const formHeading:HTMLHeadingElement = document.createElement('h2');
    formHeading.classList.add('formheading');
    formHeading.textContent = 'Add new ToDos to Project';
    formDiv.appendChild(createCloseButton(formDiv));
    formDiv.appendChild(formHeading);
    if (toDoManipulator.getToDoAry().length > 0) {
    const form:HTMLFormElement = document.createElement('form');
    const project = toDoManipulator.findProject(iD);
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('inputdiv');
    inputDiv.appendChild(labelCreator('projectcheckboxdiv', 'Select ToDos:'))
    const toDoIdAry = toDoManipulator.getToDoAry().map(a => a.iD);
    const toDoFormDiv:HTMLDivElement = document.createElement('div');
    toDoFormDiv.classList.add('projectcheckboxdiv');
    toDoIdAry.forEach((iD:number) => {
      const toDoCheckbox:HTMLInputElement = document.createElement('input');
      toDoCheckbox.setAttribute('type', 'checkbox');
      toDoCheckbox.setAttribute('id', `todocheckbox${iD}`);
      toDoCheckbox.setAttribute('value', `${iD}`);
      toDoCheckbox.setAttribute('name', 'projectcheckbox');
      if (project.getToDos().filter(toDo => toDo.iD === iD).length > 0) {
        toDoCheckbox.setAttribute('checked', 'true');
      }
      const toDoLabel:HTMLLabelElement = document.createElement('label');
      toDoLabel.setAttribute('for', `todocheckbox${iD}`);
      const toDoHeading = document.createElement('div');
      toDoHeading.textContent = toDoManipulator.findTodDo(iD).heading;
      const toDoDate = document.createElement('div');
      toDoDate.classList.add('formtododate');
      toDoDate.innerHTML = `<span class="material-symbols-outlined">calendar_month</span> 
          ${dateConverter.convertToString(toDoManipulator.findTodDo(iD).date)}`
      toDoLabel.appendChild(toDoHeading);
      toDoLabel.appendChild(toDoDate);
      toDoFormDiv.appendChild(toDoCheckbox);
      toDoFormDiv.appendChild(toDoLabel);
    });
    inputDiv.appendChild(toDoFormDiv);
    form.appendChild(inputDiv);
    form.appendChild(createSubmitButton());
    formDiv.appendChild(form);
    form.addEventListener(('submit'), (e) => {
      formHandler.handleAddProjectToDosFormSubmission(e, iD);
      content.classList.remove('blurred');
      toDoDiv.remove();
      const projectContainer = document.getElementById(iD.toString()).parentNode;
      const projectToDoDiv = document.createElement('div');
      projectToDoDiv.style.display = 'block';
      projectToDoDiv.classList.add('projecttododiv');
      projectToDoDiv.setAttribute('id', `projecttododiv${iD}`);
      const newToDosDiv = domManipulator.createToDosDiv(iD);
      projectToDoDiv.appendChild(newToDosDiv);
      projectContainer.appendChild(projectToDoDiv);
    });
  } else {
    const noToDos:HTMLDivElement = document.createElement('div');
    noToDos.textContent = 'There are no ToDos to add to this Project.';
    formDiv.appendChild(noToDos);
  }
    return formDiv;
  }

  return { buildForm, buildEditForm, buildNewProjectForm, buildAddProjectToDoForm };
})()

export default formBuilder;