document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    // Инициализируем плагин выбора кода страны
    const phoneInput = document.getElementById('phone');
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: 'ru', // Страна по умолчанию — Россия
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js' // Для форматирования и валидации
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Получаем номер с кодом страны
        const fullPhoneNumber = iti.getNumber(); // Полный номер в международном формате

        // Собираем данные формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: fullPhoneNumber,
            privacy: document.getElementById('privacy').checked
        };

        // Простая валидация
        if (!formData.name) {
            alert('Пожалуйста, введите ваше имя.');
            return;
        }

        if (!iti.isValidNumber()) {
            alert('Пожалуйста, введите корректный номер телефона.');
            return;
        }

        if (!formData.privacy) {
            alert('Необходимо согласиться с политикой конфиденциальности.');
            return;
        }

        // Отправляем данные на сервер
        sendDataToServer(formData);
    });

    function sendDataToServer(data) {
        const serverUrl = 'https://your-server-url.com/api/submit'; // Замените на ваш URL

        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка сервера');
            }
        })
        .then(result => {
            // Успешная отправка
            alert('Данные успешно отправлены!');
            form.reset(); // Очищаем форму
            // Сбрасываем плагин intl-tel-input
            iti.setNumber('');
        })
        .catch(error => {
            // Обработка ошибок
            console.error('Ошибка отправки:', error);
            alert('Произошла ошибка при отправке данных. Попробуйте ещё раз.');
        });
    }
});
// Стили для формы обратной связи