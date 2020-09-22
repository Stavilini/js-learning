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
export default calc;