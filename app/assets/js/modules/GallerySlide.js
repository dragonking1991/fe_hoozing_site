export default class GallerySlide {
  constructor(el) {
    var navSlide = {
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.gallery__for',
      centerMode: true,
      adaptiveHeight:false,
      focusOnSelect: true
    };

    var forSlide = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.gallery__nav'
    }

    $('#galleryDetail').on('show.bs.modal', function (e) {
      $(el).find('.gallery__for').slick(forSlide); 
      $(el).find('.gallery__nav').slick(navSlide);
      $(el).find('.gallery__for').slick('slickGoTo', 1 );
    });
  }
}