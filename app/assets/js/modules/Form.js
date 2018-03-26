export default class Form {
  constructor(el) {

    $('[data-toggle="tooltip"]').tooltip();
    $('input, textarea').on('focus',function(){
      var wrap_input = $(this).parents('.input-wrapper');
      if( !wrap_input.hasClass('focus') ){
        wrap_input.addClass('focus');
      }
    });
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

    $('.select-wrapper').on('click',function(){
      if ($(window).width() < 1024) {
        $(this).toggleClass('show');
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