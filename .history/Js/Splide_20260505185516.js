const splide = new Splide('#slider', {
    type: 'loop',
    perPage: 'auto',
    gap: '10px',
    autoplay: true,
    interval: 2000,
    pauseOnHover: false,
    arrows: false,
    pagination: false,
});

splide.mount();

const thumb = document.getElementById('thumb');
const scrollbar = document.getElementById('scrollbar');

function updateThumb() {
    const end = splide.Components.Controller.getEnd();
    const index = splide.index;

    if (end === 0) return;

    const percent = index / end;
    const maxLeft = scrollbar.offsetWidth - thumb.offsetWidth;

    thumb.style.left = (percent * maxLeft) + 'px';
}

splide.on('move', updateThumb);
splide.on('mounted', updateThumb);

// Drag scrollbar
let isDragging = false;

thumb.addEventListener('mousedown', () => {
    isDragging = true;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = scrollbar.getBoundingClientRect();
    let x = e.clientX - rect.left;

    const maxLeft = scrollbar.offsetWidth - thumb.offsetWidth;

    if (x < 0) x = 0;
    if (x > maxLeft) x = maxLeft;

    thumb.style.left = x + 'px';

    const percent = x / maxLeft;
    const end = splide.Components.Controller.getEnd();

    const newIndex = Math.round(percent * end);
    splide.go(newIndex);
});