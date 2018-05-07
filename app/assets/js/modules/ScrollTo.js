
export default class ScrollTo {
  constructor(el) {
    $(el).on('click', '.link-to', function(e){
      var offset = 0;
      if ($(window).width() < 1025) {
        offset = 20;
      } else {
        offset = 50;
      }
      if ($(this.getAttribute('data-target')).length) {
        e.preventDefault();
        $('html,body').animate({scrollTop:$(this.getAttribute('data-target')).offset().top - offset}, 500);
      }
      if($(this).hasClass('btn__red') && $(window).width() < 1024 && $('.solutions-slider').length){
        setTimeout(function () {$('.solutions-slider').slick('slickGoTo', 1);},100);
      }
    });


    $(window).on('scroll', function() {
      if($(".bar-request").length){
        var target = $('.block-signup').offset().top + $('.block-signup').height();
        var scrollPos = $(window).scrollTop();
        if( target <= scrollPos  ) {
          $('.bar-request').addClass('show');
        }
        else {
          $('.bar-request').removeClass('show');
        }
      }
    })


  }
}
