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
  const aboutSection = document.querySelector('.about');

  // Функция для извлечения числового значения из текста
  function getTargetValue(text) {
    const match = text.match(/-?\d+(?:,\d+)?/);
    return match ? parseFloat(match[0].replace(',', '.')) : 0;
  }

  // Функция запуска анимации счётчиков
  function startCounterAnimation() {
    const counters = document.querySelectorAll('.about_h3');
    const speed = 200; // Общее количество шагов анимации (чем больше, тем медленнее)

    counters.forEach(counter => {
      const targetValue = getTargetValue(counter.textContent);
      let currentValue = 0;
      const step = targetValue / speed; // Величина шага на каждом тике

      // Очищаем предыдущий текст перед началом анимации
      counter.textContent = '0';

      const updateCounter = () => {
        currentValue += step;

        if (currentValue < targetValue) {
          // Форматируем вывод в зависимости от типа данных
          if (counter.textContent.includes('%')) {
            counter.textContent = currentValue.toFixed(1).replace('.', ',') + '%';
          } else if (counter.textContent.includes('+')) {
            counter.textContent = Math.floor(currentValue) + '+';
          } else if (counter.textContent.includes('года')) {
            counter.textContent = 'С ' + Math.floor(currentValue) + ' года';
          } else {
            counter.textContent = Math.floor(currentValue);
          }
          setTimeout(updateCounter, 10); // Задержка между шагами (мс)
        } else {
          // Устанавливаем финальное значение с сохранением формата
          if (counter.textContent.includes('%')) {
            counter.textContent = targetValue.toFixed(1).replace('.', ',') + '%';
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
  }

  // Настраиваем Intersection Observer для отслеживания видимости секции
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounterAnimation();
        // Отключаем наблюдатель после первого срабатывания для этой секции
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Анимация запускается, когда 10% секции видно на экране
    rootMargin: '0px 0px -50px 0px' // Слегка смещаем область видимости вверх
  });

  // Начинаем наблюдение за секцией .about
  if (aboutSection) {
    observer.observe(aboutSection);
  } else {
    console.warn('Секция .about не найдена на странице');
  }
});
