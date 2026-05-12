const phoneInput = document.getElementById("phone");

phoneInput.placeholder = "(999) 999-99-99";

const iti = window.intlTelInput(phoneInput, {

    initialCountry: "ru",

    separateDialCode: true,

    autoPlaceholder: "off"
});

phoneInput.placeholder = "(999) 999-99-99";