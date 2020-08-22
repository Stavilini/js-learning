'use strict';
let isNumber = function(input) {
    return !isNaN(parseFloat(input)) && isFinite(input)
};
let startId = document.querySelector('#start'),
    blockStart = document.querySelector('#start').setAttribute('disabled', 'true');
let salaryAmount = document.querySelector('.salary-amount'), //месячный доход
    incomeTitle = document.querySelector('input.income-title'), // дополнительный доходz
    incomeItems = document.querySelectorAll('.income-items'),
    addIncomeBtn = document.getElementsByTagName('button')[0], // доходы кнопка +
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), //возможные доходы ввод * 2
    expensesTitle = document.querySelector('.expenses-title'), //Обязательные расходы наименование
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpensesBtn = document.getElementsByTagName('button')[1], // расходы кнопка +
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), //Возможные расходы ввод
    depositCheckbox = document.querySelector('#deposit-check'), // чекбокс депозита
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    budgetMonthValue = document.querySelector('.budget_month-value'), //доход за месяц
    budgetDayValue = document.querySelector('.budget_day-value'), //бюджет на день
    expensesMonthValue = document.querySelector('.expenses_month-value'), //расходы за месяц
    additionalIncomeValue = document.querySelector('.additional_income-value'), //возможные доходы вывод
    additionalExpensesValue = document.querySelector('.additional_expenses-value'), //возможные расходы вывод
    incomePeriodValue = document.querySelector('.income_period-value'), // Накопления за период
    targetMonthValue = document.querySelector('.target_month-value'), // срок достижения в месяцах
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    start = document.getElementById('start'); // Кнопка "рассчитать"
let addData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    depositPercent: 0,
    depositMoney: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    blockBtn: function() {
        if (salaryAmount.value !== '') {
            startId = document.querySelector('#start').removeAttribute('disabled');
        } else {
            startId = document.querySelector('#start').setAttribute('disabled', 'true');
        }
    },

    start: function() {
        addData.budget = +salaryAmount.value;
        addData.getExpenses();
        addData.getIncome();
        addData.getExpensesMonth();
        addData.getIncomeMonth();
        addData.getAddExpenses();
        addData.getAddIncome();
        addData.getBudget();
        addData.showResult();
        //addData.budgetDay = ;
        //console.log(addData.budgetDay);
        //addData.asking();
        //addData.getInfoDeposit();
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                addData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    showResult: function() {
        budgetMonthValue.value = addData.budgetMonth;
        budgetDayValue.value = Math.floor(addData.budgetMonth / 30);
        expensesMonthValue.value = addData.expensesMonth;
        additionalExpensesValue.value = addData.addExpenses.join(', ');
        additionalIncomeValue.value = addData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(addData.getTargetMonth());

        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = addData.budgetMonth * this.value;
        })
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length == 3) {
            addExpensesBtn.style = 'display:none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length == 3) {
            addIncomeBtn.style = 'display:none';
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                addData.addExpenses.push(item);
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('input.income-title').value;
            let cachincome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cachincome !== '') {
                addData.income[itemIncome] = +cachincome;
            }
        })
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                addData.addIncome.push(itemValue);
            }
        })
    },
    getExpensesMonth: function() {
        let expensesSum = 0;
        for (let key in addData.expenses) {
            expensesSum += +addData.expenses[key];
            addData.expensesMonth = expensesSum;
        }
        return expensesSum;
    },
    getIncomeMonth: function() {
        let incomeSum = 0;
        for (let key in addData.income) {
            incomeSum += +addData.income[key];
            addData.incomeMonth = incomeSum;
        }
    },
    getBudget: function() {
        addData.budgetMonth = addData.budget + addData.incomeMonth - addData.expensesMonth;
        //return addData.budgetDay;
    },


    getTargetMonth: function() {
        return targetAmount.value / addData.budgetMonth;
    },

    getInfoDeposit: function() {
        if (addData.deposit) {
            do {
                addData.depositPercent = prompt('Годовой процент?', 10)
            } while (!isNumber(addData.depositPercent));
            do {
                addData.depositMoney = prompt('Сумма депозита?', 20000)
            } while (!isNumber(addData.depositMoney));
        }
    },
    calcSavedMoney: function() {
        return addData.budgetDay * addData.period;
    },
    // calcPeriod: function() {
    //     return addData.budgetMonth * periodSelect.value;
    // },
};
salaryAmount.addEventListener('input', addData.blockBtn);
startId.addEventListener('click', addData.start);
addExpensesBtn.addEventListener('click', addData.addExpensesBlock);
addIncomeBtn.addEventListener('click', addData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
    periodAmount.innerHTML = this.value;
});
// let upPer = function(array) {
//     let arr = [];
//     for (let i = 0; i < array.length; i++) {
//         let str = array[i].trim();
//         arr[i] = str[0].toUpperCase() + str.slice(1);
//         console.log(str[0].toUpperCase());
//     }
//     // console.log(arr.join(', '));
// }
// upPer(addData.addExpenses)
// getStatusIncome: function() {
//         if (addData.budgetDay < 0) {
//             return ('Что то пошло не так');
//         } else if (addData.budgetDay > 0 && addData.budgetDay <= 600) {
//             return ('К сожалению у вас уровень дохода ниже среднего. Дневной бюджет: ' + addData.budgetDay + ' Рублей');
//         } else if (addData.dayBudget > 600 && addData.budgetDay <= 1200) {
//             return ('У вас budgetDay уровень дохода. Дневной бюджет: ' + addData.budgetDay + ' Рублей');
//         } else {
//             return ('У вас высокий уровень дохода. Дневной бюджет: ' + addData.budgetDay + ' Рублей');
//         };
//     },
//asking: function() {
// if(confirm('Есть ли у вас доп. заработок?')){
//     let itemIncome = 0;
//     let cashIncome = 0;
//     do{
//         itemIncome = prompt('какой у вас доп. заработок?', 'такси');
// }while(isNumber(itemIncome) || itemIncome.trim()==='');
//     do{
//         cashIncome = prompt('сколько денег в месяц доход?', 10000)
// }while(!isNumber(cashIncome))
//     addData.income[itemIncome] = cashIncome;
// };
// let cost = 0;
// let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период, через запятую');
// addData.addExpenses = addExpenses.toLowerCase().split(', ');
// addData.deposit = confirm('Есть ли у вас депозит в банке?');
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

//},