export default class SwitchTab {
	constructor(el) {
		$("a[data-layout]").on('click', function(){
			let layout = $(this).attr('data-layout');
			$("a[data-layout]").removeClass('active');
			$(this).addClass('active');
			$(".tab-content").removeClass("active");
			$("#search-" + layout).addClass("active");
			$("#search-" + layout).find(".slider-wrapper").each(function(){
				// console.log('a');
				$(this).slick('slickGoTo', 1 );
			})

			if(layout == "mapview"){
				$(".map-result").addClass("show");
				$(".search-content").addClass("search-content--reduce");
			}
			else {
				$(".map-result").removeClass("show");
				$(".search-content").removeClass("search-content--reduce");
			}
		});

	}
}