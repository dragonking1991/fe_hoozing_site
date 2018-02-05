export default class Header {
	constructor(el) {
		$('.btn-burger').on('click', function(e) {
			e.preventDefault();

			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('.nav__menu').removeClass('active');
				$('.nav__menu a').removeClass('animate');
			} else {
				$(this).addClass('active');
				$('.nav__menu').addClass('active');
				setTimeout(function () {
					$('.nav__menu a').addClass('animate');
				}, 100)
			}

			$(window).on('scroll', function(){
				if ($(window).width() < 1025 && $('.btn-burger').hasClass('active')) {
					$('.btn-burger').removeClass('active');
					$('.nav__menu').removeClass('active');
					$('.nav__menu a').removeClass('animate');
				}
			})
		});

		//menu user
		$('.open--user-menu').on('click',function(){
			$('.menu-user').toggleClass('hidden');
		});

		$(window).click(function() {
			$('.menu-user').addClass('hidden');
		});

		$('.menu-user,.open--user-menu').click(function(event){
		    event.stopPropagation();
		});
	}
}