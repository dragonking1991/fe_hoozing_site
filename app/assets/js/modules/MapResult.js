import googlemap from 'load-google-maps-api';
import DOM from './DOM';
// import Search from './SearchRedemption';
import axios from 'axios';
import PopupDefined from './PopupDefined';

import $ from 'jquery';
import slick from 'slick-carousel';
import 'slick-carousel/slick/slick.css';

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

    var _this = this;

    $('.page li').on('click', function(){
      _this.refreshPopupList();
      _this.initPopupList();
      setTimeout(function(){
        _this.popupList.forEach((item, i) => {
          _this.registerEventPopup(item);
        });
      },500);
    });
  }
  
  init() {
    googlemap({
      key: 'AIzaSyBzlEqFy__g-R9CoVzOfdxTAFBdLAIbTOM'
    }).then(result => {
      let google = {
        maps: result
      };
      // console.log(this.drawPopupOnMap())
      this.drawPopupOnMap();
    }).catch(err => {
      console.log(err);
    });
  }

  drawPopupOnMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.storeArr[0].location,
      zoom: 15,
      animation: google.maps.Animation.DROP,
      gestureHandling: 'cooperative'
    });

    this.initPopupList();
    this.popupList.forEach((item, i) => {
      this.registerEventPopup(item);
    });

    const thisMap = this.map;

    var styleControl = document.getElementById('style-selector-control');
    thisMap.controls[google.maps.ControlPosition.BOTTOM].push(styleControl);

    document.getElementById('all').addEventListener('click', function() {
      thisMap.setOptions({styles: styles['default']});
    });
    document.getElementById('social-buiding').addEventListener('click', function() {
      thisMap.setOptions({styles: styles['hideTransit']});
    });
    document.getElementById('transit').addEventListener('click', function() {
      thisMap.setOptions({styles: styles['hideBuilding']});
    });

    var styles = {
      default: null,
      hideBuilding: [{
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
      }],
      hideTransit: [{
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      }]
    };


    $(document).on('click', '.select-home', function() {
      if ( $('[data-layout="mapview"]').hasClass('active')) {
        $('.thumb-item').removeClass('selected');
        $(this).parents('.thumb-item').addClass('selected');
        let lat = $(this).parents('.thumb-item').attr('data-lat');
        let lng = $(this).parents('.thumb-item').attr('data-lng');
        let code = $(this).parents('.thumb-item').attr('data-code');
        let latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng)); 
        console.log(thisMap)
        thisMap.panTo(latLng);

        $('.popup-bubble-content').removeClass('show');
        $('.popup-bubble-content').find('.popup__price').removeClass('hide');
        $('.popup-bubble-content').find('.popup-wrapper').removeClass('show-popup'); 

        $('#'+ code).addClass('show');
        $('#'+ code).find('.popup__price').addClass('hide');
        $('#'+ code).find('.popup-wrapper').addClass('show-popup'); 
        $('#'+ code).find('.thumb-list').slick('refresh');
      }
    });
  }

  refreshPopupList() {
    this.popupList.forEach((item, i) => {
      item.onRemove();
    });
  }

  initPopupList() {
    let Popup = new PopupDefined(google.maps.OverlayView.prototype, this.map)._popup;
    this.storeArr.forEach((item, i) => {
      let popup = new Popup(new google.maps.LatLng(item.location.lat, item.location.lng), i, item);
      popup.setContent(item.code, item.name, item.price, item.linkAp, item.images) ;
      // console.log(item.code + " " + item.name + " " + item.price + " " + item.linkAp +" " + item.images[1]);
      popup.setMap(this.map);
      popup.onRemove();
      this.popupList.push(popup);
    });
  }

  registerEventPopup(item) {
    let ele = new DOM();
    ele.addMultiEvent(item.content, ['click', 'touchend'], (e) => {
      // e.stopPropagation();
      this.eventPopup(item);
      let idContent = item.content.id;
      let lat = $('.thumb-item[data-code="'+ idContent + '"]').data('lat');
      let lng = $('.thumb-item[data-code="'+ idContent + '"]').data('lng');

      let zoom = this.map.getZoom();
      let meters_per_pixel = 156543.03392 * Math.cos(parseFloat(lat)* Math.PI / 180) / Math.pow(2, zoom);
      let downCenter =  meters_per_pixel / 1000 * 2;
      let latLng = new google.maps.LatLng(parseFloat(lat) + downCenter , parseFloat(lng)); 
      this.map.panTo(latLng);

      let heightControl = $('.search__list').outerHeight() +$('.page').outerHeight();

      let posItem = $('.thumb-item[data-code="'+ idContent + '"]').position().top - heightControl - 50;
      $('.tab--reduce').animate({scrollTop: $('.tab--reduce').scrollTop() + posItem}, 500);  

      $('.thumb-item').removeClass('selected');
      $('.thumb-item[data-code="'+ idContent + '"]').addClass('selected');
    });
    ele.addMultiEvent(item.popupPrice, ['click', 'touchend'], (e) => {
      $(item.thumbList).slick('refresh');
      setTimeout(function(){
      },200);
    });

    ele.addMultiEvent(item.popupClose, ['click', 'touchend'], (e) => {
      e.stopPropagation();
      item.close();
    });

    // $(item.thumbList).slick({
    //   fade: false,
    //   dots:true,
    //   infinite: true,
    //   arrows: true,
    //   autoplay: false,
    //   autoplaySpeed: 2000,
    //   slidesToShow: 1,
    //   slidesToScroll: 1
    // });
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
