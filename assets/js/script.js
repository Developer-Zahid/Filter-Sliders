function slideInAnimations() {
    anime({
        targets: '.swiper-slide',
        opacity: [0, 1],
        scale: [0.98, 1],
        translateX: ['10px', '0px'],
        translateY: ['50px', '0px'],
        delay: anime.stagger(80, {start: 100}),
        easing: 'cubicBezier(.215,.61,.355,1)',
    });
}


$(document).ready(function () {

    let swiper = new Swiper('[data-swiper="Filter-Slider"]', {
        slidesPerView: "auto",
        spaceBetween: 30,
        grabCursor: true,
        observer: true,
        on: {
            init: function () {
                slideInAnimations()
            },
            update: function () {
                slideInAnimations()
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
    })
    
    
});
