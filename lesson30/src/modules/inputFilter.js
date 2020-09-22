const inputFilter = () => {
    const calcBlock = document.querySelector('.calc-block');
    let calcInput = calcBlock.querySelectorAll('input');
    calcInput.forEach((item) => {
        item.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/\D/g, '');
        })
    })
}
export default inputFilter;