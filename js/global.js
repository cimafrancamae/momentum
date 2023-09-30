const top = document.getElementById('top'),
    bottom = document.getElementById('bottom');

const getName = document.getElementById('get-name'),
    userName = document.getElementById('user-name'),
    submitName = document.getElementById('submit-name');

const date = document.getElementById('date'), 
    time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    displayName = document.getElementById('name-display');

const focusDiv = document.getElementById('focus-div'),
    focusInput = document.getElementById('focus-input'),
    focusToday = document.getElementById('focus-today'),
    focus = document.getElementById('focus');

const todo = document.getElementById('todo'),
    todoList = document.getElementById('todo-list'),
    exitTodoList = document.getElementById('exit-todo'),
    newTodo = document.getElementById('new-todo'),
    todoItems = document.getElementById('todo-checkbox'),
    clearComplete = document.getElementById('clear-complete'),
    clearAll = document.getElementById('clear-all');

const mainQuote = document.getElementById('quote'),
    quotes = document.getElementById('quotes');

const bgDay = ['day1.png', 'day2.png', 'day3.png'],
    bgNoon = ['noon1.png', 'noon2.png', 'noon3.png'],
    bgNight = ['night1.png', 'night2.png', 'night3.png'];

let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes();