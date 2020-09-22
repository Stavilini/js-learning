"use strict";
const sendForm = () => {
	const errorMessage = 'Что то пошло не так...',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const form = document.getElementById('form1');
	const form2 = document.getElementById('form2');
	const form3 = document.getElementById('form3');
	const input = form.querySelectorAll('input');
	const input2 = form2.querySelectorAll('input');
	const input3 = form3.querySelectorAll('input');

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem; color: white';

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		statusMessage.style.display = 'block';
		form.appendChild(statusMessage);
		statusMessage.textContent = loadMessage;
		const formData = new FormData(form);
		let body = {};

		formData.forEach((val, key) => {
			body[key] = val;
		});
		postData(body)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('status network not 200');
				}
				statusMessage.textContent = successMessage;
				setTimeout(() => statusMessage.style.display = 'none', 5000);
			})
			.catch(((error) => {
				statusMessage.textContent = errorMessage;
				console.error(error);
				setTimeout(() => statusMessage.style.display = 'none', 5000);
			})
			);

		input.forEach((item) => {
			item.value = '';
		});
	});

	form2.addEventListener('submit', (event) => {
		event.preventDefault();
		statusMessage.style.display = 'block';
		form2.appendChild(statusMessage);
		statusMessage.textContent = loadMessage;
		const formData = new FormData(form2);
		let body = {};

		formData.forEach((val, key) => {
			body[key] = val;
		});
		postData(body)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('status network not 200');
				}
				statusMessage.textContent = successMessage;
				setTimeout(() => statusMessage.style.display = 'none', 5000);
			})
			.catch(((error) => {
				statusMessage.textContent = errorMessage;
				console.error(error);
				setTimeout(() => statusMessage.style.display = 'none', 5000);
			})
			);

		input2.forEach((item) => {
			item.value = '';
		});
	});

	form3.addEventListener('submit', (event) => {
		event.preventDefault();
		statusMessage.style.display = 'block';
		form3.appendChild(statusMessage);
		statusMessage.textContent = loadMessage;
		const formData = new FormData(form3);
		let body = {};

		formData.forEach((val, key) => {
			body[key] = val;
		});
		postData(body)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('status network not 200');
				}
				statusMessage.textContent = successMessage;
				setTimeout(() => statusMessage.style.display = 'none', 5000);
			})
			.catch(((error) => {
				statusMessage.textContent = errorMessage;
				console.error(error);
				setTimeout(() => statusMessage.style.display = 'none', 5000);
			})
			);

		input3.forEach((item) => {
			item.value = '';
		});
	});

	document.addEventListener('input', (event) => {
		let target = event.target;
		if (target === target.closest('.form-name') || target === target.closest('#form2-name')) {
			target.value = target.value.replace(/[^а-я ]/gi, '');
		}
		if (target === target.closest('.mess')) {
			target.value = target.value.replace(/[^а-я0-9.,!-? ]/gi, '');
		}
		if (target === target.closest('.form-phone')) {
			target.value = target.value.replace(/[^\+\d]/g, '');
		}
	});

	const postData = (body) => {
		return fetch('./server.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
	};
};

export default sendForm;
