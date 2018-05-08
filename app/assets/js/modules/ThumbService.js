
export default class ThumbService {
  constructor(el) {

    $(".view-more").on('click',function(){
      $(this).parents(".show-for-small").hide(); 
      $(this).parents(".thumb-service").find('.hide-for-small').removeClass('hide-for-small'); 
    });
  }
}