export default class SlideNeighborhood {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      fade: false,
      dots:false,
      infinite: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 2,
      mobileFirst:true,
      variableWidth: true
    });
  }
}