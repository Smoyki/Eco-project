document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener('DOMContentLoaded', function() {
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

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
  // Стили выбора карточек
  document.addEventListener('DOMContentLoaded', function() {
  const cardsRow = document.querySelector('.cards-row');
  const prevArrow = document.querySelector('.cards-arrow--prev');
  const nextArrow = document.querySelector('.cards-arrow--next');
  
  let currentSlide = 0;
  const slideWidth = 50; // Ширина слайда в процентах (2 карточки = 50%)
  
  function updateSlidePosition() {
    cardsRow.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
  }
  
  function nextSlide() {
    const totalSlides = Math.ceil(document.querySelectorAll('.service-card').length / 2);
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
  }
  
  function prevSlide() {
    const totalSlides = Math.ceil(document.querySelectorAll('.service-card').length / 2);
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateSlidePosition();
  }

  // Добавляем плавную анимацию
  cardsRow.style.transition = 'transform 0.4s ease-in-out';

  // Обработчики кликов для стрелок
  prevArrow.addEventListener('click', prevSlide);
  nextArrow.addEventListener('click', nextSlide);

  // Функция для обновления видимости стрелок
  function updateArrowsVisibility() {
    const totalSlides = Math.ceil(document.querySelectorAll('.service-card').length / 2);

    // Если всего один слайд, прячем обе стрелки
    if (totalSlides <= 1) {
      prevArrow.style.display = 'none';
      nextArrow.style.display = 'none';
    } else {
      // В остальных случаях показываем обе стрелки (режим карусели)
      prevArrow.style.display = 'block';
      nextArrow.style.display = 'block';
    }
  }

  // Инициализируем видимость стрелок
  updateArrowsVisibility();

  // Обработка изменения размера окна — пересчитываем видимость стрелок
  window.addEventListener('resize', updateArrowsVisibility);

  // Наблюдатель за изменениями в DOM (если карточки добавляются/удаляются динамически)
  const observer = new MutationObserver(updateArrowsVisibility);
  observer.observe(cardsRow, {
    childList: true,
    subtree: true
  });

  // Предотвращение множественных кликов во время анимации
  let isAnimating = false;

  function safeNextSlide() {
    if (!isAnimating) {
      isAnimating = true;
      nextSlide();
      setTimeout(() => {
        isAnimating = false;
      }, 400); // Время анимации в мс
    }
  }

  function safePrevSlide() {
    if (!isAnimating) {
      isAnimating = true;
      prevSlide();
      setTimeout(() => {
        isAnimating = false;
      }, 400);
    }
  }

  // Переназначаем обработчики с защитой от множественных кликов
  prevArrow.removeEventListener('click', prevSlide);
  nextArrow.removeEventListener('click', nextSlide);
  
  prevArrow.addEventListener('click', safePrevSlide);
  nextArrow.addEventListener('click', safeNextSlide);

  // Инициализация начальной позиции
  updateSlidePosition();
});