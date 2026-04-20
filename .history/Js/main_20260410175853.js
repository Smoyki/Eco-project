document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    const name = document.getElementById('name').value;
    const countryCode = document.getElementById('countryCode').value;
    const phone = document.getElementById('phone').value;
    const agreeCheckbox = document.getElementById('agreeCheckbox').checked;

    if (agreeCheckbox) {
        const phoneWithCode = `${countryCode}${phone}`;
        alert(`Форма заполнена!\nИмя: ${name}\nТелефон: ${phoneWithCode}`);
        // Здесь можно добавить логику отправки данных на сервер
    } else {
        alert('Пожалуйста, согласитесь с политикой обработки данных.');
    }
});
// Стили для обратной связи