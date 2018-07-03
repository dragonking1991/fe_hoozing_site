import $ from 'jquery';
import slick from 'slick-carousel';
import magnificPopup from 'magnific-popup';
import 'slick-carousel/slick/slick.css';
import 'magnific-popup/dist/magnific-popup.css';

export default class PopupGalleryHouse {
  constructor(el) {
    window.popup = this;
    let popup = this; 
    $('.gallery-house a').each(function (index, value) {
      let html = $(this).html();
      let warpperImg;
      warpperImg = document.createElement('li');
      warpperImg.innerHTML = html;
      $(".gallery__for, .gallery__nav").append(warpperImg);
    });

    $('[data-popup]').on('click',function(e){
      let data = $(this).data('popup');
      popup.showPopup(data);
    });

    let title = $('.list-content').find('h2').html();
    let service = $('.list-content').find('.thumb-overview').html();
    $('#galleryDetail').find('h3').html(title);
    $('#galleryDetail').find('.thumb-service').html(service);

    var navSlide = {
      arrows: false,
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
      arrows: true,
      fade: true,
      adaptiveHeight:true,
      asNavFor: '.gallery__nav'
    }

    $(el).find('.gallery__nav').slick(navSlide).on('afterChange', function(event, slick, currentSlide){
      $(".gallery__slide").find('.counter-slide').html((currentSlide+1) + '/' + slick.slideCount);
    });
    $(el).find('.gallery__for').slick(forSlide);
    $('.show-gallery').on('click',  function(e){
      e.preventDefault();
      popup.showGallery();
    });

    $('.close-popup, .mfp-close').on('click', function(e) {
      $.magnificPopup.close();
    });


    $(".gallery-house li").on('click', function(){
      let _this = this;
      setTimeout(function(){
        $(el).find('.gallery__for').slick('refresh').slick('slickGoTo', $(_this).index() );
      },200);
    });

    $('.request--late').on('click', function(e){
      e.preventDefault();
      setTimeout(function(){
        popup.showPopup('#inspectionForm');
      },500);
    });
    $('.btn__photo').on('click', function(){
      setTimeout(function(){
        $(el).find('.gallery__for').slick('slickGoTo', 1 );
      },150);
    });

    $('#galleryDetail').on('show.bs.modal', function (e) {
    });
  }

  showPopup(popup) {
    $.magnificPopup.open({
      items: {
        src: popup,
        type: 'inline'
      }
    });
  };
  showGallery() {
    $.magnificPopup.open({
      items: {
        src: "#galleryDetail",
        type: 'inline'
      },
      callbacks: {
        open: function() {
          $(window).keydown(function(e){ 
            if (e.keyCode == 37 ) {
              $('.slick-prev').trigger('click');
            }
            if (e.keyCode == 39 ) {
              $('.slick-next').trigger('click');
            }

          });
        },
        close: function() {
        }
      }
    });
  };

  showAlert(title, content) {

    $.magnificPopup.open({
      items: {
        src: "#popup-alert",
        type: 'inline'
      },
      callbacks: {
        open: function() {
          $('.modal-title').html(title);
          $('.modal-description').html(content);
        }
      }
    });
  };

}