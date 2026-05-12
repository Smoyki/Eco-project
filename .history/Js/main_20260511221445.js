document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);
});
// Стили для увеличения qr-code


// Стили для позиционирования меню, чтобы при открытии materibox, меню пропадало



document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("feedbackForm");
  const form = document.getElementById("feedbackForms");
  const phoneInput = document.getElementById("phone");
  const nameInput = document.getElementById("name");
  const checkbox = document.getElementById("agreeCheckbox");

  // intl-tel-input
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "ru",

    preferredCountries: [
      "ru",
      "by",
      "kz",
      "ua"
    ],

    separateDialCode: true,

    allowDropdown: true,

    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });

  // Маска РФ по умолчанию
  applyMask("+ (999) 999-99-99");

  // Смена страны
  phoneInput.addEventListener("countrychange", () => {

    const countryData =
      iti.getSelectedCountryData();

    const countryCode = countryData.iso2;

    // Маски под страны
    switch (countryCode) {

      case "ru":
        applyMask("(999) 999-99-99");
        break;

      case "by":
        applyMask("(99) 999-99-99");
        break;

      case "kz":
        applyMask("(999) 999-99-99");
        break;

      default:
        applyMask("999999999999");
    }
  });

  // Функция маски
  function applyMask(mask) {

    Inputmask.remove(phoneInput);

    Inputmask({
      mask: mask,
      placeholder: "_",
      showMaskOnHover: false,
      showMaskOnFocus: true,
      clearIncomplete: true
    }).mask(phoneInput);
  }

  // Отправка формы
  form.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name.length < 2) {
      alert("Введите имя");
      return;
    }

    // Проверка телефона
    if (phone.includes("_")) {
      alert("Введите корректный номер");
      return;
    }

    // Проверка checkbox
    if (!checkbox.checked) {
      alert(
        "Подтвердите согласие с обработкой данных"
      );
      return;
    }

    // Полный номер
    const fullPhone =
      iti.getNumber();

    // Успешная отправка
    alert(
      `Форма заполнена!\nИмя: ${name}\nТелефон: ${fullPhone}`
    );

    // fetch(...)
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

// Анимация чисел
document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.about_h3');
  const speed = 200; // Скорость анимации

  counters.forEach(counter => {
    const originalText = counter.textContent.trim();
    const targetValue = getTargetValue(originalText);

    let currentValue = 0;

    const isPercent = originalText.includes('%');
    const isPlus = originalText.includes('+');
    const isYear = originalText.includes('года');

    const updateCounter = () => {
      const increment = targetValue / speed;
      currentValue += increment;

      if (currentValue < targetValue) {
        const value = Math.floor(currentValue);

        if (isPercent) {
          counter.textContent = value + '%';
        } else if (isPlus) {
          counter.textContent = value + '+';
        } else if (isYear) {
          counter.textContent = 'С ' + value + ' года';
        } else {
          counter.textContent = value;
        }

        setTimeout(updateCounter, 10);
      } else {
        // Финальное значение
        if (isPercent) {
          counter.textContent = Math.round(targetValue) + '%';
        } else if (isPlus) {
          counter.textContent = Math.round(targetValue) + '+';
        } else if (isYear) {
          counter.textContent = 'С ' + Math.round(targetValue) + ' года';
        } else {
          counter.textContent = Math.round(targetValue);
        }
      }
    };

    updateCounter();
  });
});

function getTargetValue(text) {
  // Извлекаем число из текста
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
