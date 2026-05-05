document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,          // базово — одна карточка (для экранов <776px)
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // при ширине окна 776px и более — показываем 2 карточки
      776: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      // при 1080px и более — 2 карточки
      1080: {
        slidesPerView: 2,
        spaceBetween: 28,
      },
      // при 1600px и более — 1 карточка
      1600: {
        slidesPerView: 1,
        spaceBetween: 30,
      }
    },
    speed: 400,
  });
});