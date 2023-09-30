export function createValue(key, value){
    localStorage.setItem(key, value)
}

export function displayValue(key){
    return localStorage.getItem(key)
}

export function updateValue(key, value){
    const item = localStorage.getItem(key)

    if(item !== value){
        localStorage.setItem(key, value)
    }
}

export function deleteValue(key){
    localStorage.removeItem(key)
}