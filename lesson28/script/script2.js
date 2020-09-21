window.addEventListener('DOMContentLoaded', () => {
    //timer

    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            timerSeparate = document.querySelector('.timer-numbers');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function addTen(n) {
            if (n < 10) {
                return '0' + n
            } else {
                return n
            }
        }

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.innerHTML = addTen(timer.hours);
            timerMinutes.innerHTML = addTen(timer.minutes);
            timerSeconds.innerHTML = addTen(timer.seconds);
            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000)
            } else {
                timerHours.innerHTML = '00';
                timerMinutes.innerHTML = '00';
                timerSeconds.innerHTML = '00';
                timerSeparate.style = 'color: red';
            }
        }
        updateClock();
    }
    countTimer('22  september 2020');

    //menu open & close
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        btnMenu.addEventListener('click', () => {
            menu.classList.toggle('active-menu');
        });
        menu.addEventListener('click', () => {
            let target = event.target;
            if (target.classList.contains('close-btn') || target !== menu) {
                target = target.closest('.close-btn');
                menu.classList.toggle('active-menu');
            }
        });
    };
    toggleMenu();

    //pop-up
    let counter = 0,
        pContent = document.querySelector('.popup-content'),
        popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');

    function popUpAnimate() {
        counter++;
        popUp.style.display = 'block';
        if (document.documentElement.clientWidth > 768) {
            if (counter <= 10) {
                pContent.style.opacity = counter * 20 + '%';
                setTimeout(popUpAnimate, 30);
            }
        }
    }
    const togglePopUp = () => {
        for (let i = 0; i < popupBtn.length; i++) {
            popupBtn[i].addEventListener('click', popUpAnimate)
        }
    };
    popUp.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
            counter = 0;
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popUp.style.display = 'none';
            }
        }

    })
    togglePopUp();

    //tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        })
    };
    tabs();

    //slider

    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots'),
            slide = document.querySelectorAll('.portfolio-item');

        let currentSlide = 0,
            interval,
            dot;

        for (let i = 0; i < slide.length; i++) {
            dot = document.createElement('li');
            dot.classList.add('dot');
            portfolioDots.appendChild(dot);
            document.querySelectorAll('.dot')[0].classList.add('dot-active');
        }
        let dots = portfolioDots.querySelectorAll('li');
        dots = Array.from(dots);

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };


        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');


        };
        const startSlide = (time = 4500) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval)
        };
        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (
                target.matches('.dot')) {
                dots.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                })
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide();

    };
    slider();
    //team

    const photoswitch = () => {
        const team = document.getElementById('command');
        let teamPhoto = team.querySelectorAll('.command__photo');
        let tempPhoto;
        teamPhoto.forEach((item) => {
            item.addEventListener('mouseover', (event) => {
                tempPhoto = event.target.src;
                event.target.src = event.target.dataset.img
            });
            item.addEventListener('mouseleave', (event) => {
                event.target.src = tempPhoto;
            })
        })
    };
    photoswitch();

    const inputFilter = () => {
        const calcBlock = document.querySelector('.calc-block');
        let calcInput = calcBlock.querySelectorAll('input');
        calcInput.forEach((item) => {
            item.addEventListener('input', (event) => {
                event.target.value = event.target.value.replace(/\D/g, '');
            })
        })
    }
    inputFilter();

    //calc 
    const calc = (price) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcArea = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcLimitation = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            let AreaValue = +calcArea.value;
            let countValue = 1;
            let dayValue = 1;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcLimitation.value && calcLimitation.value <= 5) {
                console.log(total);
                dayValue *= 2;
            } else if (calcLimitation.value && calcLimitation.value > 5 && calcLimitation.value <= 10) {
                dayValue *= 1.5;
            }

            if (typeValue && AreaValue) {
                total = price * typeValue * AreaValue * countValue * dayValue;
            }


            totalValue.textContent = total;
        }

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc(100);

    //send-ajax-form
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
                formEmail.value = formEmail.value.replace(/[^a-z+@]/, '');
            })


            const formName = form.querySelector('input[name="user_name"]');
            formName.addEventListener('input', () => {
                formName.value = formName.value.replace(/[^ а-яё]/ig, '');
            });

            const mess = document.querySelector('.mess');
            mess.addEventListener('input', () => {
                mess.value = mess.value.replace(/[^ а-яё]/ig, '');
            });
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
                    console.error();
                };
                postData(body)
                    .then(success)
                    .catch(error);
            });
            const postData = (body) => {
                return new Promise((resolve, reject) => {
                    const request = new XMLHttpRequest();
                    request.addEventListener('readystatechange', () => {
                        if (request.readyState !== 4) {
                            return;
                        }
                        if (request.status === 200) {
                            resolve();
                        } else {
                            reject(request.status);
                        }
                    });
                    request.open('GET', './server.php');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send(JSON.stringify(body));
                });

            };
        });

    };
    sendForm();

});