export default class Header {
	constructor(el) {
		
		$('.btn-burger').on('click', function(e) {
			e.preventDefault();

			$('.icon-search').removeClass('active');
			$('.box__search').removeClass('show');

			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('.main-menu').removeClass('active');
			} else {
				$(this).addClass('active');
				$('.main-menu').addClass('active');
			}
		});
		
		$('.icon-search').on('click',function(){
			$(".btn-burger,.main-menu").removeClass('active');
		});

		$('.open-search').on('click',function(){
			$(".bg-popup").addClass('show');
			// $("#searchHeader .tt-input").tagsinput('focus');
			$("#searchHeader .tt-input").focus();
			$(".nav__menu").addClass('off');

			$(".btn-burger").addClass('active');
			$('.main-menu').addClass('active');
		});


		$('#searchHeader .close-form').on('click',function(){
			$(".bg-popup").removeClass('show');
			$(".nav__menu").removeClass('off');
		});
		$('.bg-popup').on('click',function(){
			$("#searchHeader .close-form").trigger('click');
		});


		// var keysearch = new Bloodhound({
		// 	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
		// 	queryTokenizer: Bloodhound.tokenizers.whitespace,
		// 	prefetch: {
		// 		url: 'assets/js/keysearch.json',
		// 		filter: function(list) {
		// 			return $.map(list, function(keysearch) {
		// 				return { name: keysearch }; });
		// 		}
		// 	}
		// });

		// keysearch.initialize();
		// $('.bootstrap-tagsinput input').tagsinput({
		// 	typeaheadjs: {
		// 		name: 'keysearch',
		// 		displayKey: 'name',
		// 		valueKey: 'name',
		// 		source: keysearch.ttAdapter()
		// 	}
		// });


	}
}