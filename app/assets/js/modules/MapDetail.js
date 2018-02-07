export default class MapDetail {
  constructor(el) {


    var citymap = {
      chicago: {
        center: {lat: 10.785, lng: 106.701},
        population: 2714856
      }
    };
    var pos = $(el).attr('data-pos');

    var apartment = {
      chicago: {
        center: {lat: 10.785, lng: 106.701},
        population: 2714856
      }
    };

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: pos
      });

      for (var area in apartment) {
        var cityCircle = new google.maps.Circle({
          strokeColor: '#2378A7',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#2378A7',
          fillOpacity: 0.35,
          map: map,
          center: apartment[area].center,
          radius: 200
        });
      }
    }
  }
}