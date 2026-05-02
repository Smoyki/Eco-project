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
  const glide = new Glide('.glide', {
    type: 'carousel',           // тип: карусель (можно поменять на 'slider')
    startAt: 0,             // начинаем с первого слайда (нумерация с 0)
    perView: 3,           // показываем 3 слайда одновременно
    focusAt: 'center',      // центральный слайд в фокусе
    autoplay: 3000,      // автопрокрутка каждые 3 секунды (0 или false — отключить)
    hoverpause: true,       // пауза автопрокрутки при наведении мыши
    keyboard: true,         // управление стрелками клавиатуры
    touchRatio: 0.5,    // чувствительность к свайпам (0–1)
    animationDuration: 600, // длительность анимации перехода (мс)
    rewind: true,         // зацикливание (после последнего слайда — первый)
    gap: 20,           // отступ между слайдами (px)
    bound: false,         // разрешить выход за границы (для carousel)
    easing: 'cubic-bezier(0.25, 0.75, 0.5, 1)' // тип анимации
  });

  // Инициализация слайдера
  glide.mount();

  // Отслеживание событий (опционально, для отладки)
  glide.on('mounted', () => {
    console.log('Glide: слайдер инициализирован');
  });

  glide.on('move', () => {
    console.log('Glide: происходит переход между слайдами');
  });

  glide.on('run.end', () => {
    console.log('Glide: переход завершён');
  });

  // Пример программного управления (можно вызвать по клику кнопки и т. д.)
  // glide.go('>');     // следующий слайд
  // glide.go('<');    // предыдущий слайд
  // glide.go('=5');   // перейти к 5‑му слайду
  // glide.update({ autoplay: false }); // обновить настройки
  // glide.destroy();  // уничтожить слайдер
});