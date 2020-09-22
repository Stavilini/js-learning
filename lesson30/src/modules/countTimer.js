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
};

export default countTimer;