import dateConverter from './dateconverter';

const domManipulator = (() => {
  const content = document.getElementById('content');
  
  const createToDoDate = (date) => {
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

  const createPriorityDiv = (priority) => {
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
    checkbox.innerHTML = '&#10003'
    return checkbox;
  };
  const buildToDoConent = (toDoObject) => {
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

  // Main functions to be returned
  const homePageBuilder = () => {
    const header = document.createElement('div');
    header.setAttribute('id', 'header');
    const toDoDiv = document.createElement('div');
    toDoDiv.setAttribute('id', 'tododiv');
    const checkmark = document.createElement('div');
    checkmark.setAttribute('id', 'checkmark');
    checkmark.innerHTML = '&#10003';
    const logo = document.createElement('div');
    logo.setAttribute('id', 'logo');
    logo.textContent = 'To Do';
    header.appendChild(checkmark);
    header.appendChild(logo);
    content.appendChild(header);
    content.appendChild(toDoDiv);
  }
  const toDoBuilder = (toDoObject) => {
    const toDoDiv = document.getElementById('tododiv');
    const toDo = document.createElement('div');
    toDo.classList.add('todo');
    const chechboxDiv = document.createElement('div');
    chechboxDiv.appendChild(addCheckBox());
    toDo.appendChild(chechboxDiv);
    toDo.appendChild(buildToDoConent(toDoObject));
    toDoDiv.appendChild(toDo);
  }
  return { homePageBuilder, toDoBuilder };
})();

export default domManipulator;