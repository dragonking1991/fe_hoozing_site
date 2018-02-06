export default class form {
  constructor(el) {

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

    $('input, textarea').each(function(){
      if ( $(this).val() != '') {
        var wrap_input = $(this).parents('.input-wrapper');
        wrap_input.addClass('focus');
      }
    });

    $('[data-toggle="tooltip"]').tooltip();

  }
}