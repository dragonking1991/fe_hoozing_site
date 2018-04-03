export default class Form {
  constructor(el) {

    $('[data-toggle="tooltip"]').tooltip();
    // $('input, textarea').on('focus',function(){
    //   var wrap_input = $(this).parents('.input-wrapper');
    //   if( !wrap_input.hasClass('focus') ){
    //     wrap_input.addClass('focus');
    //   }
    // });
    $(document).on( 'change','input', function(){
      var wrap_input = $(this).parents('.input-wrapper');
      if( !wrap_input.hasClass('focus') ){
        wrap_input.addClass('focus');
      }
    });
    $('input, textarea').on('blur',function(){
      var wrap_input = $(this).parents('.input-wrapper');
      if( wrap_input.hasClass('focus') && $(this).val() == '' ){
        wrap_input.removeClass('focus');
      }
    });

    $('.select-wrapper, .checkbox-list').on('click',function(){
      if ($(window).width() < 1024 && !$(this).hasClass('show')) {
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


    $(document).on('click', function(e) 
    {
      var container = $(".select-wrapper, .checkbox-list");

      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('show');
      }
    });
    $('.select-wrapper li').on('click',function(){
      $(this).parents(".select-wrapper").find('li').removeClass('active'); 
      $(this).addClass('active').parents(".select-wrapper").removeClass('show').find('span').html($(this).html());
    });

    $('input, textarea').each(function(){
      if ( $(this).val() != '') {
        var wrap_input = $(this).parents('.input-wrapper');
        wrap_input.addClass('focus');
      }
    });


  }
}