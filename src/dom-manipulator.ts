import dateConverter from './dateconverter';
import toDoManipulator from './todomanipulator';
import formBuilder from './formbuilder';

const domManipulator = (() => {
  const content:HTMLElement = (document.getElementById('content') || document.createElement('content'));
  
  // Subfunctions for helper functions
  const getPriorityColor = (priority:string) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Standard':
        return 'orange';
      case 'Low':
        return 'green';
      case 'Normal':
        return 'skyblue';
      case 'Urgent':
        return 'crimson';
     default:
        return 'gray';
    }
  }
  
  const createDateString = (date:Date, toDoDateDiv: HTMLElement) => {
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
    return toDoDate;
  }

  const buildElementDate = (date: Date) => {
    const toDoDateDiv:HTMLDivElement = document.createElement('div');
    toDoDateDiv.classList.add('tododate');
    const toDoDateIcon:HTMLDivElement = document.createElement('div');
    toDoDateIcon.innerHTML = '<span class="material-symbols-outlined">calendar_month</span>';
    toDoDateDiv.appendChild(toDoDateIcon);
    toDoDateDiv.appendChild(createDateString(date, toDoDateDiv));
    return toDoDateDiv;
  };

  const createPriorityCircle = (priority: string) => {
    const priorityCircle:HTMLDivElement = document.createElement('div');
    priorityCircle.classList.add('prioritycircle');
    priorityCircle.style.backgroundColor = getPriorityColor(priority);
    return priorityCircle;
  };
  
  const createPriorityDiv = (priority: string) => {
    const priorityDiv:HTMLDivElement = document.createElement('div');
    priorityDiv.classList.add('todopriority');
    priorityDiv.appendChild(createPriorityCircle(priority));
    const priorityText:HTMLDivElement = document.createElement('div');
    priorityText.textContent = priority + ' priority';
    priorityDiv.appendChild(priorityText);
    return priorityDiv;
  }

  const createNoToDosButton = (iD: number, toDosDiv: HTMLDivElement, length: number) => {
    const div = document.createElement('div');
    div.classList.add('notodosdiv');
    if (length === 0) {
      const noToDosDiv:HTMLDivElement = document.createElement('div');
      noToDosDiv.classList.add('notodos');
      noToDosDiv.textContent = 'No ToDos for this project yet';
      div.appendChild(noToDosDiv);
    }
    const noToDosButton:HTMLButtonElement = document.createElement('button');
    noToDosButton.classList.add('addtodobutton');
    noToDosButton.textContent = 'Add/Remove ToDos';
    noToDosButton.addEventListener('click', (e) => {
      content.appendChild(formBuilder.buildAddProjectToDoForm(e, iD, toDosDiv));
      content.classList.add('blurred');
    });
    div.appendChild(noToDosButton);
    return div
  }

  const createToDosDiv = (iD: number) => { 
    const toDosDiv:HTMLDivElement = document.createElement('div');
    toDosDiv.classList.add('projecttodoscontainer');
    const toDosAry = (toDoManipulator.findProject(iD) as Project).getToDos() as ToDo[];
      toDosDiv.appendChild(createNoToDosButton(iD, toDosDiv, toDosAry.length));
      toDosAry.forEach((toDo) => {
        projectToDoBuilder(toDo, toDosDiv);
    });
    return toDosDiv;
  }

  const createEditButton = (iD: string, type: string) => {
    const editButton:HTMLButtonElement = document.createElement('button');
      editButton.classList.add('editbutton');
      editButton.setAttribute('objectid', iD);
      editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';
      editButton.addEventListener(('click'), (e) => {
        if (type === 'project') {
          formBuilder.buildProjectEditForm(e);
        } else if (type === 'todo') {
          formBuilder.buildToDoEditForm(e, 'todo');
        } else {
          formBuilder.buildToDoEditForm(e, 'done');
        }
      });
      return editButton;
  }

  const createDeleteButton = (iD: string, type: string) => {
    const deleteButton:HTMLButtonElement = document.createElement('button');
      deleteButton.classList.add('deletebutton');
      deleteButton.setAttribute('objectid', iD);
      deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
      deleteButton.addEventListener(('click'), (e) => {
        const target = (<HTMLElement>e.target);
        const iD = Number(target.getAttribute('objectid'));
        if (confirm('Are you sure you want to delete that?\n(This is an irreversible operation)')) {
          toDoManipulator.deleteItem(iD)
          if (type === 'project') {
           displayProjects(toDoManipulator.getProjectAry());
          } else if (type === 'todo') {
          displayToDos(toDoManipulator.getToDoAry());  
        } else {
          displayDoneToDos(toDoManipulator.getDoneAry());
        }
      }});
      return deleteButton;
  };
  
  // Helper functions that are not returned
  const addRevert = () => {
    const revert:HTMLDivElement = document.createElement('div');
    revert.classList.add('checkbox');
    revert.innerHTML = '&#8617';
    revert.addEventListener('click', (e) => {
      const target = (<HTMLElement>e.target);
      const targetParent = (<HTMLElement>(target).parentNode);
      const doneDiv = (<HTMLElement>targetParent.parentNode);
      const doneDiviD = Number(doneDiv.id);
      toDoManipulator.revertDone(doneDiviD);
      displayDoneToDos(toDoManipulator.getDoneAry());
    });
    return revert;
  }
  
  const addCheckBox = () => {
    const checkbox:HTMLDivElement = document.createElement('div');
    checkbox.classList.add('checkbox');
    checkbox.innerHTML = '&#10003';
    checkbox.addEventListener('click', (e) => {
      const target = (<HTMLElement>e.target);
      const targetParent = (<HTMLElement>(target).parentNode);
      const toDoDiv = (<HTMLElement>targetParent.parentNode);
      const toDoDiviD = Number(toDoDiv.id);
      toDoManipulator.moveToDone(toDoDiviD);
      displayToDos(toDoManipulator.getToDoAry());
      });
    return checkbox;
  };

  const addNewButtonEventListener = () => {
    const addNewButton:HTMLButtonElement = document.getElementById('addnewbutton') as HTMLButtonElement;
    const formDiv:HTMLDivElement = document.getElementById('formdiv') as HTMLDivElement;
    addNewButton.addEventListener(('click'), () => {
      formDiv.style.display = 'block';
      content.classList.add('blurred');
    });
  }

  const addLabelStripe = (priority: string) => {
    const labelStripe:HTMLDivElement = document.createElement('div');
    labelStripe.classList.add('labelstripe');
    labelStripe.style.backgroundColor = getPriorityColor(priority);
    return labelStripe;
  };

  const addNavListeners = () => {
    const navItems = document.querySelectorAll('.navitem') as NodeListOf<HTMLDivElement>;
    navItems.forEach((element: HTMLDivElement) => {
      element.addEventListener(('click'), (e:MouseEvent) => {
        const iD = (<HTMLElement>(e.target)).id;
        switch (iD) {
          case 'homelink':
            domManipulator.homePageBuilder();
            break;
          case 'donelink':
            domManipulator.donePageBuilder();
            break;
          case 'projectslink':
            domManipulator.projectPageBuilder();
            break;
        } 
      });
    });
  };

  const buildElement = (type: string, object: object, propName: string) => {
    const toDoElement:HTMLDivElement = document.createElement('div');
    toDoElement.classList.add(`${type}${propName}`);
    toDoElement.textContent = object[propName as keyof object];
    return toDoElement;
  };

  const buildContent = (type: string, object: generalObject, propAry: string[]) => {
    const content:HTMLDivElement = document.createElement('div');
    content.classList.add(`${type}content`);
    propAry.forEach((prop) => {
      if (prop === 'date') {
        content.appendChild(buildElementDate(object.date as Date))
      } else if (prop === 'priority') {
        content.appendChild(createPriorityDiv(object.priority as string))
      } else {
        content.appendChild(buildElement(type, object, prop));
      }
    });
    return content;
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

  const buildLink = (linkName: string, linkIcon: string) => {
    const link:HTMLDivElement = document.createElement('div');
    link.classList.add('navitem');
    link.setAttribute('id', `${linkName}link`);
    const capitalizedLinkName = linkName.charAt(0).toUpperCase() + linkName.slice(1); 
    link.innerHTML = `<span class="material-symbols-outlined">${linkIcon}</span> ${capitalizedLinkName}`;
    return link
  }
  
  const buildNavigationDiv = () => {
    const navigationDiv:HTMLDivElement = document.createElement('div');
    navigationDiv.setAttribute('id', 'navigationdiv');
    navigationDiv.appendChild(buildLink('home', 'house'));
    navigationDiv.appendChild(buildLink('done', 'done'));
    navigationDiv.appendChild(buildLink('projects', 'assignment'));
    return navigationDiv;
  }

  const clearContent = () => {
    content.textContent = '';
  }
  
  const clearToDoDiv = () => {
    const toDoDiv:HTMLDivElement = document.getElementById('tododiv') as HTMLDivElement;
    toDoDiv.textContent = '';
  }

  const clearDoneDiv = () => {
    const toDoDiv:HTMLDivElement = document.getElementById('donediv') as HTMLDivElement;
    toDoDiv.textContent = '';
  }

  const clearProjectDiv = () => {
    const toDoDiv:HTMLDivElement = document.getElementById('projectdiv') as HTMLDivElement;
    toDoDiv.textContent = '';
  }

  const createButtons = (iD: string, type: string) => {
    const buttons:HTMLDivElement = document.createElement('div');
    buttons.classList.add('buttondiv');
    buttons.appendChild(createEditButton(iD, type));
    buttons.appendChild(createDeleteButton(iD, type));
    return buttons;
  }

  const createExpandButton = (iD:number) => {
      const expandButton:HTMLDivElement = document.createElement('div');
      expandButton.classList.add('expandbutton');
      expandButton.setAttribute('objectid', iD.toString());
      expandButton.innerHTML = '<span class="material-symbols-outlined">expand_more</span>';
      expandButton.addEventListener(('click'), () => {
        const projectDiv:HTMLDivElement = document.getElementById(iD.toString()) as HTMLDivElement;
        const toDosDiv = (<HTMLElement>(projectDiv.nextSibling));
        toDosDiv.textContent = '';
        toDosDiv.appendChild(createToDosDiv(iD));
        if (toDosDiv.style.display === 'none') {
          toDosDiv.textContent = '';
          toDosDiv.appendChild(createToDosDiv(iD));
          toDosDiv.style.display = 'block'
        } else {
          toDosDiv.style.display = 'none';
        } 
        projectDiv.classList.toggle('expanded');

      });
      return expandButton;
  }

  const buildAddNewButton = () => {
      const addNewButton:HTMLButtonElement = document.createElement('button');
      addNewButton.setAttribute('id', 'addnewbutton');
      addNewButton.textContent = 'Add ToDo';
      return addNewButton;
  }

  const buildHeader = () => {
      const header:HTMLElement = document.createElement('header');
      header.setAttribute('id', 'header');
      header.appendChild(buildLogo());
      header.appendChild(buildNavigationDiv());
      header.appendChild(buildAddNewButton());
      return header
  }

  const buildNewProjectButtonDiv = () => {
      const newProjectButtonDiv:HTMLDivElement = document.createElement('div');
      newProjectButtonDiv.setAttribute('id', 'newprojectbuttondiv');
      const newProjectButton:HTMLButtonElement = document.createElement('button');
      newProjectButton.setAttribute('id', 'newprojectbutton');
      newProjectButton.textContent = 'Add a new project';
      newProjectButtonDiv.appendChild(newProjectButton);
      return newProjectButtonDiv;
  }

  const buildProjectMiddleDiv = (projectObject: Project) => {
      const middleDiv:HTMLDivElement = document.createElement('div');
      middleDiv.classList.add('middlediv');
      const chechboxDiv:HTMLDivElement = document.createElement('div');
      chechboxDiv.classList.add('checkboxdiv');
      chechboxDiv.appendChild(addCheckBox());
      middleDiv.appendChild(chechboxDiv);
      middleDiv.appendChild(buildContent('project', projectObject as unknown as generalObject, ['name', 'date', 'priority']));
      middleDiv.appendChild(createButtons(projectObject.iD.toString(), 'project'));
      return middleDiv;
  }

  const buildProjectToDoDiv = (projectObject: Project) => {
      const projectToDoDiv = document.createElement('div');
      projectToDoDiv.classList.add('projecttododiv');
      projectToDoDiv.setAttribute('objectid', projectObject.iD.toString());
      projectToDoDiv.style.display = 'none';
      return projectToDoDiv;
  }

  const pageBuilder = (contentType: string, linkName:string) => {
      clearContent();
      content.appendChild(buildHeader());
      const div:HTMLDivElement = document.createElement('div');
      div.setAttribute('id', `${contentType}div`);
      content.appendChild(div);
      content.appendChild(formBuilder.buildForm());
      addNewButtonEventListener();
      (document.getElementById(`${linkName}link`) as HTMLDivElement).classList.add('active');
      addNavListeners();
  }

  // Main functions to be returned
  const homePageBuilder = () => {
    pageBuilder('todo', 'home');
    displayToDos(toDoManipulator.getToDoAry());
  }

  const donePageBuilder = () => {
    pageBuilder('done', 'done');
    displayDoneToDos(toDoManipulator.getDoneAry());
  }

  const projectPageBuilder = () => {
    clearContent();
    const projectDiv:HTMLDivElement = document.createElement('div');
    projectDiv.setAttribute('id', 'projectdiv');
    content.appendChild(buildHeader());
    if (toDoManipulator.getProjectAry().length > 0) {
      content.appendChild(buildNewProjectButtonDiv());
    }
    content.appendChild(projectDiv);
    content.appendChild(formBuilder.buildForm());
    content.appendChild(formBuilder.buildNewProjectForm());
    addNewButtonEventListener();
    if (toDoManipulator.getProjectAry().length > 0) {
      const addNewProjectButton:HTMLButtonElement = document.getElementById('newprojectbutton') as HTMLButtonElement;
      const projectFormDiv:HTMLElement = document.getElementById('projectformdiv') as HTMLDivElement;
      addNewProjectButton.addEventListener(('click'), () => {
        projectFormDiv.style.display = 'block';
        content.classList.add('blurred');
    });
  }
    (document.getElementById('projectslink') as HTMLDivElement).classList.add('active');
    addNavListeners();
    displayProjects(toDoManipulator.getProjectAry());
  }

  const toDoBuilder = (toDoObject: ToDo, toDoDiv:HTMLElement, done = false) => {
    const toDoID:string = toDoObject.iD.toString()
    const toDo:HTMLDivElement = document.createElement('div');
    done ? toDo.classList.add('donetodo') : toDo.classList.add('todo');
    toDo.setAttribute('id', toDoID);
    toDo.appendChild(addLabelStripe(toDoObject.priority));
    const middleDiv:HTMLDivElement = document.createElement('div');
    middleDiv.classList.add('middlediv');
    const chechboxDiv:HTMLDivElement = document.createElement('div');
    chechboxDiv.classList.add('checkboxdiv');
    done ? chechboxDiv.appendChild(addRevert()) : chechboxDiv.appendChild(addCheckBox());
    middleDiv.appendChild(chechboxDiv);
    middleDiv.appendChild(buildContent('todo', toDoObject as unknown as generalObject, ['heading', 'text', 'date', 'priority']));
    done ? middleDiv.appendChild(createButtons(toDoID, 'done')) : middleDiv.appendChild(createButtons(toDoID, 'todo'));
    toDo.appendChild(middleDiv);
    toDoDiv.appendChild(toDo);
  }

  const projectToDoBuilder = (toDoObject: ToDo, toDoDiv:HTMLElement) => {
    const toDoID:string = toDoObject.iD.toString()
    const toDo:HTMLDivElement = document.createElement('div');
    toDo.classList.add('projecttodo');
    toDo.setAttribute('id', toDoID);
    toDo.appendChild(addLabelStripe(toDoObject.priority));
    toDo.appendChild(buildContent('todo', toDoObject as unknown as generalObject, ['heading', 'text', 'date', 'priority']));
    toDoDiv.appendChild(toDo);
  }

  const projectBuilder = (projectObject: Project, projectDiv:HTMLElement) => {
    const projectContainer:HTMLDivElement = document.createElement('div');
    projectContainer.classList.add('projectcontainer');
    const project:HTMLDivElement = document.createElement('div');
    project.classList.add('project');
    project.setAttribute('id', projectObject.iD.toString());
    project.appendChild(addLabelStripe(projectObject.priority));
    project.appendChild(buildProjectMiddleDiv(projectObject));
    project.appendChild(createExpandButton(projectObject.iD));
    projectContainer.appendChild(project);
    projectContainer.appendChild(buildProjectToDoDiv(projectObject));
    projectDiv.appendChild(projectContainer);
  }

  const displayToDos = ( toDoAry:ToDo[] ) => {
    const toDoDiv:HTMLElement = (document.getElementById('tododiv') || document.createElement('tododiv'));
    clearToDoDiv();
    if (toDoAry.length === 0) {
      const actionDiv:HTMLDivElement = document.createElement('div');
      actionDiv.setAttribute('id', 'actiondiv');
      actionDiv.innerHTML = 'No ToDos yet. Time to <span id="addnew">add a new one</span>.';
      const addNewSpan = actionDiv.querySelector('#addnew') as HTMLSpanElement;
      addNewSpan.addEventListener(('click'), () => {
        const formDiv:HTMLDivElement = document.getElementById('formdiv') as HTMLDivElement;
        formDiv.style.display = 'block';
        content.classList.add('blurred');
      })
      toDoDiv.appendChild(actionDiv);
      return;
    }
    const resultAry:ToDo[] = toDoAry.sort((a,b) => a.date.getTime() - b.date.getTime());
    resultAry.forEach((toDo:ToDo) => toDoBuilder(toDo, toDoDiv));
  }

  const displayDoneToDos = (doneAry:ToDo[] ) => {
    clearDoneDiv()
    const doneDiv:HTMLDivElement = document.getElementById('donediv') as HTMLDivElement;
    if (doneAry.length === 0) {
      const actionDiv:HTMLDivElement = document.createElement('div');
      actionDiv.setAttribute('id', 'actiondiv');
      actionDiv.innerHTML = 'No ToDos marked as done.';
      doneDiv.appendChild(actionDiv);
      return;
    }
    const resultAry:ToDo[] = doneAry.sort((a,b) => a.date.getTime() - b.date.getTime());
    resultAry.forEach((toDo:ToDo) => toDoBuilder(toDo, doneDiv, true));
  }

  const displayProjects = (projectAry:Project[]) => {
    clearProjectDiv();
    const projectDiv = document.getElementById('projectdiv') as HTMLDivElement;
    if (projectAry.length === 0) {
      const actionDiv:HTMLDivElement = document.createElement('div');
      actionDiv.setAttribute('id', 'actiondiv');
      actionDiv.innerHTML = 'No Projects yet. Time to <span id="addnew">add a new one</span>.';
      const addNewSpan: HTMLSpanElement = actionDiv.querySelector('#addnew') as HTMLSpanElement;
      addNewSpan.addEventListener(('click'), () => {
        const formDiv:HTMLDivElement = document.getElementById('projectformdiv') as HTMLDivElement;
        formDiv.style.display = 'block';
        content.classList.add('blurred');
      });
      projectDiv.appendChild(actionDiv);
      return;
    }
    const resultAry:Project[] = projectAry.sort((a,b) => a.date.getTime() - b.date.getTime());
    resultAry.forEach((project:Project) => projectBuilder(project, projectDiv));
  }

  return { homePageBuilder, donePageBuilder, projectPageBuilder, displayToDos, displayDoneToDos, displayProjects, createToDosDiv };
})();

export default domManipulator;