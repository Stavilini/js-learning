window.addEventListener('DOMContentLoaded', () => {
    timer

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
    countTimer('7  september 2020');

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
        const startSlide = (time = 1000) => {
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
});