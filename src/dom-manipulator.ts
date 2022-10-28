import dateConverter from './dateconverter';

interface ToDo {
  heading: string;
  text: string;
  date: Date;
  priority: string;
  markAsDone: Function;
  getDoneStatus: Function;
}

const domManipulator = (() => {
  const content = (document.getElementById('content') || document.createElement('content'));
  // Subfunctions for helper functions
  const createToDoDate = (date: Date) => {
    const toDoDateDiv = document.createElement('div');
    toDoDateDiv.classList.add('tododate');
    const toDoDateIcon = document.createElement('div');
    toDoDateIcon.innerHTML = '<span class="material-symbols-outlined">calendar_month</span>';
    const toDoDate = document.createElement('div');
    const dayDifference = dateConverter.getDayDifference(date);
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
    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add('todopriority');
    const priorityCircle = document.createElement('div');
    priorityCircle.classList.add('prioritycircle');
    if (priority === 'Standard') {
      priorityCircle.style.backgroundColor = 'orange';
    } else if (priority === 'Low') {
      priorityCircle.style.backgroundColor = 'blue';
    } else if (priority === 'High') {
      priorityCircle.style.backgroundColor = 'red';
    };
    const priorityText = document.createElement('div');
    priorityText.textContent = priority + ' priority';
    
    priorityDiv.appendChild(priorityCircle);
    priorityDiv.appendChild(priorityText);
    return priorityDiv;
  }
  
  // Helper functions that are not returned
  const addCheckBox = () => {
    const checkbox = document.createElement('div');
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
      const doneDiv = document.getElementById('donediv');
      doneDiv.appendChild(toDoDiv);
      });
    return checkbox;
  };

  const addLabelStripe = (priority: string) => {
    const labelStripe = document.createElement('div');
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
    const toDoContent = document.createElement('div');
    toDoContent.classList.add('todocontent')
    const toDoHeader = document.createElement('div');
    toDoHeader.classList.add('todoheader');
    toDoHeader.textContent = toDoObject.heading;
    const toDoText = document.createElement('div');
    toDoText.classList.add('todotext');
    toDoText.textContent = toDoObject.text;
    toDoContent.appendChild(toDoHeader);
    toDoContent.appendChild(toDoText);
    toDoContent.appendChild(createToDoDate(toDoObject.date));
    toDoContent.appendChild(createPriorityDiv(toDoObject.priority));
    return toDoContent;
  }

  const buildLogo = () => {
    const logodiv = document.createElement('div');
    logodiv.setAttribute('id', 'logodiv');
    const checkmark = document.createElement('div');
    checkmark.setAttribute('id', 'checkmark');
    checkmark.innerHTML = '&#10003';
    const logo = document.createElement('div');
    logo.setAttribute('id', 'logo');
    logo.textContent = 'To Do';
    logodiv.appendChild(checkmark);
    logodiv.appendChild(logo);
    return logodiv;
  }

  const labelCreator = (forElement: string, labelText: string) => {
    const label = document.createElement('label');
    label.setAttribute('for', forElement);
    label.textContent = labelText;
    return label;
  }
  
  const inputFieldCreator = (fieldType: string, fieldName: string, fieldValue:string = 'empty') => {
    const field = document.createElement('input');
    field.setAttribute('type', fieldType);
    field.setAttribute('name', fieldName);
    field.setAttribute('name', fieldName);
    if (fieldValue !== 'empty') {
      field.setAttribute('value', fieldValue);
    }
    return field;
  }

  const inputCreator = (fieldType: string, fieldName: string, labelText: string) => {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('inputdiv');
    inputDiv.appendChild(labelCreator(fieldName, labelText));
    inputDiv.appendChild(inputFieldCreator(fieldType, fieldName));
    return inputDiv;
  }

  const radioCreator = (radioName: string, radioOptions: string[]) => {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('inputdiv');
    inputDiv.appendChild(labelCreator('radiocontainer', 'Priority:'));
    const radioDiv = document.createElement('div');
    radioDiv.setAttribute('id', 'radiocontainer');
    radioOptions.forEach((option) => {
      const radioButton = document.createElement('input');
      radioButton.setAttribute('type', 'radio');
      radioButton.setAttribute('name', radioName);
      radioButton.setAttribute('value', option);
      radioButton.setAttribute('id', option);
      const radioLabel = document.createElement('label');
      radioLabel.setAttribute('for', option);
      radioLabel.textContent = option[0].toUpperCase() + option.substring(1);
      radioDiv.appendChild(radioButton);
      radioDiv.appendChild(radioLabel);
    })
    inputDiv.appendChild(radioDiv);
    return inputDiv
  }

  const buttonCreator = () => {
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'todosubmit');
    submitButton.textContent = 'Add';
    return submitButton;
  }

  // Main functions to be returned
  const homePageBuilder = () => {
    const header = document.createElement('div');
    header.setAttribute('id', 'header');
    const toDoDiv = document.createElement('div');
    toDoDiv.setAttribute('id', 'tododiv');
    header.appendChild(buildLogo());
    const addNewButton = document.createElement('button');
    addNewButton.setAttribute('id', 'addnewbutton');
    addNewButton.textContent = 'Add ToDo';
    header.appendChild(addNewButton);
    const doneHeader = document.createElement('div');
    doneHeader.setAttribute('id', 'doneheader');
    doneHeader.textContent = 'Done';
    const doneDiv = document.createElement('div');
    doneDiv.setAttribute('id', 'donediv');
    content.appendChild(header);
    content.appendChild(toDoDiv);
    content.appendChild(doneHeader);
    content.appendChild(doneDiv);
    content.appendChild(formBuilder());
    const formDiv = document.getElementById('formdiv');
    addNewButton.addEventListener(('click'), () => formDiv.style.display = 'block');
  }
  const toDoBuilder = (toDoObject: ToDo) => {
    const toDoDiv = (document.getElementById('tododiv') || document.createElement('tododiv'));
    const toDo = document.createElement('div');
    toDo.classList.add('todo');
    toDo.appendChild(addLabelStripe(toDoObject.priority));
    const chechboxDiv = document.createElement('div');
    chechboxDiv.appendChild(addCheckBox());
    toDo.appendChild(chechboxDiv);
    toDo.appendChild(buildToDoConent(toDoObject));
    toDoDiv.appendChild(toDo);
  }
  const formBuilder = () => {
    const priorities = ['low', 'standard', 'high'];
    const formDiv = document.createElement('div');
    formDiv.setAttribute('id', 'formdiv');
    const formHeading = document.createElement('h2');
    formHeading.setAttribute('id', 'formheading');
    formHeading.textContent = 'Add a new ToDo';
    const form = document.createElement('form');
    form.appendChild(inputCreator('text', 'todotitle', 'Title:'));
    form.appendChild(inputCreator('text', 'todocontent', 'Content:'))
    form.appendChild(inputCreator('date', 'tododate', 'Due date:'));
    form.appendChild(radioCreator('divpriority', priorities));
    form.appendChild(buttonCreator());
    formDiv.appendChild(formHeading);
    formDiv.appendChild(form);
    return formDiv;
  };
  return { homePageBuilder, toDoBuilder, formBuilder };
})();

export default domManipulator;