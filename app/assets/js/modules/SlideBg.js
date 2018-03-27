export default class SlideBg {
	constructor(el) {
    var $el = $(el).find('.slider-wrapper');
    var option = {
      fade: false,
      dots:false,
      autoplay:true,
      infinite: true,
      autoplaySpeed: 5000,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst:true
    };
    $(el).find('.slider-wrapper').slick(option).on('afterChange', function(event, slick, currentSlide){      
      $(".banner-wrapper").find("h1").html($(".item").eq(currentSlide).data("text"))
    });
  }
}