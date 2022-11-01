import dateConverter from './dateconverter';
import toDoManipulator from './todomanipulator';
import formBuilder from './formbuilder';

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
    if (dayDifference === 1) {
      toDoDate.textContent = dateConverter.convertToString(date) + ' (' + dateConverter.getDayDifference(date) + ' day left)';  
    } else if (dayDifference >= 0) {
      toDoDate.textContent = dateConverter.convertToString(date) + ' (' + dateConverter.getDayDifference(date) + ' days left)';  
    } else if (dayDifference === -1) {
      toDoDateDiv.classList.add('missedtodo');
      toDoDate.textContent = dateConverter.convertToString(date) + ' (' + Math.abs(dateConverter.getDayDifference(date)) + ' day ago)';
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
      const toDoDiviD:number = Number(toDoDiv.id);
      toDoManipulator.moveToDone(toDoDiviD);
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
  };

  const addNavListeners = () => {
    const navItems = document.querySelectorAll('.navitem');
    navItems.forEach((element) => {
      element.addEventListener(('click'), (e:MouseEvent) => {
        const iD = (<HTMLElement>(e.target)).id;
        switch (iD) {
          case 'homepagelink':
            domManipulator.homePageBuilder();
            break;
          case 'donelink':
            domManipulator.donePageBuilder();
            break;
          case 'projectlink':
            domManipulator.projectPageBuilder();
            break;
        } 
      });
    });
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

  const buildNavigationDiv = () => {
    const navigationDiv:HTMLDivElement = document.createElement('div');
    navigationDiv.setAttribute('id', 'navigationdiv');
    const homepageLink:HTMLDivElement = document.createElement('div');
    homepageLink.classList.add('navitem');
    homepageLink.setAttribute('id', 'homepagelink');
    homepageLink.innerHTML = '<span class="material-symbols-outlined">house</span> Homepage';
    const doneLink:HTMLDivElement = document.createElement('div');
    doneLink.innerHTML = '<span class="material-symbols-outlined">done</span> Done';
    doneLink.classList.add('navitem');
    doneLink.setAttribute('id', 'donelink');
    const projectLink:HTMLDivElement = document.createElement('div');
    projectLink.classList.add('navitem');
    projectLink.setAttribute('id', 'projectlink');
    projectLink.innerHTML = '<span class="material-symbols-outlined">assignment</span> Projects';
    navigationDiv.appendChild(homepageLink);
    navigationDiv.appendChild(doneLink);
    navigationDiv.appendChild(projectLink);
    return navigationDiv;
  }

  const clearContent = () => {
    content.textContent = '';
  }
  
  const clearToDoDiv = () => {
    const toDoDiv:HTMLElement = document.getElementById('tododiv');
    toDoDiv.textContent = '';
  }

  const clearDoneDiv = () => {
    const toDoDiv:HTMLElement = document.getElementById('donediv');
    toDoDiv.textContent = '';
  }

    const createToDoButtons = () => {
      const buttonDiv:HTMLDivElement = document.createElement('div');
      buttonDiv.classList.add('buttondiv');
      const editButton:HTMLButtonElement = document.createElement('button');
      editButton.classList.add('editbutton');
      editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>'
      editButton.addEventListener(('click'), (e) => {
        formBuilder.buildEditForm(e);
      });
      const deleteButton:HTMLButtonElement = document.createElement('button');
      deleteButton.classList.add('deletebutton');
      deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
      deleteButton.addEventListener(('click'), (e) => {
        const target = (<HTMLElement>e.target);
        const toDo = (<HTMLElement>(<HTMLElement>(target).parentNode).parentNode);
        const iD:number = Number(toDo.id);
        if (confirm('Are you sure you want to delete that?\n(This is an irreversible operation)')) {
          toDoManipulator.deleteToDo(iD);
          displayToDos(toDoManipulator.getToDoAry());  
        };
      });
      buttonDiv.appendChild(editButton);
      buttonDiv.appendChild(deleteButton);
      return buttonDiv;
    }

    const buildHeader = () => {
      const header:HTMLElement = document.createElement('header');
      header.setAttribute('id', 'header');
      header.appendChild(buildLogo());
      header.appendChild(buildNavigationDiv());
      const addNewButton:HTMLButtonElement = document.createElement('button');
      addNewButton.setAttribute('id', 'addnewbutton');
      addNewButton.textContent = 'Add ToDo';
      header.appendChild(addNewButton);
      return header
    }
  // Main functions to be returned
  const homePageBuilder = () => {
    clearContent();
    const toDoDiv:HTMLDivElement = document.createElement('div');
    toDoDiv.setAttribute('id', 'tododiv');
    content.appendChild(buildHeader());
    content.appendChild(toDoDiv);
    content.appendChild(formBuilder.buildForm());
    const addNewButton = document.getElementById('addnewbutton');
    const formDiv:HTMLElement = document.getElementById('formdiv');
    addNewButton.addEventListener(('click'), () => {
      formDiv.style.display = 'block';
      content.classList.add('blurred');
    });
    document.getElementById('homepagelink').classList.add('active');
    addNavListeners();
    displayToDos(toDoManipulator.getToDoAry());
  }
  const donePageBuilder = () => {
    clearContent();
    const doneDiv:HTMLDivElement = document.createElement('div');
    doneDiv.setAttribute('id', 'donediv');
    content.appendChild(buildHeader());
    content.appendChild(doneDiv);
    content.appendChild(formBuilder.buildForm());
    const addNewButton = document.getElementById('addnewbutton');
    const formDiv:HTMLElement = document.getElementById('formdiv');
    addNewButton.addEventListener(('click'), () => {
      formDiv.style.display = 'block';
      content.classList.add('blurred');
    });
    document.getElementById('donelink').classList.add('active');
    addNavListeners();
    displayDoneToDos(toDoManipulator.getDoneAry());
  }
  const projectPageBuilder = () => {
    clearContent();
    const projectDiv:HTMLDivElement = document.createElement('div');
    projectDiv.setAttribute('id', 'projectdiv');
    content.appendChild(buildHeader());
    content.appendChild(projectDiv);
    content.appendChild(formBuilder.buildForm());
    const addNewButton = document.getElementById('addnewbutton');
    const formDiv:HTMLElement = document.getElementById('formdiv');
    addNewButton.addEventListener(('click'), () => {
      formDiv.style.display = 'block';
      content.classList.add('blurred');
    });
    document.getElementById('projectlink').classList.add('active');
    addNavListeners();
  }
  const toDoBuilder = (toDoObject: ToDo, toDoDiv:HTMLElement, done:boolean = false) => {
    const toDo:HTMLDivElement = document.createElement('div');
    if (done === false) {
      toDo.classList.add('todo');
    } else {
      toDo.classList.add('donetodo')
    }
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
  const displayToDos = ( toDoAry:ToDo[] ) => {
    const toDoDiv:HTMLElement = (document.getElementById('tododiv') || document.createElement('tododiv'));
    clearToDoDiv();
    if (toDoAry.length === 0) {
      const actionDiv:HTMLDivElement = document.createElement('div');
      actionDiv.setAttribute('id', 'actiondiv');
      actionDiv.innerHTML = 'No ToDos yet. Time to <span id="addnew">add a new one</span>.';
      const addNewSpan = actionDiv.querySelector('#addnew');
      addNewSpan.addEventListener(('click'), () => {
        const formDiv:HTMLElement = document.getElementById('formdiv');
        formDiv.style.display = 'block';
        content.classList.add('blurred');
      })
      toDoDiv.appendChild(actionDiv);
      return;
    }
    let resultAry:ToDo[] = toDoAry.sort((a,b) => a.date.getTime() - b.date.getTime());
    resultAry.forEach((toDo:ToDo) => toDoBuilder(toDo, toDoDiv));
  }
  const displayDoneToDos = (doneAry:ToDo[] ) => { //Needs to be finished
    clearDoneDiv()
    const doneDiv = document.getElementById('donediv');
    let resultAry:ToDo[] = doneAry.sort((a,b) => a.date.getTime() - b.date.getTime());
    resultAry.forEach((toDo:ToDo) => toDoBuilder(toDo, doneDiv, true));
  }
  return { homePageBuilder, donePageBuilder, projectPageBuilder, displayToDos, displayDoneToDos };
})();

export default domManipulator;