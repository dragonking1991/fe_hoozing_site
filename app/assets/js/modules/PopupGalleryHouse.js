import $ from 'jquery';
import slick from 'slick-carousel';
import 'slick-carousel/slick/slick.css';

export default class PopupGalleryHouse {
  constructor(el) {
    $('.gallery-house a').each(function (index, value) {
      let html = $(this).html();
      let warpperImg;
      warpperImg = document.createElement('li');
      warpperImg.innerHTML = html;
      $(".gallery__for, .gallery__nav").append(warpperImg);
    });

    let title = $('.list-content').find('h2').html();
    let service = $('.list-content').find('.thumb-overview').html();
    $('#galleryDetail').find('h3').html(title);
    $('#galleryDetail').find('.thumb-service').html(service);

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

    $(el).find('.gallery__nav').slick(navSlide).on('afterChange', function(event, slick, currentSlide){
      $(".gallery__slide").find('.counter-slide').html((currentSlide+1) + '/' + slick.slideCount);
      console.log(currentSlide)
    });
    $(el).find('.gallery__for').slick(forSlide);


    $(".gallery-house li").on('click', function(){
      $(el).find('.gallery__for').slick('slickGoTo', $(this).index() );
    });

    $('.btn__photo').on('click', function(){
      $(el).find('.gallery__for').slick('slickGoTo', 1 );
    });

    $('#galleryDetail').on('show.bs.modal', function (e) {
    });
  }

}