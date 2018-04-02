export default class LinkSlide {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    $el.slick({
      fade: false,
      dots:false,
      infinite: true,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst:true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }]
    });
  }
}