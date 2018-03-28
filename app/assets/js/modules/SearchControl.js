export default class SearchControl {
	constructor(el) {

		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="collapse"]').collapse();


		$(".clear-filter").on('click', function(){
			$('.filter-wrapper input[type=checkbox]').each(function(){ 
				this.checked = false; 
			});
		});

		$(el).jplist({
			itemsBox: '.list-box',
			itemPath: '.thumb-item',
			panelPath: '.jplist-panel',
			storage: 'localstorage',
			storageName: 'mixed-controls-local-storage',
			effect: 'fade',
			redrawCallback: function(collection, $dataview, statuses){
				$(".list-box").find(".slider-wrapper").each(function(){
					$(this).slick('refresh');
				});
			}
		});
  }
}