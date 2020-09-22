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
export default toggleMenu;