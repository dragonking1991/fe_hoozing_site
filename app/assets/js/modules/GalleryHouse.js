export default class GalleryHouse {
  constructor(el) {
    this.changeMaxHeight();
    $('.gallery-house a').each(function (index, value) {
      let html = $(this).html();
      let warpperImg;
      warpperImg = document.createElement('li');
      warpperImg.innerHTML = html;

      $(".gallery__for, .gallery__nav").append(warpperImg);
    });


    var navSlide = {
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.gallery__for',
      centerMode: true,
      adaptiveHeight:false,
      focusOnSelect: true,
      variableWidth: true
    };

    var forSlide = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.gallery__nav'
    }

    $(el).find('.gallery__for').slick(forSlide); 
    $(el).find('.gallery__nav').slick(navSlide).on('afterChange', function(event, slick, currentSlide){
      $(".gallery__slide").find('.counter-slide').html((currentSlide+1) + '/' + slick.slideCount);
    });

    $(".gallery-house li").on('click', function(){
      $(el).find('.gallery__for').slick('slickGoTo', $(this).index() );
    });

    $('#galleryDetail').on('show.bs.modal', function (e) {
    });
  }

  changeMaxHeight(){
    var maxHeight = 0;
    $('.gallery-house img').each(function() {
      // maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).outerHeight();
      console.log($("this"))
    });

    $('.gallery-house li').each(function() {
      // $(this).outerHeight(maxHeight);
    });
  }
}