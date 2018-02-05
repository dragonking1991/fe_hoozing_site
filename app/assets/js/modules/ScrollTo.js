export default class ScrollTo {
  constructor(el) {
    $(el).on('click', '.link-to', function(e){
      var offset = 0;
      if ($(window).width() < 1024) {
        offset = 20;
      } else {
        offset = 120;
      }
      if ($(this.getAttribute('data-target')).length) {
        e.preventDefault();
        $('html,body').animate({scrollTop:$(this.getAttribute('data-target')).offset().top - offset}, 500);
      }
      if($(this).hasClass('btn__red') && $(window).width() < 1024 && $('.solutions-slider').length){
        setTimeout(function () {$('.solutions-slider').slick('slickGoTo', 1);},100);
      }
    });


  }
}
