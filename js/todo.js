import { createValue, displayValue, updateValue, deleteValue } from "./crud.js"

const todoItems = document.getElementById('todo-checkbox'),
    newTodo = document.getElementById('new-todo')

//Display the Todo list
export function showTodoList(){
    
    todoItems.innerHTML = ''

    for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i),
            value = localStorage.getItem(key);

            // console.log(value)
        
        if(key.startsWith('todo')){
            const parsedValue = JSON.parse(value)
            addTodo(key, parsedValue)
        }
    }
}

//Add Todo Item
export function addTodo(key, item){

    const todo = item.value;
    const checked = item.checked;
    
    if(todo !== ''){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.classList.add('checkbox')

        const label = document.createElement('label')
        label.textContent = todo

        const checkId = key
        checkbox.id = checkId
        checkbox.checked = checked

        const editId = `edit-${checkId}`,
            deleteId = `del-${checkId}`;

        const editDiv = document.createElement('div')
        editDiv.innerHTML = `<i class="fa-solid fa-pen"></i>`
        editDiv.id = editId

        const delDiv = document.createElement('div')
        delDiv.innerHTML = `<i class="fa-regular fa-trash-can"></i>`
        delDiv.id = deleteId

        editDiv.addEventListener('click', () => {
            label.contentEditable = true
            label.style.textDecoration = 'underline'
            label.focus()
            // console.log(checkId, label.contentEditable)

            label.addEventListener('keydown', (e) => {
                if(e.key === 'Enter'){
                    e.preventDefault()

                    label.contentEditable = false
                    label.style.textDecoration = 'none'
                    newTodo.focus()

                    checkbox.checked === true 
                        ? label.style.textDecoration = 'line-through' 
                        : label.style.textDecoration = 'none'

                    const value = {checked: checkbox.checked, value: label.textContent.trim()}
                    updateValue(checkId, JSON.stringify(value))
                }
            })
        })

        delDiv.addEventListener('click', () => {
            // console.log(checkId)
            deleteValue(checkId)
            showTodoList()
        })

        checkbox.addEventListener('change', () => {
            const newValue = {value: todo, checked: true},
            serializedValue = JSON.stringify(newValue);

            createValue(checkId, serializedValue)
            markTodoComplete(checkbox)
        })

        label.addEventListener('click', () => {
   
            checkbox.checked = !checkbox.checked
            const newValue = {value: todo, checked: checkbox.checked},
            serializedValue = JSON.stringify(newValue);

            createValue(checkId, serializedValue)
            markTodoComplete(checkbox)
        })

        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(label)
        todoDiv.appendChild(editDiv)
        todoDiv.appendChild(delDiv)

        todoItems.appendChild(todoDiv);

        checkbox.checked === true 
            ? label.style.textDecoration = 'line-through' 
            : label.style.textDecoration = 'none'

        newTodo.value = ''
    }
}

//Cross Out Completed Todo Item
export function markTodoComplete(checkbox) {
    const item = checkbox.parentElement;

    if(checkbox.checked){
        item.classList.add('completed')
    } else {
        item.classList.remove('completed')
    }
}