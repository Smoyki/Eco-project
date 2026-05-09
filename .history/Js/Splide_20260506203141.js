const splide = new Splide('#slider', {
    type: 'loop',
    perPage: 'auto',
    gap: '10px',
    speed: 800,
    arrows: false,
    pagination: false,
});

splide.mount();

// =========================
// ⚙️ НАСТРОЙКИ
// =========================
const MOVE_BY = 3;     // сколько карточек за шаг
const INTERVAL = 3000; // пауза (мс)

let timer;

function startAutoScroll() {
    timer = setInterval(() => {
        const end = splide.Components.Controller.getEnd();
        const current = splide.index;

        let next = current + MOVE_BY;

        // 👇 если вышли за пределы — возвращаемся в начало
        if (next > end) {
            next = 0;
        }

        splide.go(next);
    }, INTERVAL);
}

function stopAutoScroll() {
    clearInterval(timer);
}

// старт
startAutoScroll();

// пауза при наведении (рекомендую)
const root = document.getElementById('slider');

root.addEventListener('mouseenter', stopAutoScroll);
root.addEventListener('mouseleave', startAutoScroll);

// =========================
// 🎯 SCROLLBAR
// =========================
const thumb = document.getElementById('thumb');
const scrollbar = document.getElementById('scrollbar');

function updateThumb() {
    const end = splide.Components.Controller.getEnd();
    const index = splide.index;

    if (end <= 0) return;

    const percent = index / end;
    const maxLeft = scrollbar.offsetWidth - thumb.offsetWidth;

    thumb.style.left = (percent * maxLeft) + 'px';
}

splide.on('move', updateThumb);
splide.on('mounted', updateThumb);

// =========================
// 🖱 DRAG SCROLLBAR
// =========================
let isDragging = false;

thumb.addEventListener('mousedown', () => {
    isDragging = true;
    stopAutoScroll(); // 👈 стопаем автопрокрутку при drag
});

window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        startAutoScroll(); // 👈 возвращаем автопрокрутку
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = scrollbar.getBoundingClientRect();
    let x = e.clientX - rect.left;

    const maxLeft = scrollbar.offsetWidth - thumb.offsetWidth;

    x = Math.max(0, Math.min(x, maxLeft));

    thumb.style.left = x + 'px';

    const percent = x / maxLeft;
    const end = splide.Components.Controller.getEnd();

    const newIndex = Math.round(percent * end);

    splide.go(newIndex);
});