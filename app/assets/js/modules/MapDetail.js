import googlemap from 'load-google-maps-api';
import DOM from './DOM';
// import Search from './SearchRedemption';
import axios from 'axios';
import PopupDefined from './PopupDefined';

export default class MapDetail {
  constructor(el) {
    let latPos = $(el).attr('data-lat');
    let lngPos = $(el).attr('data-lng');
    googlemap({
      key: 'AIzaSyBzlEqFy__g-R9CoVzOfdxTAFBdLAIbTOM'
    }).then(result => {
      let google = {
        maps: result
      };
      this.drawPopupOnMap(parseFloat(latPos),parseFloat(lngPos));
    }).catch(err => {
      console.log(err);
    });

  }
  drawPopupOnMap(lat,lng) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 17,
      mapTypeControl: false
    });

    var cityCircle = new google.maps.Circle({
      strokeColor: '#2378A7',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#2378A7',
      fillOpacity: 0.35,
      map: this.map,
      center: {lat: lat, lng: lng},
      radius: 200
    });

  }
}