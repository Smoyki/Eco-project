  const splide = new Splide('#slider', {
    type: 'loop',
    perPage: 'auto',
    gap: '10px',
    arrows: false,
    pagination: false,

    autoScroll: {
      speed: 1,        // 👈 скорость (увеличь до 2–3 если медленно)
      pauseOnHover: false,
      pauseOnFocus: false,
    },
  });

  splide.mount(window.splide.Extensions);

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

  // Drag
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