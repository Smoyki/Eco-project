document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");
  
  // Инициализируем intl-tel-input
  const iti = window.intlTelInput(phoneInput, {
    // Разрешаем выбор страны
    allowDropdown: true,
    // Показываем флаги стран
    showFlags: true,
    // Показываем код страны
    showCountryCode: true,
    // Автоматически добавляем скобки и пробелы
    separateDialCode: false,
    // Начальная страна (опционально)
    initialCountry: "ru",
    // Включаем валидацию номера
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  // Пример получения данных при отправке формы
  document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const fullNumber = iti.getNumber(); // Получаем номер с кодом страны
    const countryCode = iti.getSelectedCountryData().dialCode; // Получаем только код страны
    const agreeCheckbox = document.getElementById('agreeCheckbox').checked;

    if (agreeCheckbox) {
      alert(`Форма заполнена!\nИмя: ${name}\nТелефон: ${fullNumber}\nКод страны: ${countryCode}`);
      // Здесь можно добавить логику отправки данных на сервер
    } else {
      alert('Пожалуйста, согласитесь с политикой обработки данных.');
    }
  });
});
// Стили для обратной связи