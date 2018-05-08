import $ from 'jquery';
import slick from 'slick-carousel';
import 'slick-carousel/slick/slick.css';

export default class SlideLink {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      fade: false,
      dots:false,
      infinite: true,
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      mobileFirst:true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },{
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }]
    });
  }
}