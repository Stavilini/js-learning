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
                setInterval(updateClock, 1000)
            } else {
                timerHours.innerHTML = '00';
                timerMinutes.innerHTML = '00';
                timerSeconds.innerHTML = '00';
                timerSeparate.style = 'color: red';
            }
        }
        updateClock();
    }
    countTimer('4 september 2020');

    //menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elems) => elems.addEventListener('click', handlerMenu))
    };
    toggleMenu();
    //pop-up
    let counter = 0,
        pContent = document.querySelector('.popup-content'),
        popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popUpClose = document.querySelector('.popup-close');

    function popUpAnimate() {
        counter++;
        popUp.style.display = 'block';
        if (document.documentElement.clientWidth > 768) {
            if (counter <= 10) {
                pContent.style.opacity = counter * 20 + '%';
                console.log(counter);
                setTimeout(popUpAnimate, 30);
            }
        }
    }
    const togglePopUp = () => {
        for (let i = 0; i < popupBtn.length; i++) {
            popupBtn[i].addEventListener('click', popUpAnimate)
        }
    };
    popUpClose.addEventListener('click', () => {
        popUp.style.display = 'none';
        counter = 0;
    });
    togglePopUp();
});