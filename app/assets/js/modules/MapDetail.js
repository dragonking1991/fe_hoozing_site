import googlemap from 'load-google-maps-api';


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
    let option = {
      center: {lat: lat, lng: lng},
      zoom: 17,
      mapTypeControl: false
    };
    if($(window).width() < 1024){
      option.zoom = 15;
    }

    this.map = new google.maps.Map(document.getElementById('map'), option);

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