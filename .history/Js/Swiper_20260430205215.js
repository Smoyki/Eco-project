  document.addEventListener('DOMContentLoaded', function () {
            const swiper = new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // Адаптация под разные разрешения (включительно до 1079px)
                breakpoints: {
                    640: { slidesPerView: 1.2, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1080: { slidesPerView: 3, spaceBetween: 28 },   // при 1080px и более
                    1280: { slidesPerView: 4, spaceBetween: 30 }
                },
                speed: 400,
            });
        });