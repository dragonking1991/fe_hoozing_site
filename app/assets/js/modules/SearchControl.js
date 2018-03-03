export default class SearchControl {
	constructor(el) {

		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="collapse"]').collapse();
	

		$(".clear-filter").on('click', function(){
			$('.filter-wrapper input[type=checkbox]').each(function(){ 
				this.checked = false; 
			});
		});
	}
}