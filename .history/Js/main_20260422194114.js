document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems);
  });



// Стили для увеличения qr-code


// Стили для позиционирования меню 
(function() {
    // Находим меню по вашему классу (HTML не меняем)
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    // Функция обновления отступа body
    function updateBodyPadding() {
        if (nav.classList.contains('sticky')) {
            const navHeight = nav.offsetHeight;
            document.body.style.setProperty('--sticky-nav-height', navHeight + 'px');
            document.body.classList.add('sticky-nav-active');
        } else {
            document.body.classList.remove('sticky-nav-active');
            document.body.style.removeProperty('--sticky-nav-height');
        }
    }

    // Функция проверки скролла
    function checkSticky() {
        const stickyOffset = nav.offsetTop;   // исходное положение меню от верха
        const scrollY = window.scrollY;

        if (scrollY >= stickyOffset) {
            if (!nav.classList.contains('sticky')) {
                nav.classList.add('sticky');
                updateBodyPadding();
            }
        } else {
            if (nav.classList.contains('sticky')) {
                nav.classList.remove('sticky');
                updateBodyPadding();
            }
        }
    }

    // Пересчёт при изменении размера окна (может поменяться высота меню)
    function recalcAndCheck() {
        if (nav.classList.contains('sticky')) {
            updateBodyPadding();  // обновляем отступ, если меню уже липкое
        }
        checkSticky();            // заново проверяем позицию
    }

    // Слушаем события
    window.addEventListener('scroll', checkSticky);
    window.addEventListener('resize', recalcAndCheck);

    // Запускаем при загрузке (на случай, если страница уже прокручена)
    setTimeout(checkSticky, 20);
})();


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
