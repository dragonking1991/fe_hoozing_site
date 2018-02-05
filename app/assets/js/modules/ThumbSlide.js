export default class ThumbSlide {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      fade: false,
      dots:true,
      infinite: true,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }
}