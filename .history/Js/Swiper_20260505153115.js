document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1, // <776px — 1 карточка
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
      776: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1080: {
        slidesPerView: 3,
        spaceBetween: 28,
      },
      // всё, что МЕНЬШЕ 1600, но БОЛЬШЕ 1080 — останется 3
      1601: {
        slidesPerView: 1, // >=1600px — 4 карточки
        spaceBetween: 30,
      }
    },
    speed: 400,
  });
});