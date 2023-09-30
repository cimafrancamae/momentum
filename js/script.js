import { fetchWeatherData } from "./api.js"
import { createValue, displayValue, updateValue, deleteValue } from "./crud.js"
import { showAllQuotes, getMainQuote } from "./quotes.js"
import { showTodoList, addTodo, markTodoComplete } from "./todo.js"

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
    quotes = document.getElementById('quotes'),
    newQuote = document.getElementById('new-quote'),
    addQuote = document.getElementById('add-quote'),
    quotesList = document.getElementById('quotes-list'),
    quotesContainer = document.getElementById('quotes-container');

let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes();

const bgDay = ['day1.gif', 'day2.gif', 'day3.gif'],
    bgNoon = ['noon1.gif', 'noon2.gif', 'noon3.gif'],
    bgNight = ['night1.gif', 'night2.gif', 'night3.gif'];


    //12-hour Format
    hour = hour % 12 || 12;


//Show current Date
function getDate(){
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'},
        formattedDate = today.toLocaleDateString('en-US', options)

    date.textContent = formattedDate
}

//Show current time
function getTime() {
    const newMin = (parseInt(min, 10) < 10 ? '0' : '') + min

    time.innerHTML = `${hour}:${newMin}`
}
    

//Get User's Name
userName.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        createValue('name',userName.value)
        createValue('get-name', true)
        showName();
    }
})

submitName.addEventListener('click', () => {
    showName();
})

//Show user's name
function showName(){
    displayName.textContent = localStorage.getItem('name');
    displayName.style.textTransform = 'capitalize'
    getName.style.display = 'none'
    top.style.display = 'flex'
    bottom.style.display = 'flex'

    focusInput.focus()
}

//Show greeting
function showGreeting(){

    let today = new Date(),
    hour = today.getHours();

    if(hour < 12){
        greeting.textContent = 'Good Morning,'
        document.body.style.backgroundImage = getRandomBg(bgDay)
        quotesContainer.classList.toggle('light')
        todoItems.classList.toggle('light')
       
    } else if( hour < 18) {
        greeting.textContent = 'Good Afternoon,'
        document.body.style.backgroundImage = getRandomBg(bgNoon)
        quotesContainer.classList.toggle('light')
        todoItems.classList.toggle('light')
        
    } else {
        greeting.textContent = 'Good evening,'
        document.body.style.backgroundImage = getRandomBg(bgNight)
        quotesContainer.classList.toggle('dark')
        todoItems.classList.toggle('dark')
    }

}

//Get Focus Text
focusInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        focus.textContent = focusInput.value
        focusToday.style.display = 'flex'
        focusDiv.style.display = 'none'

        // localStorage.setItem('focus', focusInput.value)
        createValue('focus', focusInput.value)
    }
})

//Display a random background
function getRandomBg(bg) {
    const randomBg = Math.floor(Math.random() * bg.length)
    const path = `url(../assets/${bg[randomBg]})`
    console.log(path)
    return path
}

//Show Todo Panel
todo.addEventListener('click', () => {
    todoList.classList.toggle('active');
    showTodoList()

    newTodo.focus();
})

//Close Todo Panel
exitTodoList.addEventListener('click', () => {
    todoList.classList.remove('active')
})


//Call Add Todo Item
newTodo.addEventListener('keydown', (e) => {
    
    if(e.key === 'Enter'){
        // console.log(e.key)
        e.preventDefault();

        const todo = newTodo.value.trim();
        const value = {value: todo, checked: false}
        const checkId = `todo-${Date.now()}`

        const serializedValue = JSON.stringify(value),
        parsedValue = JSON.parse(serializedValue);

        createValue(checkId, serializedValue)

        addTodo(checkId, parsedValue);
    }
})

//Clear completed Todo items
clearComplete.addEventListener('click', () => {
    const completeItems = document.querySelectorAll('.checkbox:checked')
    completeItems.forEach((checkbox) => {
        const item = checkbox.parentElement
        item.remove()
        deleteValue(checkbox.id)
    })
    newTodo.focus()
})

//Clear all Todo items
clearAll.addEventListener('click', () => {
    const allItems = document.querySelectorAll('.checkbox')
    allItems.forEach((checkbox) => {
        const item = checkbox.parentElement
        item.remove()
        deleteValue(checkbox.id)
    })
    newTodo.focus()
})

//Open Quotes Panel
addQuote.addEventListener('click', () => {
    quotes.classList.toggle('active');
    showAllQuotes()
    newQuote.focus()
})

//Add Quote
newQuote.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){

        const liId = `li-${Date.now()}`,
            value = newQuote.value.trim();

        createValue(liId, value)
        showAllQuotes()
        newQuote.value = ''
    }
})

//Hide Panels
function hideOnClickOutside(event) {

    if (!todoList.contains(event.target) && !todo.contains(event.target)) {
        todoList.classList.add('hidden')
        todoList.classList.remove('active')
    }
    if (!quotes.contains(event.target) && !addQuote.contains(event.target)) {
        quotes.classList.add('hidden')
        quotes.classList.remove('active')
    }
}

quotes.addEventListener('click', (e) => {
    e.stopPropagation()
})

todoList.addEventListener('click', (e) => {
    e.stopPropagation()
})

document.addEventListener('click', hideOnClickOutside);

document.addEventListener('DOMContentLoaded', () => {

    const getNameDisplay = localStorage.getItem('get-name')

    if(getNameDisplay){
        getName.style.display = 'none'
        focusDiv.style.display = 'none'

        focusToday.style.display = 'flex'
        top.style.display = 'flex'
        bottom.style.display = 'flex'
        
        displayName.textContent = localStorage.getItem('name')
        displayName.style.textTransform = 'capitalize'
        focus.textContent = localStorage.getItem('focus')
    } else {
        localStorage.clear()
    }
})

userName.focus()
getDate()
getTime()
showGreeting()
getMainQuote()
// fetchWeatherData()

window.addEventListener('load', fetchWeatherData);

setInterval(getDate, 6000)
setInterval(getTime, 6000)