const domManipulator = (() => {
  const content = document.getElementById('content');
  // Helper functions that are not returned
  const addCheckBox = () => {
    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox');
    checkbox.innerHTML = '&#10003'
    return checkbox;
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
  const toDoBuilder = () => {
    const toDoDiv = document.getElementById('tododiv');
    const toDo = document.createElement('div');
    toDo.classList.add('todo');
    const chechboxDiv = document.createElement('div');
    chechboxDiv.appendChild(addCheckBox());
    const toDoContent = document.createElement('div');
    toDoContent.textContent = 'lorem ipsum'
    toDo.appendChild(chechboxDiv);
    toDo.appendChild(toDoContent);
    toDoDiv.appendChild(toDo);
  }
  return { homePageBuilder, toDoBuilder };
})();

export default domManipulator;