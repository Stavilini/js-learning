const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся';
    const allForm = document.querySelectorAll('form');
    allForm.forEach((form) => {
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';
        statusMessage.style.color = '#fff';
        const formPhone = form.querySelector('.form-phone');
        formPhone.addEventListener('input', () => {
            formPhone.value = formPhone.value.replace(/[^0-9+]/, '');
        });
        const formEmail = form.querySelector('.form-email');
        formEmail.addEventListener('input', () => {
            formEmail.value = formEmail.value.replace(/[^a-z0-9.@_]/, '');
        })
        const formName = form.querySelector('input[name="user_name"]');
        formName.addEventListener('input', () => {
            formName.value = formName.value.replace(/[^ а-яё]/ig, '');
        });
        const mess = document.querySelector('.mess');
        mess.addEventListener('input', () => {});
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};
            formData.forEach((value, key) => {
                body[key] = value;
            });
            const success = () => {
                statusMessage.textContent = successMessage;
                const inputForm = form.querySelectorAll('input');
                inputForm.forEach(elem => {
                    elem.value = '';
                });
                const deleteStatusMessage = () => {
                    statusMessage.remove();
                };
                setTimeout(deleteStatusMessage, 3000);
            };
            const error = () => {
                statusMessage.textContent = errorMessage;
            };
            postData(body)
                .then(success)
                .catch(success);
        });
        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST ',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        };
    });
};
export default sendForm;