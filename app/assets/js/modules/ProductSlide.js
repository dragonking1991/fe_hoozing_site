export default class ProductSlide {
	constructor(el) {

		function initCarousel() {
			$(el).Cloud9Carousel({
				buttonLeft: $('.product-slide-wrapper .icon-arrow-next'),
				buttonRight: $('.product-slide-wrapper .icon-arrow-back'),
				yOrigin: 15,
				xRadius: 110,
				yRadius: -10,
				farScale: 0.8,
				speed: 3,
				itemClass: 'product-slide__item',
				bringToFront: true,
				onRendered: rendered,
				onLoaded: function() {
				  $('.product-slide.show-for-small').addClass('initialized');
				}
			})

			function rendered(carousel) {
				var index = carousel.nearestIndex();
				$('.product-slide .product-slide__item').removeClass('active');
				$(carousel.items[index].element).addClass('active');
		    	$('.product-slide-wrapper .pager--dots li').removeClass('active').eq(index).addClass('active');
		    }

		    $('.product-slide-wrapper .pager--dots li a').on('click', function(e) {
		    	e.preventDefault();
				if ($(window).width() >= 1024) {
		    	$('.product-slide.hide-for-small').data('carousel').goTo($(this).parents('li').index());
				}
				else {
		    	$('.product-slide.show-for-small').data('carousel').goTo($(this).parents('li').index());
				}
		    });
		}

		

		function swipedetect(el, callback){
		  
		    var touchsurface = el,
		    swipedir,
		    startX,
		    startY,
		    distX,
		    distY,
		    threshold = 150, //required min distance traveled to be considered swipe
		    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
		    allowedTime = 300, // maximum time allowed to travel that distance
		    elapsedTime,
		    startTime,
		    handleswipe = callback || function(swipedir){}
		  
		    touchsurface.addEventListener('touchstart', function(e){
		        var touchobj = e.changedTouches[0];
		        swipedir = 'none';
		        distX = 0;
		        distY = 0;
		        startX = touchobj.pageX;
		        startY = touchobj.pageY;
		        startTime = new Date().getTime(); // record time when finger first makes contact with surface
		    }, false);
		  
		    touchsurface.addEventListener('touchmove', function(e){
		        e.preventDefault(); // prevent scrolling when inside DIV
		    }, false)
		  
		    touchsurface.addEventListener('touchend', function(e){
		        var touchobj = e.changedTouches[0];
		        distX = touchobj.pageX - startX; 
		        distY = touchobj.pageY - startY; 
		        elapsedTime = new Date().getTime() - startTime; // get time elapsed
		        if (elapsedTime <= allowedTime){ // first condition for awipe met
		            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
		                swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
		            }
		            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
		                swipedir = (distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
		            }
		        }
		        handleswipe(swipedir);
		    }, false);
		}


		if ($(window).width() < 1024) {
			initCarousel();
			  
			var el = document.querySelector('.product-slide-wrapper');
			swipedetect(el, function(swipedir){
			    if(swipedir == 'left') {
			    	$('.product-slide-wrapper .icon-arrow-back').trigger('click');
			    }
			    else if (swipedir == 'right') {
			    	$('.product-slide-wrapper .icon-arrow-next').trigger('click');
			    }
			});
		}


		$(window).on('resize', function() {
			if ($(window).width() < 1024 && !$('.product-slide.show-for-small').hasClass('initialized')) {
				initCarousel();
			}
		})
	}
}