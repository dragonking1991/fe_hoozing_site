export default class SwitchTab {
	constructor(el) {
		$("a[data-layout]").on('click', function(){
			let layout = $(this).attr('data-layout');
			$(".tab-content").removeClass("active");
			$("#search-" + layout).addClass("active");
			if(layout == "mapview"){
				$(".map-result").addClass("show");
			}
			else {
				$(".map-result").removeClass("show");
			}
		});

	}
}