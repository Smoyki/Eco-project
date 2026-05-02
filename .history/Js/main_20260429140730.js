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
// Стили для выбора карточек
(function () {
  // Дождаться полной загрузки DOM
  document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    const cards = document.querySelectorAll('.service-card');
    const container = document.querySelector('.services-pricing .container');

    // Если нет карточек или стрелок — ничего не делаем
    if (!cards.length || !leftArrow || !rightArrow) return;

    let isCarouselActive = false;   // активен ли режим карусели
    let currentPair = 0;            // текущая пара (0 = первые две, 1 = вторые две)
    let pairCount = Math.ceil(cards.length / 2); // сколько пар (для 4 карточек = 2)

    // Функция показа конкретной пары карточек (индекс пары)
    function showPair(pairIndex) {
      if (!isCarouselActive) return;

      const startIdx = pairIndex * 2;
      // Сначала скрываем все карточки через inline style
      cards.forEach(card => {
        card.style.display = 'none';
      });
      // Показываем две карточки текущей пары (если они существуют)
      if (cards[startIdx]) cards[startIdx].style.display = '';
      if (cards[startIdx + 1]) cards[startIdx + 1].style.display = '';
    }

    // Обработчики для стрелок
    function onPrevClick() {
      if (!isCarouselActive) return;
      // Переключение на предыдущую пару (с зацикливанием)
      currentPair = (currentPair - 1 + pairCount) % pairCount;
      showPair(currentPair);
    }

    function onNextClick() {
      if (!isCarouselActive) return;
      // Переключение на следующую пару
      currentPair = (currentPair + 1) % pairCount;
      showPair(currentPair);
    }

    // Активация карусели (режим "только две карточки + стрелки")
    function enableCarousel() {
      if (isCarouselActive) return; // уже активна

      isCarouselActive = true;
      currentPair = 0;
      pairCount = Math.ceil(cards.length / 2);

      // Вешаем обработчики на стрелки
      leftArrow.addEventListener('click', onPrevClick);
      rightArrow.addEventListener('click', onNextClick);

      // Показываем первую пару (скрываем остальные)
      showPair(0);
    }

    // Деактивация карусели — показываем все карточки, убираем карусельные обработчики
    function disableCarousel() {
      if (!isCarouselActive) return;

      // Удаляем обработчики
      leftArrow.removeEventListener('click', onPrevClick);
      rightArrow.removeEventListener('click', onNextClick);

      // Сбрасываем inline стили у всех карточек — они снова видны как по умолчанию
      cards.forEach(card => {
        card.style.display = '';
      });

      isCarouselActive = false;
    }

    // Проверка ширины экрана и включение/отключение карусели по правилу 1082px
    function checkScreenWidthAndApply() {
      const screenWidth = window.innerWidth;
      const isLargeScreen = screenWidth >= 1082;

      if (isLargeScreen) {
        // Разрешение >=1082px — включаем карусель (показываем стрелки + по две карточки)
        if (!isCarouselActive) {
          enableCarousel();
        }
      } else {
        // Разрешение меньше 1082px — выключаем карусель (все карточки видны, стрелки скрыты)
        if (isCarouselActive) {
          disableCarousel();
        }
      }
    }

    // Следим за изменением размера окна (с небольшой задержкой для производительности)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        checkScreenWidthAndApply();
      }, 100);
    });

    // Запускаем проверку при загрузке страницы
    checkScreenWidthAndApply();

    // Также повторно проверим, когда все изображения/шрифты загружены — для надёжности
    window.addEventListener('load', () => {
      checkScreenWidthAndApply();
    });
  });
})();