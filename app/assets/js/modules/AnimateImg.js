export default class AnimateImg{
  constructor(el) {
    $('.ob-2,.ob-3,.ob-6').removeClass('first-state');
    $('.pl-1,.pl-2,.pl-3').removeClass('first-state');

    $(document).on("scroll", function(){
      var block2 = $('.section-principle').offset().top,
          block3 = $('.section-share').offset().top,
          heightDoc = $(window).height(),
          scrollPos = $(document).scrollTop(),
          endPos = scrollPos + heightDoc;
      $('.float-item').css({
        'margin-top': `${$(document).scrollTop() * 0.1}px`
      })
      if( endPos >= block2 + 200){ 
        $('.ob-4,.ob-5').removeClass('first-state');
      }
      if( endPos >= block3 + 400){ 
        $('.ob-1').removeClass('first-state');
      }
    });
  }
}
