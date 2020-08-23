'use strict';
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = localStorage.getItem('todo-s') ? JSON.parse(localStorage.getItem('todo-s')) : [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = ' <span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        const doneBtn = li.querySelector('.todo-complete');
        doneBtn.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });
        const removeBtn = li.querySelector('.todo-remove');
        removeBtn.addEventListener('click', function() {
            let index = todoData.indexOf(item);
            todoData.splice(index, 1);
            localStorage.setItem('todo-s', JSON.stringify(todoData));
            li.remove();
        });
        localStorage.setItem('todo-s', JSON.stringify(todoData));
        const data = JSON.parse(localStorage.getItem('todo-s'))
    });
};

todoControl.addEventListener('submit', function(event) {
    if (headerInput.value !== '') {
        event.preventDefault();
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
        render();
        headerInput.value = '';
    }
});

render();