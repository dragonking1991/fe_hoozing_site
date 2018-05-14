export default class Form {
  constructor(el) {
    
    $('[data-show]').on('click',function(e){
      var blockToggle = $(this).attr('data-show');
      $(this).toggleClass('active');
      if ( !$(blockToggle).hasClass('show')) {
        $(blockToggle).addClass('show');
      }
      else {
        $(blockToggle).removeClass('show');
      }
    });

    $('.close-modal').on('click',function(){
      var target = $(this).data('close');
      $(target).removeClass('show');
    });

    $('.select-wrapper, .checkbox-list').on('click',function(e){
      e.stopPropagation();
      if ($(window).width() < 1025 && !$(this).hasClass('show')) {
        $('.select-wrapper,.checkbox-list').removeClass('show');
        $(this).addClass('show');
      }
      else {
        $(this).removeClass('show');
      }
    });

    $('.form_suggest-search').find('input').on('focus', function(){
      $('.form_suggest-search').find('.box-suggest').toggleClass('active');
    });

    $('.form_suggest-search').find('input').on('blur', function(){
      $('.form_suggest-search').find('.box-suggest').removeClass('active');
    });


    $(document).on('click', function(e){
      var container = $(".select-wrapper, .checkbox-list");

      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('show');
      }
    });

    $('.select-wrapper li').on('click',function(e){
      e.stopPropagation();
      $(this).parents('.select-wrapper').removeClass('show');
      $(this).parents(".select-wrapper").find('li').removeClass('active'); 
      $(this).addClass('active').parents(".select-wrapper").removeClass('show').find('span').html($(this).html());
    });

  }
}