'use strict';
const isNumber = function(input) {
    return !isNaN(parseFloat(input)) && isFinite(input)
};
let startId = document.querySelector('#start'),
    blockStart = document.querySelector('#start').setAttribute('disabled', 'true'),
    incomeItem = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

const salaryAmount = document.querySelector('.salary-amount'), //месячный доход
    incomeTitle = document.querySelector('.income-title'), // дополнительный доход
    addIncomeBtn = document.getElementsByTagName('button')[0], // доходы кнопка +
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), //возможные доходы ввод * 2
    expensesTitle = document.querySelector('.expenses-title'), //Обязательные расходы наименование
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

class AppData {
    constructor() {
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.depositPercent = 0;
        this.depositMoney = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    };
    blockBtn() {
        if (salaryAmount.value !== ``) {
            startId = document.querySelector(`#start`).removeAttribute(`disabled`);
        } else {
            startId = document.querySelector(`#start`).setAttribute(`disabled`, `true`);
        }
    };


    start() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.getInfoDeposit();
        this.inputBlock()
        this.submitChange()
    };
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                console.log(this);
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    };

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetMonth / 30);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
        incomePeriodValue.value = this.calcPeriod();
    };
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length == 3) {
            addExpensesBtn.style = 'display:none';
        }
    };
    addIncomeBlock() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length == 3) {
            addIncomeBtn.style = 'display:none';
        }
    };
    getPeriodAmount() {
        let periodSelect = document.querySelector('.period-select').value;
        periodAmount = document.querySelector('.title .period-amount');
        periodAmount.textContent = periodSelect;
    };
    getAddExpenses() {
        // const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    };
    getIncome() {
        incomeItem.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });
    };
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        })
    };
    getExpensesMonth() {
        let expensesSum = 0;
        for (let key in this.expenses) {
            expensesSum += +this.expenses[key];
            this.expensesMonth = expensesSum;
        }
        return expensesSum;
    };
    getIncomeMonth() {
        let incomeSum = 0;
        for (let key in this.income) {
            incomeSum += +this.income[key];
            this.incomeMonth = incomeSum;
        }
    };
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    };
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    };
    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.depositPercent = prompt('Годовой процент?', 10)
            } while (!isNumber(this.depositPercent));
            do {
                this.depositMoney = prompt('Сумма депозита?', 20000)
            } while (!isNumber(this.depositMoney));
        }
    };
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    };
    inputBlock() {
        let elems = document.querySelectorAll('input');
        elems.forEach(function(item) {
            item.setAttribute('disabled', 'true');
        });
        addIncomeBtn.setAttribute('disabled', 'true')
        addExpensesBtn.setAttribute('disabled', 'true')
        periodSelect.removeAttribute('disabled');
    };
    submitChange() {
        start.style = 'display:none';
        resetBtn.style = 'display:block'
    };
    resetCancel() {
        let elems = document.querySelectorAll('input');
        for (let i = 0; i < elems.length; i++) {
            elems[i].value = null;
            elems[i].removeAttribute('disabled');
        };
        addIncomeBtn.removeAttribute('disabled');
        addExpensesBtn.removeAttribute('disabled');
        let incomeBlocks = document.querySelectorAll('.income-items');
        for (let i = 0; i < incomeBlocks.length; i++) {
            if (i >= 1) {
                incomeBlocks[i].remove()
            }
        };
        let expensesBlocks = document.querySelectorAll('.expenses-items');
        for (let i = 0; i < expensesBlocks.length; i++) {
            if (i >= 1) {
                expensesBlocks[i].remove()
            }
        }
        periodSelect.value = 1;
        periodAmount.textContent = 1;
        start.style = 'display:block';
        resetBtn.style = 'display:none';
        addExpensesBtn.style = 'display:block';
        addIncomeBtn.style = 'display:block';
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.depositPercent = 0;
        this.depositMoney = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;


    };
    eventListeners() {
        salaryAmount.addEventListener('input', appData.blockBtn);
        startId.addEventListener('click', appData.start.bind(appData));
        addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
        addIncomeBtn.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input', function() {
            periodAmount.innerHTML = this.value;
        });
        resetBtn.addEventListener('click', appData.resetCancel.bind(appData))
    };
}



const appData = new AppData();
appData.eventListeners();