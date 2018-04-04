export default class ThumbService {
  constructor(el) {
    var countHide = $(el).find(".hide-for-small").size();

    $(el).find(".view-more").find("span").html(countHide);

    $(".view-more").on('click',function(){
      $(this).parents(".show-for-small").hide(); 
      $(this).parents(".thumb-service").find('.hide-for-small').removeClass('hide-for-small'); 
    });
  }
}