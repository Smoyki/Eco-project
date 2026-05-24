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
      // при ширине окна 776px и более — показываем 1 карточки
      776: {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      // при ширине экрана 1000 и более — показываем 2 карточки
      1000: {
        slidesPerView: 2,
        spaceBetween: 24,
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

const featuresSwiper = new Swiper(".featuresSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        768: {
            slidesPerView: 1,
        },

        1000: {
            slidesPerView: 3,
        }
    }
});

const Swiper_number = new Swiper(".Swiper_number", {
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
        },

        1281: {
            slidesPerView: 2,
        }
    }
});