/* Utility Functions */
function slideInAnimations(slides, startDelay = 280) {
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
function indicatorUpdate(){
    $('[data-filter-list]').each(function(){
        const activeElement = $(this).find('[data-filter].active').get(0);
        const activeElementInfo = activeElement.getBoundingClientRect();
        
        $(this).css({
            "--_indicator-width": `${activeElementInfo.width}px`,
            "--_indicator-height": `${activeElementInfo.height}px`,
            "--_indicator-position-top": `${activeElement.offsetTop}px`,
            "--_indicator-position-left": `${activeElement.offsetLeft}px`
        });
    });
};
function handleNavigationUpdateEvents(swiper){
    if(swiper.isBeginning) {
        $('[data-swiper-navigation="prev"]').prop('disabled', true);
    } else if(swiper.isEnd) {
        $('[data-swiper-navigation="next"]').prop('disabled', true);
    } else {
        $('[data-swiper-navigation]').removeAttr('disabled');
    }
}

$(document).ready(function () {
    const swiperSlider = new Swiper('[data-swiper="Filter-Slider"]', {
        slidesPerView: "auto",
        spaceBetween: 30,
        grabCursor: true,
        on: {
            init: function() {
                $('[data-swiper-navigation="prev"]').prop('disabled', true)
                slideInAnimations($('[data-slider-filter].active').get(0).querySelectorAll('.swiper-slide'), 100);
            },
            update: function(swiper) {
                slideInAnimations(swiper.el.querySelectorAll('.swiper-slide'));
                $('[data-swiper-navigation="prev"]').prop('disabled', true);
                $('[data-swiper-navigation="next"]').removeAttr('disabled');
            },
            resize: indicatorUpdate,
            slideChange: handleNavigationUpdateEvents,
            sliderMove: handleNavigationUpdateEvents,
            reachBeginning: function() {
                $('[data-swiper-navigation="prev"]').prop('disabled', true);
            },
            reachEnd: function() {
                $('[data-swiper-navigation="next"]').prop('disabled', true);
            },
        }
    });
    
    $('[data-filter]').on('click', function(){
        $(this).siblings('[data-filter]').removeClass('active');
        $(this).addClass('active');
        indicatorUpdate();
        $('[data-slider-filter]').siblings('[data-slider-filter]').removeClass('active');
        $(`[data-slider-filter="${$(this).data('filter')}"]`).addClass('active');
        swiperSlider[$('[data-filter].active').index()].update();
        swiperSlider[$('[data-filter].active').index()].slideTo(0, 0);
    });

    $('[data-swiper-navigation]').on('click', function(){
        if($(this).data('swiper-navigation') == 'prev') {
            swiperSlider[$('[data-filter].active').index()].slidePrev()
        } else {
            swiperSlider[$('[data-filter].active').index()].slideNext()
        }
    });

    setTimeout(()=>{
        indicatorUpdate();
    }, 100);
});
