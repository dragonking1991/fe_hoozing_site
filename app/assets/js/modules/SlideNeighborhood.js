export default class SlideNeighborhood {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      fade: false,
      dots:false,
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst:true,
      variableWidth: true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: false,
          slidesToShow: 6
        }
      }]
    });
  }
}