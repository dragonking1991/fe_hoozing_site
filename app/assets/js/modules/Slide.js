export default class Slide {
	constructor(el) {
        // $(el).find('.how-to-slide__item').show();
        var $el = $(el).find('.slider-wrapper');
        $el.slick({
            fade: false,
            dots:false,
            infinite: true,
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            prevArrow: $('.slide-prev'),
            nextArrow: $('.slide-next'),
            responsive:[{
                breakpoint: 1024,
                settings: {
                    fade:true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });


        hideSlideDot();
        function hideSlideDot(){
            if($('.slick-dots li').length == 1){
                $('.slick-dots').addClass('hidden');
            }
            else {
                $('.slick-dots').removeClass('hidden');
            }
        }
        $( window ).resize(function() {
            hideSlideDot();
        });
	}
}