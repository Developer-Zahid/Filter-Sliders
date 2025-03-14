var swiper = new Swiper('.active [data-swiper="Filter-Slider"]', {
    slidesPerView: "auto",
    spaceBetween: 30,
    grabCursor: true,
});

anime({
    targets: '.swiper-slide',
    opacity: [0, 1],
    scale: [0.98, 1],
    translateX: ['10px', '0px'],
    translateY: ['50px', '0px'],
    delay: anime.stagger(80, {start: 100}),
    easing: 'cubicBezier(.215,.61,.355,1)',
  });