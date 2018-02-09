import googlemap from 'load-google-maps-api';
import Calendar from './Calendar';
import Day from './Day';
import DOM from './DOM';
import Search from './SearchRedemption';
import axios from 'axios';
import PopupDefined from './PopupDefined';

export default class GoogleMapAPI {
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
    axios({
        method: 'post',
        url: miloAPI,
        data: form
      })
    // axios.get('_data/data.json')
      .then(response => {
        this.search = new Search({
          fnChange: () => {
            this.handleSearchResult(this.search.result);
          },
          fnGetData: () => {
            return response.data;
          }
        });
        this.storeArr = response.data.storeInfo;
        this.init();
      })
      .catch(error => {
        console.log(error);
      });

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
      zoom: 15
    });
    this.initPopupList();
    this.popupList.forEach((item, i) => {
      this.registerEventPopup(item);
    });
  }

  initPopupList() {
    let Popup = new PopupDefined(google.maps.OverlayView.prototype, this.map)._popup;
    this.storeArr.forEach((item, i) => {
      let popup = new Popup(new google.maps.LatLng(item.location.lat, item.location.lng), i, item);
      popup.setContent(item.address, item.opentime, item.gift);
      popup.setMap(this.map);
      this.popupList.push(popup);
    });
  }

  registerEventPopup(item) {
    let dom = new DOM();
    dom.addMultiEvent(item.content, ['click', 'touchend'], (e) => {
      e.stopPropagation();
      this.eventPopup(item);
    });
    dom.addMultiEvent(item.link, ['click', 'touchend'], (e) => {
      e.stopPropagation();
      this.displayCalendar(item);
    });
    dom.addMultiEvent(item.popupClose, ['click', 'touchend'], (e) => {
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

  displayCalendar(item) {
    let calendar = new Calendar();
    item.storeEl.opendates.forEach(function (strDate) {
      strDate = strDate.split('-');
      calendar.addActiveDay(Number(strDate[0]), Number(strDate[1]), Number(strDate[2]));
    });
    calendar.updateCalendar();
    calendar.drawCalendar();
    calendar.show();
  }


  handleSearchResult(searchResult) {
    if (searchResult) {
      if(!this.isBoundLatLng) {
        let latLng = searchResult.split(' ');
        this.map.panTo({
          lat: Number(latLng[0]),
          lng: Number(latLng[1])
        })
      } else {
        let bounds = new google.maps.LatLngBounds();
        this.storeArr.forEach(item => {
          if(item.city === this.search.city) {
            let latLng = new google.maps.LatLng(item.location);
            bounds.extend(latLng);
          }
        });
        this.map.fitBounds(bounds);
        this.map.panToBounds(bounds);
        if(this.map.getZoom() > 17) {
          this.map.setZoom(17);
        }
      }
    } else {
      this.clearParticle();
      this.drawOnMap(this.search.myPosition);
    }
  }

  drawOnMap(position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.map.setCenter(pos);
    this.marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });
    this.circle = new google.maps.Circle({
      strokeColor: '#000',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: '#222',
      fillOpacity: 0.3,
      center: pos,
      map: this.map,
      radius: 2000
    });
  }

  clearParticle() {
    this.marker && this.marker.setMap(null);
    this.circle && this.circle.setMap(null);
  }
}