'use strict';
let isNumber = function(input) {
    return !isNaN(parseFloat(input)) && isFinite(input)
};
//ПОЛЯ СЛЕВА//
//Доходы//
let salaryAmount = document.querySelector('.salary-amount'); //месячный доход
let incomeTitle = document.querySelector('input.income-title')// дополнительный доход
let incomeItems = document.querySelectorAll('.income-items');
// let incomeAmount = document.querySelector('.income-amount') //сумма доп. дохода
let addIncomeBtn = document.getElementsByTagName('button')[0]; // доходы кнопка +
let addIncomeInput = document.querySelectorAll('.additional_income-item'); //возможные доходы ввод * 2
let expensesTitle = document.querySelector('.expenses-title') //Обязательные расходы наименование
// let expensesAmount = document.querySelector('.expenses-amount') //Обязательные расходы сумма
let expensesItems = document.querySelectorAll('.expenses-items');
let addExpensesBtn = document.getElementsByTagName('button')[1]; // расходы кнопка +
//Возможные расходы//
let additionalExpensesItem = document.querySelector('.additional_expenses-item'); //Возможные расходы ввод
let depositCheckbox = document.querySelector('#deposit-check'); // чекбокс депозита
let targetAmount = document.querySelector('.target-amount');
let targetPeriodSlider = document.querySelector('.period-select');
//ПОЛЯ СПРАВА//
let budgetMonthValue = document.querySelector('.budget_month-value'); //доход за месяц
let budgetDayValue = document.querySelector('.budget_day-value'); //бюджет на день
let expensesMonthValue = document.querySelector('.expenses_month-value'); //расходы за месяц
let additionalIncomeValue = document.querySelector('.additional_income-value'); //возможные доходы вывод
let additionalExpensesValue = document.querySelector('.additional_expenses-value'); //возможные расходы вывод
let incomePeriodValue = document.querySelector('.income_period-value'); // Накопления за период
let targetMonthValue = document.querySelector('.target_month-value'); // срок достижения в месяцах
const start = document.getElementById('start'); // Кнопка "рассчитать"
let addData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    depositPercent: 0,
    depositMoney :0,
    mission: 50000,
    period: 10,
    start: function() {
        if(salaryAmount.value === ''){
            alert('Заполните поле месячного дохода');
            return;
        }else{
            addData.budget = +salaryAmount.value;
        };
        // addData.asking();
        addData.getInfoDeposit();
        addData.budgetMonth = addData.getBudget(addData.budget, addData.getExpensesMonth());
        addData.budgetDay = Math.floor(addData.budgetMonth / 30);
        addData.period = Math.ceil(addData.mission / addData.budgetMonth);
        addData.getExpenses();

        
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length == 3){
            addExpensesBtn.style = 'display:none';
        }
    },
    addIncomeBlock:function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length == 3){
            addIncomeBtn.style = 'display:none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(item !== '' && cashExpenses !== ''){
                addData.expenses[itemExpenses] = cashExpenses;
            }
        });    
    },
    asking: function() {
        if(confirm('Есть ли у вас доп. заработок?')){
            let itemIncome = 0;
            let cashIncome = 0;
            do{
                itemIncome = prompt('какой у вас доп. заработок?', 'такси');
        }while(isNumber(itemIncome) || itemIncome.trim()==='');
            do{
                cashIncome = prompt('сколько денег в месяц доход?', 10000)
        }while(!isNumber(cashIncome))
            addData.income[itemIncome] = cashIncome;
        }
        let cost = 0;
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период, через запятую');
        addData.addExpenses = addExpenses.toLowerCase().split(', ');
        addData.deposit = confirm('Есть ли у вас депозит в банке?');
        // let questions = +prompt('Сколько статей расходов у вас есть?');
        
        // for (let i = 0; i < questions; i++) {
        //     let costItem = '';
        //     do{
        //         costItem = prompt('Введите обязательную статью расходов, ' + (i + 1) + ' из ' + questions)
        //     }while(isNumber(costItem) || costItem.trim()==='')
        //     do {
        //         cost = +prompt('Во сколько это обойдется, ' + (i + 1) + ' из ' + questions);
        //     }while(!isNumber(cost));
        //     addData.expenses[costItem] = cost;
        // }
        // console.log(addData.expenses);

    },
    getExpensesMonth: function() {
        let expensesSum = 0;
        for (let key in addData.expenses) {
            expensesSum += addData.expenses[key];
            addData.expensesMonth = expensesSum;
        }

        return expensesSum;
    },

    getBudget: function(a, b) {
        if (!a) {
            a = 0;
            console.log('var "a" isnt defined');
        }
        if (!b) {
            b = 0;
            console.log('var "b" isnt defined');
        }
        return a - b;
    },
    getTargetMonth: function(a, b) {
        if (!a) {
            a = 0;
            console.log('var "a" isnt defined');
        }
        if (!b) {
            b = 0;
            console.log('var "b" isnt defined');
        }
        return a / b;
    },
    getStatusIncome: function() {
        if (addData.budgetDay < 0) {
            return ('Что то пошло не так');
        } else if (addData.budgetDay > 0 && addData.budgetDay <= 600) {
            return ('К сожалению у вас уровень дохода ниже среднего. Дневной бюджет: ' + addData.budgetDay + ' Рублей');
        } else if (addData.dayBudget > 600 && addData.budgetDay <= 1200) {
            return ('У вас budgetDay уровень дохода. Дневной бюджет: ' + addData.budgetDay + ' Рублей');
        } else {
            return ('У вас высокий уровень дохода. Дневной бюджет: ' + addData.budgetDay + ' Рублей');
        };
    },
    getInfoDeposit: function(){
        if(addData.deposit){
    do{addData.depositPercent = prompt('Годовой процент?', 10)
        }while(!isNumber(addData.depositPercent));
    do{addData.depositMoney = prompt('Сумма депозита?', 20000)
    }while(!isNumber(addData.depositMoney));
        }
    },
    calcSavedMoney:function(){
        return addData.budgetDay * addData.period;
    }
};
start.addEventListener('click', addData.start);
addExpensesBtn.addEventListener('click',addData.addExpensesBlock);
addIncomeBtn.addEventListener('click', addData.addIncomeBlock)


//console.log('Расходы за месяц составляют ' + addData.getExpensesMonth());

// if (addData.period < 0) {
//     console.log('Цель не будет достигнута. НИКОГДА!');
// } else {
//     console.log('Период достижения цели равен ' + addData.period + ' месяцев');
// }
// console.log(addData.getStatusIncome());

// for (let key in addData) {
//     console.log('Наша программа включает в себя данные: Ключ: ' + key + ', Значение: ' + addData[key]);
// }

let upPer = function(array){
    let arr = [];
    for(let i=0; i<array.length; i++){
        let str = array[i].trim();
        arr[i] = str[0].toUpperCase()+str.slice(1);
        console.log(str[0].toUpperCase());
    }
    console.log(arr.join(', '));
}
upPer(addData.addExpenses)