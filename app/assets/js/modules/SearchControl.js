// import $ from 'jquery';
import 'jquery-ui';

export default class SearchControl {
	constructor(el) {

		$('[data-toggle="tooltip"]').tooltip();

		$('[data-show="#collapseFilter"]').on('click', function(){
			$('.tab--reduce').animate({scrollTop: 0}, 500);
		});

		$(".filter-wrapper input[type='checkbox']").change(function() {
			var countCheck = $(".filter-wrapper input[type='checkbox']:checked").length;
			$(el).find(".notificate").html(countCheck);
		});

		$(".clear-filter").on('click', function(){
			$('.filter-wrapper input[type=checkbox]').each(function(){ 
				this.checked = false; 
				var countCheck = $(".filter-wrapper input[type='checkbox']:checked").length;
				$(el).find(".notificate").html(countCheck);
			});
		});
	}
}