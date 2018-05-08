import $ from 'jquery';
import slick from 'slick-carousel';
import 'slick-carousel/slick/slick.css';
export default class SlideStep {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      fade: false,
      dots:true,
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst:true,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }]
    });
  }
}