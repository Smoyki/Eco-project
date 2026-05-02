document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);
});
// Стили для увеличения qr-code


// Стили для позиционирования меню, чтобы при открытии materibox, меню пропадало



document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");

  // Инициализируем intl-tel-input с настройками
  const iti = window.intlTelInput(phoneInput, {
    allowDropdown: true,           // Разрешаем выпадающий список стран
    showFlags: true,              // Показываем флаги стран
    showCountryCode: true,        // Показываем код страны
    separateDialCode: false,      // Код страны не отделяем от номера
    initialCountry: "ru",         // Россия — страна по умолчанию
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Скрипт для валидации
    nationalMode: false,          // Пользователь вводит номер в международном формате
    autoFormat: true,             // Автоматическое форматирование номера
    autoHideDialCode: false,      // НЕ скрываем код страны — оставляем его видимым
    geoIpLookup: false,           // Отключаем автоопределение страны по IP — используем только Россию по умолчанию
    placeholderNumberType: "fixed_line", // Тип номера по умолчанию (стационарный — для корректного формата)
  });

  // При инициализации принудительно устанавливаем фокус, чтобы показать формат
  phoneInput.focus();

  // Обработчик отправки формы
  document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const fullNumber = iti.getNumber(); // Получаем отформатированный номер с кодом страны
    const countryData = iti.getSelectedCountryData(); // Данные о выбранной стране
    const agreeCheckbox = document.getElementById('agreeCheckbox').checked;

    if (agreeCheckbox) {
      alert(`Форма заполнена!\nИмя: ${name}\nТелефон: ${fullNumber}\nСтрана: ${countryData.name}`);
      // Здесь логика отправки на сервер
    } else {
      alert('Пожалуйста, согласитесь с политикой обработки данных.');
    }
  });
});
// Стили для обратной связи

// Кнопка позвонить в верхнем
document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('callButton');

  button.addEventListener('click', function () {
    // Отключаем кнопку на время перехода (опционально)
    button.disabled = true;

    // Переходим к форме — выбираем нужный вариант:

    // Вариант 1: переход на отдельную страницу с формой
    // window.location.href = '/form.html';

    // Вариант 2: прокрутка к форме на текущей странице (если у формы id="contact-form")
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Восстанавливаем кнопку через 300 мс
    setTimeout(() => {
      button.disabled = false;
    }, 300);
  });
});

// Прописываем анимацию для цифр
document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.about_h3');
  const speed = 200; // Скорость анимации (чем меньше, тем быстрее)

  counters.forEach(counter => {
    const targetValue = getTargetValue(counter.textContent);
    let currentValue = 0;

    const updateCounter = () => {
      const increment = targetValue / speed;
      currentValue += increment;

      if (currentValue < targetValue) {
        if (counter.textContent.includes('%')) {
          counter.textContent = currentValue.toFixed(1) + '%';
        } else if (counter.textContent.includes('+')) {
          counter.textContent = Math.floor(currentValue) + '+';
        } else if (counter.textContent.includes('года')) {
          counter.textContent = 'С ' + Math.floor(currentValue) + ' года';
        } else {
          counter.textContent = Math.floor(currentValue);
        }
        setTimeout(updateCounter, 10);
      } else {
        if (counter.textContent.includes('%')) {
          counter.textContent = targetValue.toFixed(1) + '%';
        } else if (counter.textContent.includes('+')) {
          counter.textContent = targetValue + '+';
        } else if (counter.textContent.includes('года')) {
          counter.textContent = 'С ' + targetValue + ' года';
        } else {
          counter.textContent = targetValue;
        }
      }
    };

    updateCounter();
  });
});

function getTargetValue(text) {
  // Извлекаем число из текста, игнорируя символы +, %, года и т. д.
  const match = text.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

// Делаем кнопку активной

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

// Or with jQuery

$(document).ready(function () {
  $('.sidenav').sidenav();
});
// Стили выбора карточек
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!container || !track) return;

  let cards = Array.from(document.querySelectorAll('.service-card'));
  let cardWidth = cards[0]?.offsetWidth + 20; // ширина + gap
  let visibleCards = Math.floor(container.clientWidth / cardWidth);
  let totalCards = cards.length;
  let currentIndex = 0; // индекс первого видимого слайда

  // Функция обновления индикаторов
  function updateDots() {
    if (!dotsContainer) return;
    const totalDots = Math.ceil(totalCards / visibleCards);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Прокрутка к индексу слайда (группы)
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= Math.ceil(totalCards / visibleCards)) index = Math.ceil(totalCards / visibleCards) - 1;
    currentIndex = index;
    const scrollPosition = currentIndex * cardWidth * visibleCards;
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    updateDots();
  }

  // Определяем, какой слайд сейчас в центре (по положению скролла)
  function updateActiveDotOnScroll() {
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth * visibleCards));
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateDots();
    }
  }

  // Обработчики кнопок
  prevBtn?.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
  nextBtn?.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  // Следим за изменением размера окна
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cardWidth = cards[0]?.offsetWidth + 20;
      visibleCards = Math.floor(container.clientWidth / cardWidth);
      visibleCards = Math.max(1, visibleCards);
      goToSlide(currentIndex);
    }, 200);
  });

  // Инициализация
  cardWidth = cards[0]?.offsetWidth + 20;
  visibleCards = Math.floor(container.clientWidth / cardWidth);
  visibleCards = Math.max(1, visibleCards);
  updateDots();
  container.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveDotOnScroll);
  });

  // На случай, если карточек меньше, чем visibleCards — скрываем кнопки
  if (totalCards <= visibleCards) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
});