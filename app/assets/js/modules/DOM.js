export default class DOM {
  constructor() {

  }
  appendMultiDOM(parentDOM, arrDOM) {
    if(parentDOM === null || parentDOM === undefined || arrDOM === []) {
      return false;
    } else {
      arrDOM.forEach((el) => {
        if(el !== null && el !== undefined) {
          parentDOM.appendChild(el);
        } else {
          return false;
        }
      })
      return true;
    }
  }

  createDOM(type, className) {
    let _thisDOM = document.createElement(type);
    _thisDOM.className = className;
    return _thisDOM;
  }

  addMultiEvent(element, listEvent, callback) {
    listEvent.forEach(evt => {
      element.addEventListener(evt, callback);
    });
  }
}