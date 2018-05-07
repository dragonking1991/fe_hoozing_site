


import $ from 'jquery';
import slick from 'slick-carousel';
import 'slick-carousel/slick/slick.css';

export default class SlideProject {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      fade: false,
      dots:false,
      infinite: false,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst:true,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }]
    });
  }
}