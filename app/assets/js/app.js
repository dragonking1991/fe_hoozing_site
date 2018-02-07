import 'babel-polyfill';
import 'normalize-css';
// const FastClick = require('fastclick');
const moduleElements = document.querySelectorAll('[data-module]');


$(window).on('load', function() {
  for (let i = 0; i < moduleElements.length; i++) {
    let el = moduleElements[i];
    let name = el.getAttribute('data-module');

    if (/\s*,\s*/.test(name)) {

  	  // data-module="module1, module2"
    	let re = /\s*,\s*/;
    	let nameList = name.split(re);

    	for (let j = 0; j < nameList.length; j++) {
    		let Module = require(`./modules/${nameList[j]}`).default;
    		new Module(el)
    	}
    } else if (/\s/.test(name)) {

  	  // data-module="module1 module2"
    	let re = /\s/;
    	let nameList = name.split(re);
    	for (let j = 0; j < nameList.length; j++) {
    		let Module = require(`./modules/${nameList[j]}`).default;
    		new Module(el)
    	}
    } else {
  	  let Module = require(`./modules/${name}`).default;
  	  new Module(el)
    }
  }

  // export class to window
  let popupModule = new (require(`./modules/OpenPopup`).default)();
  window.popup = popupModule;

  let progressModule = new (require(`./modules/Progress`).default)();
  window.progress = progressModule;
});

