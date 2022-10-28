import dateConverter from './dateconverter';
import toDo from './todo';
import toDoManipulator from './todomanipulator';

interface ToDo {
  heading: string;
  text: string;
  date: Date;
  priority: string;
  iD:number;
  markAsDone: Function;
  getDoneStatus: Function;
}

const domManipulator = (() => {
  const content:HTMLElement = (document.getElementById('content') || document.createElement('content'));
  // Subfunctions for helper functions
  const createToDoDate = (date: Date) => {
    const toDoDateDiv:HTMLDivElement = document.createElement('div');
    toDoDateDiv.classList.add('tododate');
    const toDoDateIcon:HTMLDivElement = document.createElement('div');
    toDoDateIcon.innerHTML = '<span class="material-symbols-outlined">calendar_month</span>';
    const toDoDate:HTMLDivElement = document.createElement('div');
    const dayDifference:number = dateConverter.getDayDifference(date);
    if (dayDifference >= 0) {
      toDoDate.textContent = dateConverter.convertToString(date) + ' (' + dateConverter.getDayDifference(date) + ' days left)';  
    } else {
      toDoDateDiv.classList.add('missedtodo');
      toDoDate.textContent = dateConverter.convertToString(date) + ' (' + Math.abs(dateConverter.getDayDifference(date)) + ' days ago)';
    }
    toDoDateDiv.appendChild(toDoDateIcon);
    toDoDateDiv.appendChild(toDoDate);
    return toDoDateDiv;
  };

  const createPriorityDiv = (priority: string) => {
    const priorityDiv:HTMLDivElement = document.createElement('div');
    priorityDiv.classList.add('todopriority');
    const priorityCircle:HTMLDivElement = document.createElement('div');
    priorityCircle.classList.add('prioritycircle');
    if (priority === 'Standard') {
      priorityCircle.style.backgroundColor = 'orange';
    } else if (priority === 'Low') {
      priorityCircle.style.backgroundColor = 'blue';
    } else if (priority === 'High') {
      priorityCircle.style.backgroundColor = 'red';
    };
    const priorityText:HTMLDivElement = document.createElement('div');
    priorityText.textContent = priority + ' priority';
    
    priorityDiv.appendChild(priorityCircle);
    priorityDiv.appendChild(priorityText);
    return priorityDiv;
  }
  
  // Helper functions that are not returned
  const addCheckBox = () => {
    const checkbox:HTMLDivElement = document.createElement('div');
    checkbox.classList.add('checkbox');
    checkbox.innerHTML = '&#10003';
    checkbox.addEventListener('click', (e) => {
      const target = (<HTMLElement>e.target);
      const targetParent = (<HTMLElement>(target).parentNode);
      const newField = target.cloneNode(true);
      targetParent.replaceChild(newField, target);
      const toDoDiv = (<HTMLElement>targetParent.parentNode);
      toDoDiv.remove();
      toDoDiv.classList.remove('todo');
      toDoDiv.classList.add('donetodo');
      const doneDiv:HTMLElement = document.getElementById('donediv');
      doneDiv.appendChild(toDoDiv);
      });
    return checkbox;
  };

  const addLabelStripe = (priority: string) => {
    const labelStripe:HTMLDivElement = document.createElement('div');
    labelStripe.classList.add('labelstripe');
    if (priority === 'Standard') {
      labelStripe.style.backgroundColor = 'orange';
    } else if (priority === 'Low') {
      labelStripe.style.backgroundColor = 'blue';
    } else if (priority === 'High') {
      labelStripe.style.backgroundColor = 'red';
    };
    return labelStripe;
  }
  const buildToDoConent = (toDoObject: ToDo) => {
    const toDoContent:HTMLDivElement = document.createElement('div');
    toDoContent.classList.add('todocontent')
    const toDoHeader:HTMLDivElement = document.createElement('div');
    toDoHeader.classList.add('todoheader');
    toDoHeader.textContent = toDoObject.heading;
    const toDoText:HTMLDivElement = document.createElement('div');
    toDoText.classList.add('todotext');
    toDoText.textContent = toDoObject.text;
    toDoContent.appendChild(toDoHeader);
    toDoContent.appendChild(toDoText);
    toDoContent.appendChild(createToDoDate(toDoObject.date));
    toDoContent.appendChild(createPriorityDiv(toDoObject.priority));
    return toDoContent;
  }

  const buildLogo = () => {
    const logodiv:HTMLDivElement = document.createElement('div');
    logodiv.setAttribute('id', 'logodiv');
    const checkmark:HTMLDivElement = document.createElement('div');
    checkmark.setAttribute('id', 'checkmark');
    checkmark.innerHTML = '&#10003';
    const logo:HTMLDivElement = document.createElement('div');
    logo.setAttribute('id', 'logo');
    logo.textContent = 'To Do';
    logodiv.appendChild(checkmark);
    logodiv.appendChild(logo);
    return logodiv;
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
    field.setAttribute('name', fieldName);
    if (fieldValue !== 'empty') {
      field.setAttribute('value', fieldValue);
    }
    return field;
  }

  const inputCreator = (fieldType: string, fieldName: string, labelText: string) => {
    const inputDiv:HTMLDivElement = document.createElement('div');
    inputDiv.classList.add('inputdiv');
    inputDiv.appendChild(labelCreator(fieldName, labelText));
    inputDiv.appendChild(inputFieldCreator(fieldType, fieldName));
    return inputDiv;
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

  const clearToDoDiv = () => {
    const toDoDiv:HTMLElement = document.getElementById('tododiv');
    toDoDiv.textContent = '';
  }

    const createToDoButtons = () => {
      const buttonDiv:HTMLDivElement = document.createElement('div');
      buttonDiv.classList.add('buttondiv');
      const editButton:HTMLButtonElement = document.createElement('button');
      editButton.classList.add('editbutton');
      editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>'
      const deleteButton:HTMLButtonElement = document.createElement('button');
      deleteButton.classList.add('deletebutton');
      deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
      deleteButton.addEventListener(('click'), (e) => {
        const target = (<HTMLElement>e.target);
        const toDo = (<HTMLElement>(<HTMLElement>(target).parentNode).parentNode);
        const iD:number = Number(toDo.id);
        if (confirm('Are you sure you want to delete that?')) {
          toDoManipulator.deleteToDo(iD);
          displayToDos(toDoManipulator.getToDoAry());  
        };
      });
      buttonDiv.appendChild(editButton);
      buttonDiv.appendChild(deleteButton);
      return buttonDiv;
    }

    const createCloseButton = (formDiv:HTMLDivElement) => {
      const closeButtonDiv:HTMLDivElement = document.createElement('div');
      closeButtonDiv.setAttribute('id', 'closebuttondiv');
      const closeButton:HTMLButtonElement = document.createElement('button');
      closeButton.setAttribute('id', 'closebutton');
      closeButton.innerHTML = '<span class="material-symbols-outlined">close</span>';
      closeButton.addEventListener(('click'), () => formDiv.style.display = 'none')
      closeButtonDiv.appendChild(closeButton);
      return closeButtonDiv;
    }

  // Main functions to be returned
  const homePageBuilder = () => {
    const header:HTMLDivElement = document.createElement('div');
    header.setAttribute('id', 'header');
    const toDoDiv:HTMLDivElement = document.createElement('div');
    toDoDiv.setAttribute('id', 'tododiv');
    header.appendChild(buildLogo());
    const addNewButton:HTMLButtonElement = document.createElement('button');
    addNewButton.setAttribute('id', 'addnewbutton');
    addNewButton.textContent = 'Add ToDo';
    header.appendChild(addNewButton);
    const doneHeader:HTMLDivElement = document.createElement('div');
    doneHeader.setAttribute('id', 'doneheader');
    doneHeader.textContent = 'Done';
    const doneDiv:HTMLDivElement = document.createElement('div');
    doneDiv.setAttribute('id', 'donediv');
    content.appendChild(header);
    content.appendChild(toDoDiv);
    content.appendChild(doneHeader);
    content.appendChild(doneDiv);
    content.appendChild(formBuilder());
    const formDiv:HTMLElement = document.getElementById('formdiv');
    addNewButton.addEventListener(('click'), () => formDiv.style.display = 'block');
  }
  const toDoBuilder = (toDoObject: ToDo) => {
    const toDoDiv:HTMLElement = (document.getElementById('tododiv') || document.createElement('tododiv'));
    const toDo:HTMLDivElement = document.createElement('div');
    toDo.classList.add('todo');
    toDo.setAttribute('id', toDoObject.iD.toString());
    toDo.appendChild(addLabelStripe(toDoObject.priority));
    const chechboxDiv:HTMLDivElement = document.createElement('div');
    chechboxDiv.classList.add('checkboxdiv');
    chechboxDiv.appendChild(addCheckBox());
    toDo.appendChild(chechboxDiv);
    toDo.appendChild(buildToDoConent(toDoObject));
    toDo.appendChild(createToDoButtons());
    toDoDiv.appendChild(toDo);
  }
  const formBuilder = () => {
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
    form.appendChild(radioCreator('divpriority', priorities));
    form.appendChild(buttonCreator());
    formDiv.appendChild(createCloseButton(formDiv));
    formDiv.appendChild(formHeading);
    formDiv.appendChild(form);
    return formDiv;
  };
  const displayToDos = ( toDoAry:ToDo[] ) => {
    clearToDoDiv();
    let resultAry:ToDo[] = toDoAry.sort((a,b) => a.date.getTime() - b.date.getTime());
    resultAry.forEach((toDo:ToDo) => toDoBuilder(toDo));
  }
  return { homePageBuilder, toDoBuilder, formBuilder, displayToDos };
})();

export default domManipulator;