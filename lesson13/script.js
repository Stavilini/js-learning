'use strict';
let isNumber = function(input) {
    return !isNaN(parseFloat(input)) && isFinite(input)
};
let startId = document.querySelector('#start'),
    blockStart = document.querySelector('#start').setAttribute('disabled', 'true');
let salaryAmount = document.querySelector('.salary-amount'), //месячный доход
    incomeTitle = document.querySelector('.income-title'), // дополнительный доход
    incomeItem = document.querySelectorAll('.income-items'),
    //incomeItems = document.querySelectorAll('.income-items'),
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
    periodAmount = document.querySelector('.period-amount'),
    start = document.getElementById('start'), // Кнопка "рассчитать"
    resetBtn = document.querySelector('#cancel');
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
        addData.inputBlock()
        addData.submitChange()
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                addData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetMonth / 30);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = addData.calcPeriod();
        });
        incomePeriodValue.value = addData.calcPeriod();
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
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length == 3) {
            addIncomeBtn.style = 'display:none';
        }
    },
    getPeriodAmount: function() {
        let periodSelect = document.querySelector('.period-select').value;
        let periodAmount = document.querySelector('.period-amount');
        this.textContent = periodSelect;
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
        incomeItem.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                addData.income[itemIncome] = +cashIncome;
            }
        });
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
        for (let key in this.expenses) {
            expensesSum += +this.expenses[key];
            this.expensesMonth = expensesSum;
        }
        return expensesSum;
    },
    getIncomeMonth: function() {
        let incomeSum = 0;
        for (let key in this.income) {
            incomeSum += +this.income[key];
            this.incomeMonth = incomeSum;
        }
    },
    getBudget: function() {

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        //return addData.budgetDay;
    },
    getTargetMonth: function() {
        return targetAmount.value / this.budgetMonth;
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
    // calcSavedMoney: function() {
    //     return addData.budgetMonth * addData.period.value;
    // },
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    },
    inputBlock: function() {
        let elems = document.querySelectorAll('input');
        elems.forEach(function(item) {
            item.setAttribute('disabled', 'true');
        });

    },
    submitChange: function() {
        // let startBtn = document.querySelector('#start');
        start.style = 'display:none';
        resetBtn.style = 'display:block'
    },
    resetCancel: function() {
        let elems = document.querySelectorAll('input');
        for (let i = 0; i < elems.length; i++) {
            elems[i].value = null;
            elems[i].removeAttribute('disabled');
        }
        periodSelect.value = 1;
        start.style = 'display:block';
        resetBtn.style = 'display:none';
    }
};
salaryAmount.addEventListener('input', addData.blockBtn);
startId.addEventListener('click', addData.start);
addExpensesBtn.addEventListener('click', addData.addExpensesBlock);
addIncomeBtn.addEventListener('click', addData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
    periodAmount.innerHTML = this.value;
});
resetBtn.addEventListener('click', addData.resetCancel)