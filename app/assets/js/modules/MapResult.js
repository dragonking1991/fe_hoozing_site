import googlemap from 'load-google-maps-api';
import DOM from './DOM';
// import Search from './SearchRedemption';
import axios from 'axios';
import PopupDefined from './PopupDefined';

export default class MapResult {
  constructor() {
    this.popupList = [];
    this.myLocation = {};
    this.isBoundLatLng = false; // auto center and auto zoom group marker
    let form = new FormData();
    form.append('json_data', JSON.stringify({
      access_token: accessToken,
      action: 'get_data',
      data: ''
    }));
    this.storeArr = storeInfo;
    this.init();
  }
  
  init() {
    googlemap({
      key: 'AIzaSyBzlEqFy__g-R9CoVzOfdxTAFBdLAIbTOM'
    }).then(result => {
      let google = {
        maps: result
      };
      this.drawPopupOnMap();
    }).catch(err => {
      console.log(err);
    });
  }

  drawPopupOnMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.storeArr[0].location,
      zoom: 15,
      gestureHandling: 'greedy'
    });
    this.initPopupList();
    this.popupList.forEach((item, i) => {
      this.registerEventPopup(item);
    });

    const thisMap = this.map;

    $(document).on('click', '.select-home', function() {
      $('.thumb-item').removeClass('selected');
      $(this).parents('.thumb-item').addClass('selected');
      let lat = $(this).parents('.thumb-item').attr('data-lat');
      let lng = $(this).parents('.thumb-item').attr('data-lng');
      let code = $(this).parents('.thumb-item').attr('data-code');
      let latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng)); 
      thisMap.panTo(latLng);

      $('.popup-bubble-content').removeClass('show');
      $('.popup-bubble-content').find('.popup__price').removeClass('hide');
      $('.popup-bubble-content').find('.popup-wrapper').removeClass('show-popup'); 

      $('#'+ code).addClass('show');
      $('#'+ code).find('.popup__price').addClass('hide');
      $('#'+ code).find('.popup-wrapper').addClass('show-popup'); 
    });
  }


  initPopupList() {
    let Popup = new PopupDefined(google.maps.OverlayView.prototype, this.map)._popup;
    this.storeArr.forEach((item, i) => {
      let popup = new Popup(new google.maps.LatLng(item.location.lat, item.location.lng), i, item);
      popup.setContent(item.code, item.name, item.price, item.linkAp, item.images) ;
      // console.log(item.code + " " + item.name + " " + item.price + " " + item.linkAp +" " + item.images[1]);
      popup.setMap(this.map);
      this.popupList.push(popup);
    });
  }

  registerEventPopup(item) {
    let ele = new DOM();
    ele.addMultiEvent(item.content, ['click', 'touchend'], (e) => {
      e.stopPropagation();
      this.eventPopup(item);
      let idContent = item.content.id;
      $('.thumb-item').removeClass('selected');
      $('.thumb-item[data-code="'+ idContent + '"]').addClass('selected');
    });
    ele.addMultiEvent(item.popupClose, ['click', 'touchend'], (e) => {
      e.stopPropagation();
      item.close();
    });
  }

  eventPopup(popup) {
    this.popupList.forEach(item => {
      if (item !== popup) {
        item.close();
      }
    })
    popup.open();
  }


}
