const splide = new Splide('#slider', {
    type: 'loop',
    perPage: 'auto',
    gap: '10px',
    speed: 800,
    arrows: false,
    pagination: false,
});

splide.mount();

// 👉 Автопрокрутка шагами по 3
setInterval(() => {
    splide.go('+=3');
}, 3000);

// 👉 Scrollbar
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

// 👉 Drag scrollbar
let isDragging = false;

thumb.addEventListener('mousedown', () => isDragging = true);
window.addEventListener('mouseup', () => isDragging = false);

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = scrollbar.getBoundingClientRect();
    let x = e.clientX - rect.left;

    const maxLeft = scrollbar.offsetWidth - thumb.offsetWidth;
    x = Math.max(0, Math.min(x, maxLeft));

    thumb.style.left = x + 'px';

    const percent = x / maxLeft;
    const end = splide.Components.Controller.getEnd();

    splide.go(Math.round(percent * end));
});