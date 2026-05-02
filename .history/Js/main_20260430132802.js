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
  (function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Получаем карточки по их классам (или можно через селекторы)
        const card1 = document.querySelector('.card_1');
        const card2 = document.querySelector('.card_2');
        const card3 = document.querySelector('.card_3');
        const card4 = document.querySelector('.card_4');
        
        // Элементы управления
        const prevBtn = document.getElementById('prevSlideBtn');
        const nextBtn = document.getElementById('nextSlideBtn');
        const dots = document.querySelectorAll('.dot');
        
        let currentSlide = 1; // 1 — показываем card1+card2; 2 — card3+card4
        
        // Функция обновления видимости карточек и активных точек
        function updateSlides() {
            if (currentSlide === 1) {
                if (card1) card1.classList.remove('card-hidden');
                if (card2) card2.classList.remove('card-hidden');
                if (card3) card3.classList.add('card-hidden');
                if (card4) card4.classList.add('card-hidden');
            } else {
                if (card1) card1.classList.add('card-hidden');
                if (card2) card2.classList.add('card-hidden');
                if (card3) card3.classList.remove('card-hidden');
                if (card4) card4.classList.remove('card-hidden');
            }
            
            // Обновляем активные точки
            dots.forEach(dot => {
                const slideValue = parseInt(dot.getAttribute('data-slide'), 10);
                if (slideValue === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Переход на конкретный слайд
        function goToSlide(slideNumber) {
            if (slideNumber === 1 || slideNumber === 2) {
                currentSlide = slideNumber;
                updateSlides();
            }
        }
        
        // Следующий слайд (с зацикливанием)
        function nextSlide() {
            currentSlide = currentSlide === 1 ? 2 : 1;
            updateSlides();
        }
        
        // Предыдущий слайд
        function prevSlide() {
            currentSlide = currentSlide === 2 ? 1 : 2;
            updateSlides();
        }
        
        // Начальная инициализация: слайд 1 (card1+card2 видны, card3+card4 скрыты)
        function init() {
            // на всякий случай убираем hidden у всех, затем применим логику первого слайда
            if (card1) card1.classList.remove('card-hidden');
            if (card2) card2.classList.remove('card-hidden');
            if (card3) card3.classList.remove('card-hidden');
            if (card4) card4.classList.remove('card-hidden');
            
            currentSlide = 1;
            if (card3) card3.classList.add('card-hidden');
            if (card4) card4.classList.add('card-hidden');
            
            // синхронизируем точки
            dots.forEach(dot => {
                const slideVal = parseInt(dot.getAttribute('data-slide'), 10);
                if (slideVal === 1) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }
        
        // Навешиваем обработчики на кнопки
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
            });
        }
        
        // Обработчики для точек
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetSlide = parseInt(dot.getAttribute('data-slide'), 10);
                if (!isNaN(targetSlide) && (targetSlide === 1 || targetSlide === 2)) {
                    goToSlide(targetSlide);
                }
            });
        });
        
        // Дополнительно: навигация с клавиатуры (стрелки влево/вправо)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        });
        
        // Запускаем инициализацию
        init();
    });
})();