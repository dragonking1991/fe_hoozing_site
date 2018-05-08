

import $ from 'jquery';
import slick from 'slick-carousel';
import 'slick-carousel/slick/slick.css';
export default class ThumbSlide {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      fade: false,
      dots:true,
      infinite: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    $(document).off('click').on('click','.love', function() {
      if ( !$(this).hasClass('loved')) {
        $(this).addClass('loved').find(".fa-heart-o").removeClass('fa-heart-o').addClass('fa-heart');
      }
      else {
        $(this).removeClass('loved').find(".fa-heart").removeClass('fa-heart').addClass('fa-heart-o');
      }
    });
  }
}