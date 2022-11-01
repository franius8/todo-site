import domManipulator from "./dom-manipulator";

const helper = (() => {
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
  return { addNavListeners };
})();

export default helper