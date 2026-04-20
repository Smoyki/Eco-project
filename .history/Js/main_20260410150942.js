document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Отменяем стандартную отправку формы

        // Собираем данные формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            privacy: document.getElementById('privacy').checked
        };

        // Простая валидация
        if (!formData.name || !formData.phone) {
            alert('Пожалуйста, заполните все обязательные поля.');
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
        })
        .catch(error => {
            // Обработка ошибок
            console.error('Ошибка отправки:', error);
            alert('Произошла ошибка при отправке данных. Попробуйте ещё раз.');
        });
    }
});