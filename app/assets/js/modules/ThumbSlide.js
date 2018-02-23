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

    $('.love').on('click', function() {
      $(this).addClass('loved').find(".fa-heart-o").removeClass('fa-heart-o').addClass('fa-heart');
    });
  }
}