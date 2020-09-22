const popUp = () => {

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
}
export default popUp;