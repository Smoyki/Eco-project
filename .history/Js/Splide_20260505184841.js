const splide = new Splide('#cards-slider', {
  type: 'loop',
  perPage: 'auto',
  autoplay: true,
}).mount();

const thumb = document.getElementById('thumb');

splide.on('move', () => {
  const end = splide.Components.Controller.getEnd();
  const index = splide.index;

  const percent = index / end;
  thumb.style.left = percent * 100 + '%';
});