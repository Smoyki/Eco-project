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
    // Находим элементы
    const swiperContainer = document.querySelector('.swiper-container');
    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    const slides = swiperContainer.querySelectorAll('.swiper-slide');
    
    // Создаем элементы навигации
    const navigationDiv = document.createElement('div');
    navigationDiv.className = 'swiper-navigation';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'swiper-button swiper-button-prev';
    prevButton.innerHTML = '‹';
    prevButton.setAttribute('aria-label', 'Previous slide');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'swiper-button swiper-button-next';
    nextButton.innerHTML = '›';
    nextButton.setAttribute('aria-label', 'Next slide');
    
    navigationDiv.appendChild(prevButton);
    navigationDiv.appendChild(nextButton);
    swiperContainer.appendChild(navigationDiv);
    
    // Переменные состояния
    let currentIndex = 1; // Начинаем с активного слайда
    const slideWidth = 229; // Ширина слайда
    const marginRight = 10; // Отступ между слайдами
    const totalSlides = slides.length;
    
    // Функция обновления позиции
    function updatePosition() {
        const offset = -(currentIndex * (slideWidth + marginRight));
        swiperWrapper.style.transform = `translate3d(${offset}px, 0px, 0px)`;
        swiperWrapper.style.transitionDuration = '400ms';
        
        // Обновляем классы активности
        slides.forEach((slide, index) => {
            slide.classList.remove('swiper-slide-active', 'swiper-slide-next', 'swiper-slide-prev');
            
            if (index === currentIndex) {
                slide.classList.add('swiper-slide-active');
            } else if (index === currentIndex + 1) {
                slide.classList.add('swiper-slide-next');
            } else if (index === currentIndex - 1) {
                slide.classList.add('swiper-slide-prev');
            }
        });
        
        // Обновляем состояние кнопок
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalSlides - 1;
    }
    
    // Функция перехода к следующему слайду
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updatePosition();
        }
    }
    
    // Функция перехода к предыдущему слайду
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updatePosition();
        }
    }
    
    // Обработчики событий
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Обработчики клавиатуры
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Swipe для мобильных устройств
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    swiperContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        swiperWrapper.style.transitionDuration = '0ms';
    });
    
    swiperContainer.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        const currentOffset = -(currentIndex * (slideWidth + marginRight));
        swiperWrapper.style.transform = `translate3d(${currentOffset - diff}px, 0px, 0px)`;
    });
    
    swiperContainer.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = startX - currentX;
        const swipeThreshold = 50;
        
        if (diff > swipeThreshold && currentIndex < totalSlides - 1) {
            nextSlide();
        } else if (diff < -swipeThreshold && currentIndex > 0) {
            prevSlide();
        } else {
            updatePosition(); // Возвращаем на место
        }
    });
    
    // Автоматическое обновление при изменении размера окна
    window.addEventListener('resize', updatePosition);
    
    // Инициализация
    updatePosition();
});

// 
