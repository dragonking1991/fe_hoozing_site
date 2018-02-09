// import axios from 'axios';
// import Calendar from './Calendar';
// import Global from './Global';
// import Modal from './Modal';
// import DOM from './DOM';
// export default class SearchRedemption {
//   constructor(options) {
//     this.options = options || {};
//     this.element = document.getElementById('location');
//     this.btnList = document.querySelector('.btn-list-location');
//     this.listLocationWrapper = document.querySelector('.list-location-wrapper');
//     this.badge = document.querySelector('.badge-list-location');
//     this.result = this.element.value;
//     this.data = this.options.fnGetData();
//     this.initLocationOptions();
//     this.event(this.options.fnChange);
//   }

//   initLocationOptions() {
//     let listOptions = [];
//     this.data.storeInfo.forEach(item => {
//       if (!this.checkExistElement(item.city, listOptions) && item.default) {
//         listOptions.push({
//           location: item.location,
//           city: item.city
//         });
//       }
//     });

//     listOptions.sort(function(a, b) {
//       let nameA = a.city.toUpperCase();
//       let nameB = b.city.toUpperCase();
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }
//       return 0;
//     });
//     this.setDefaultLocation(listOptions);
//   }

//   setDefaultLocation(listOptions) {
//     listOptions.forEach(item => {
//       let dom = new DOM();
//       let optionDOM = dom.createDOM('option', 'location-default');
//       optionDOM.value = `${item.location.lat} ${item.location.lng}`;
//       optionDOM.innerHTML = `at ${item.city}`;
//       this.element.appendChild(optionDOM);
//     });
//   }

//   checkExistElement(el, arr) {
//     let isExist = false;
//     if (arr.length > 0 && Array.isArray(arr)) {
//       arr.forEach(item => {
//         if (item === el) {
//           isExist = true;
//         }
//       });
//     }
//     return isExist ? true : false;
//   }

//   event(fnChange) {
//     this.element.addEventListener('change', () => {
//       this.removePlaceholder();
//       // detect if need to get current position
//       if (this.element.value === '') {
//         this.requiredMyLocation(fnChange);
//       } else {
//         this.notRequiredMyLocation(fnChange);
//       }
//     });
//     this.btnList.addEventListener('click', (e) => {
//       e.stopPropagation();
//       this.listLocationWrapper.classList.toggle('show');
//     });
//     document.getElementById('map').addEventListener('click', () => {
//       this.listLocationWrapper.classList.remove('show');
//     });
//   }

//   removePlaceholder() {
//     if(this.element.options[0].value === 'remove') {
//       this.element.removeChild(this.element.options[0]);
//     }
//   }

//   requiredMyLocation(callback) {
//     let glob = new Global();
//     glob.getCurrentPos((position) => {
//       this.myPosition = position;
//       let form = new FormData();
//       form.append("json_data", JSON.stringify({
//         access_token: accessToken,
//         action: 'get_store',
//         data: {
//           lng: this.myPosition.coords.longitude,
//           lat: this.myPosition.coords.latitude
//         }
//       }));
//       axios({
//         method: 'post',
//         url: miloAPI,
//         data: form
//       }).then(res => {
//         this.NearestStore = res.data;
//         this.setBadge();
//         this.result = this.element.value;
//         this.city = this.element.options[this.element.selectedIndex].text.slice(3);
//         this.showHideBtnList();
//         this.appendListLocation();
//         this.hideListLocation();
//         callback && callback();
//       });
//     }, (flag) => {
//       this.handleLocationError(flag)
//     });
//   }

//   notRequiredMyLocation(callback) {
//     this.result = this.element.value;
//     this.city = this.element.options[this.element.selectedIndex].text.slice(3);
//     this.showHideBtnList();
//     this.hideListLocation();
//     callback && callback();
//   }
//   setBadge() {
//     this.badge.innerHTML = this.NearestStore.storeInfo.length;
//   }

//   showHideBtnList() {
//     if (this.result === '' && this.btnList.className === 'btn-list-location') {
//       this.btnList.classList.add('show');
//     } else {
//       this.btnList.classList.remove('show');
//     }
//   }

//   hideListLocation() {
//     if (this.result) {
//       this.listLocationWrapper.classList.remove('show');
//     }
//   }

//   appendListLocation() {
//     // reset list
//     this.listLocationWrapper.innerHTML = '';
//     this.tableLocation = document.createElement('table');
//     this.rowTitle = document.createElement('tr');
//     this.tableLocation.appendChild(this.rowTitle);
//     this.listTitle = ['Address', 'Opentime', 'Gift'];
//     this.listTitle.forEach((item) => {
//       let thNode = document.createElement('th');
//       thNode.innerHTML = item;
//       this.rowTitle.appendChild(thNode);
//     });
//     this.listLocationWrapper.appendChild(this.tableLocation);
//     this.NearestStore.storeInfo.forEach((item) => {
//       let currRow = document.createElement('tr');
//       this.tableLocation.appendChild(currRow);
//       let node1 = document.createElement('td');
//       let node2 = document.createElement('td');
//       let node3 = document.createElement('td');
//       node1.innerHTML = `${item.address}<br/>`;
//       if (item.isOpen) {
//         node2.innerHTML = item.opentime;
//         node3.innerHTML = item.gift;
//       } else {
//         let linkNode = document.createElement('a');
//         linkNode.href = '#';
//         linkNode.innerHTML = 'Check opening calendar >';
//         linkNode.className = 'link';
//         this.registerEventForLink(linkNode, item);
//         node1.appendChild(linkNode);
//         node2.innerHTML = 'CLOSE NOW';
//         node3.innerHTML = '-';
//       }

//       currRow.appendChild(node1);
//       currRow.appendChild(node2);
//       currRow.appendChild(node3);
//       this.registerEventForRow(currRow, item);
//     });
//   }
//   registerEventForLink(link, item) {
//     link.addEventListener('click', () => {
//       this.displayCalendar(item);
//     });
//   }

//   registerEventForRow(row, item) {
//     row.addEventListener('click', () => {
//       this.rowEvent(item);
//     });
//   }

//   rowEvent(item) {
//     this.result = `${item.location.lat} ${item.location.lng}`;
//     this.options.fnChange && this.options.fnChange();
//   }

//   displayCalendar(item) {
//     let calendar = new Calendar();

//     item.opendates.forEach(function (strDate) {
//       strDate = strDate.split('-');
//       calendar.addActiveDay(Number(strDate[0]), Number(strDate[1]), Number(strDate[2]));
//     });

//     calendar.updateCalendar();
//     calendar.drawCalendar();
//     calendar.show();
//   }


//   handleLocationError(browserHasGeolocation) {
//     let notify = new Modal();
//     let errorText = browserHasGeolocation ? errorNotify : errorBrowse;
//     notify.setContent(errorText);
//     notify.open();
//   }
// }
