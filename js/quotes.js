import { getQuote } from "./api.js";
import { createValue, displayValue, updateValue, deleteValue } from "./crud.js"

const quotesList = document.getElementById('quotes-list'),
    mainQuote = document.getElementById('quote'),
    newQuote = document.getElementById('new-quote');

let localQuotes = []

//Show the main quote
export function getMainQuote(){

    const items = localStorage.getItem('local-quotes')
    const quotes = JSON.parse(items)

    if(items && localQuotes.length > 0){
        console.log('you are here', items, items.length, localQuotes.length)
        const randomIndex = Math.floor(Math.random() * quotes.length)
        mainQuote.textContent = quotes[randomIndex].value;
    } else {
        getQuote()
    }
}

//Display all quotes 
export function showAllQuotes(){
    quotesList.innerHTML = ''

    // console.log('Local Storage Length: ', localStorage.length)

    for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i),
            value = localStorage.getItem(key);

        if(key.startsWith('li')){
            
            const findQuote = localQuotes.find((q) => {
                return q.key === key
            })

            if(!findQuote){
                localQuotes.push({key, value})
            }

            createLi(key, value)
        }
    }

    localStorage.setItem('local-quotes', JSON.stringify(localQuotes))
}

function createLi(key, value){
    const li = document.createElement('li')
    li.textContent = value

    const useId = `use-${Date.now()}`,
         deleteId = `del-${Date.now()}`;

    const useBtn = document.createElement('div'),
        deleteBtn = document.createElement('div');

    useBtn.innerHTML = '<i class="fa-solid fa-thumbtack" style="color: #db4848;"></i>'
    useBtn.id = useId
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    deleteBtn.id = deleteId

    useBtn.addEventListener('click', () => {
        const parentLi = useBtn.parentElement,
             liText = parentLi.textContent,
            liQuote = liText;

        mainQuote.textContent = liQuote
    })

    deleteBtn.addEventListener('click', () => {


        const parentLi = deleteBtn.parentElement,
            liQuote = parentLi.textContent;

            
        const newLocalQuotes = localQuotes.filter((q) => q.key !== key)
        localQuotes = newLocalQuotes
            
        console.log(newLocalQuotes)
        
        parentLi.remove()
        createValue('local-quotes', JSON.stringify(newLocalQuotes))
        deleteValue(key)

        if(mainQuote.textContent === liQuote){
            console.log('here')
            getMainQuote()
        }
    })

    li.appendChild(useBtn)
    li.appendChild(deleteBtn)
    quotesList.appendChild(li)

}