new Glide('.features', {
    type: 'carousel',
    perView: 3,
    gap: 20,

    breakpoints: {
        1200: {
            perView: 2
        },

        768: {
            perView: 1
        }
    }
}).mount();