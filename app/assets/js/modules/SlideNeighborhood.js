export default class SlideNeighborhood {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      }]
    });
  }
}