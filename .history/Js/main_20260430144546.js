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
(function () {
  // Дождаться полной загрузки DOM
  document.addEventListener('DOMContentLoaded', () => {
    // DOM-элементы
    const cardsSection = document.querySelector('.cards-section');
    const card1 = document.querySelector('.card_1');
    const card2 = document.querySelector('.card_2');
    const card3 = document.querySelector('.card_3');
    const card4 = document.querySelector('.card_4');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');

    // Проверка наличия всех необходимых элементов
    if (!cardsSection || !card1 || !card2 || !card3 || !card4 || !prevBtn || !nextBtn) {
      console.warn('Карусель: не найдены обязательные элементы. Проверьте классы .cards-section, .card_1-4, .carousel-button');
      return;
    }

    // Переменная для отслеживания предыдущего состояния режима карусели (чтобы сбрасывать только при смене порога)
    let wasCarouselActive = null;

    // Вспомогательная функция: сброс к первой группе (карточки 1 и 2 видны, 3 и 4 скрыты)
    function resetToFirstGroup() {
      card1.classList.remove('hidden');
      card2.classList.remove('hidden');
      card3.classList.add('hidden');
      card4.classList.add('hidden');
    }

    // Функция: показать вторую группу (карточки 3, 4 — видны, 1, 2 — скрыты)
    function showSecondGroup() {
      card1.classList.add('hidden');
      card2.classList.add('hidden');
      card3.classList.remove('hidden');
      card4.classList.remove('hidden');
    }

    // Функция: показать первую группу (аналогично resetToFirstGroup)
    function showFirstGroup() {
      card1.classList.remove('hidden');
      card2.classList.remove('hidden');
      card3.classList.add('hidden');
      card4.classList.add('hidden');
    }

    // Проверить, активна ли сейчас группа 2 (видна card3 или card4 без hidden – достаточно card3)
    function isSecondGroupActive() {
      return !card3.classList.contains('hidden');
    }

    // Удалить класс hidden у всех карточек (используется при выходе из карусельного режима)
    function showAllCards() {
      card1.classList.remove('hidden');
      card2.classList.remove('hidden');
      card3.classList.remove('hidden');
      card4.classList.remove('hidden');
    }

    // Обновить состояние карусели в зависимости от ширины окна
    function updateCarouselMode() {
      const isSmallScreen = window.innerWidth < 1079;

      // Если режим карусели включен (низкое разрешение)
      if (isSmallScreen) {
        // Если раньше режим был неактивен (или первый раз) -> сбрасываем на первую группу
        if (!wasCarouselActive) {
          resetToFirstGroup();
        }
        // Добавляем класс активации на секцию (отвечает за видимость кнопок и стили)
        cardsSection.classList.add('carousel-active');
      }
      else {
        // Ширина >= 1079px: отключаем режим карусели
        cardsSection.classList.remove('carousel-active');
        // Обязательно показываем все карточки (убираем hidden)
        showAllCards();
      }

      // Запоминаем текущее состояние для следующего вызова
      wasCarouselActive = isSmallScreen;
    }

    // ---- Обработчики для стрелок (переключение групп) ----
    // Левая стрелка (prev) – возврат к первой группе (карточки 1,2)
    function onPrevClick() {
      // Работаем только если активен карусельный режим (ширина < 1079)
      if (!cardsSection.classList.contains('carousel-active')) return;

      // Если сейчас активна вторая группа (видны 3 и 4) – переключаем на первую
      if (isSecondGroupActive()) {
        showFirstGroup();
      }
      // если уже первая группа – ничего не делаем (граница)
    }

    // Правая стрелка (next) – переход ко второй группе (карточки 3,4)
    function onNextClick() {
      if (!cardsSection.classList.contains('carousel-active')) return;

      // Если активна первая группа (карточки 1 и 2 не скрыты) – переключаем на вторую
      if (!isSecondGroupActive()) {
        showSecondGroup();
      }
      // иначе игнорируем
    }

    // Вешаем события на кнопки
    prevBtn.addEventListener('click', onPrevClick);
    nextBtn.addEventListener('click', onNextClick);

    // Инициализация при загрузке страницы
    updateCarouselMode();

    // Отслеживаем изменение размера окна (с debounce для производительности)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCarouselMode();
      }, 150);
    });

    // Дополнительно: сброс скрытых классов при любом внешнем вмешательстве (например, если разработчик добавит класс hidden вручную — защита)
    // Необязательная страховка: проверка целостности после полной загрузки стилей
    window.addEventListener('load', () => {
      updateCarouselMode();
    });
  });
})();