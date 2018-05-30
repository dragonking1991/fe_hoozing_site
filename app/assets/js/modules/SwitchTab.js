import $ from 'jquery';
import slick from 'slick-carousel';

export default class SwitchTab {
	constructor(el) {
		$("a[data-layout]").on('click', function(){
			let layout = $(this).attr('data-layout');
			$("a[data-layout]").removeClass('active');
			$(this).addClass('active');
			$(".tab-content").removeClass("active");
			$(".search-content").removeClass('mapview listview grid project');

			// mapview
			$(".wrap-tab").removeClass("tab--reduce");
			$(".map-result").removeClass("show");

			if ( layout == "project") {
				$('.search-content').addClass('project');
				$("#search-" + layout).addClass("active");
				$(".slider-wrapper").slick('refresh');
			}
			else {
				
				$("#search-list").addClass("active");
				$("#search-list").find(".slider-wrapper").each(function(){
					$(this).slick('refresh');
				});

				// mapview
				if(layout == "mapview"){
					$(".map-result").addClass("show");
					$(".wrap-tab").addClass("tab--reduce");
					$('.search-content').addClass('mapview');
				}
				if(layout == "listview"){
					$('.search-content').addClass('listview');
				}
				if(layout == "grid"){
					$('.search-content').addClass('grid');
				}
			}

		});

	}
}