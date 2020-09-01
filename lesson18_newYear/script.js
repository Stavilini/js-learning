'use strict';

let greeting = document.querySelector('.greeting'),
    today = document.querySelector('.today'),
    nowTime = document.querySelector('.now-time'),
    toNYear = document.querySelector('.to-new-year');
let greetingVars = ['Доброе утро!', 'Добрый день!', 'Добрый вечер!', 'Доброй ночи!'],
    weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

function timer(newYear) {
    function sendTime() {
        let date = new Date(),
            dateStop = new Date(newYear).getTime(),
            dateNow = new Date().getTime(),
            timeRemainig = (dateStop - dateNow) / 1000,
            day = Math.floor(timeRemainig / 60 / 60 / 24),
            time = date.toLocaleString('ru', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        let greetingType;
        if (date.getHours() >= 7 && date.getHours() <= 11) {
            greetingType = 0;
        } else if (date.getHours() > 11 && date.getHours() <= 18) {
            greetingType = 1;
        } else if (date.getHours() > 18 && date.getHours() <= 23) {
            greetingType = 2;
        } else {
            greetingType = 3;
        }
        return { day, time, greetingType };
    };
    setInterval(refresh, 100);

    function refresh() {
        let sendTimeDate = sendTime();
        greeting.innerHTML = greetingVars[sendTimeDate.greetingType];
        today.innerHTML = 'Сегодня ' + weekDays[new Date().getDay() - 1] + ';';
        nowTime.innerHTML = 'Текущее время: ' + sendTimeDate.time + ';';
        toNYear.innerHTML = 'До нового года осталось ' + sendTimeDate.day + ' дней!';
    };
};
timer('december 31 2020');