document.addEventListener('DOMContentLoaded', function() {
  const sliderElement = document.querySelector('.my-services-slider');
  if (sliderElement) {
    const mySlider = new Swiper('.my-services-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
});