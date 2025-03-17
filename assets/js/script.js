function slideInAnimations(slides, startDelay = 300) {
    anime({
        targets: slides,
        opacity: [0, 1],
        scale: [0.98, 1],
        translateX: ['10px', '0px'],
        translateY: ['50px', '0px'],
        delay: anime.stagger(80, {start: startDelay}),
        easing: 'cubicBezier(.215,.61,.355,1)',
    });
}

function slideOutAnimations(slides) {
    anime({
        targets: slides,
        opacity: [1, 0],
        scale: [1, 0.98],
        translateX: ['0px', '-10px'],
        translateY: ['0px', '-50px'],
        delay: anime.stagger(80, {start: 0}),
        easing: 'cubicBezier(.215,.61,.355,1)',
    });
}


$(document).ready(function () {

    anime.set('[data-slider-filter]:not(.active) .swiper-slide', {
        opacity: 0
    });

    let swiper = new Swiper('[data-swiper="Filter-Slider"]', {
        slidesPerView: "auto",
        spaceBetween: 30,
        grabCursor: true,
        on: {
            init: function () {
                slideInAnimations($('[data-slider-filter].active').get(0).querySelectorAll('.swiper-slide'), 100);                
            },
            update: function (swiper) {
                slideInAnimations(swiper.el.querySelectorAll('.swiper-slide'))
            },
        }
    });
    
    $('[data-filter]').on('click', function(){
        $(this).siblings('[data-filter]').removeClass('active');
        $(this).addClass('active');
        $('[data-slider-filter]').siblings('[data-slider-filter]').removeClass('active');
        $(`[data-slider-filter="${$(this).data('filter')}"]`).addClass('active');
        swiper[$('[data-filter].active').index()].update();
        swiper[$('[data-filter].active').index()].slideTo(0, 0);
        slideOutAnimations(swiper[$('[data-filter]:not(.active)').index()].el.querySelectorAll('.swiper-slide'))        
    })
    
    
});
