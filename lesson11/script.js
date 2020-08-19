let bookCollection = document.querySelectorAll('.book'); //все книги
let adWare = document.querySelector('.adv'); //рекламка
adWare.remove();

bookCollection[0].before(bookCollection[1]);
bookCollection[2].before(bookCollection[4]);
bookCollection[2].before(bookCollection[3]);
bookCollection[2].before(bookCollection[5]);
bookCollection[0].classList.add('book2');

let book2 = document.querySelectorAll('.book2 li');
book2[3].after(book2[6]);
book2[6].after(book2[8]);
book2[9].after(book2[2]);

bookCollection[4].classList.add('book3');
let book3 = document.querySelector('.book3 h2 a');
book3.textContent = 'Книга 3. this и Прототипы Объектов';

bookCollection[5].classList.add('book5');
book5 = document.querySelectorAll('.book5 li');
book5[2].before(book5[9]);
book5[2].before(book5[3]);
book5[2].before(book5[4]);
book5[2].after(book5[6]);
book5[6].after(book5[7]);

bookCollection[2].classList.add('book6');

book6 = document.querySelectorAll('.book6 li');
const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
book6[8].after(newElem);

let bodyBG = document.querySelector('body');
console.log(bodyBG);
bodyBG.style = 'background-image:url(./image/you-dont-know-js.jpg)'