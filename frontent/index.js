import { reload } from "./lib/utils.js";
import { task } from "./components/Tasks.js";
const main = document.querySelector('.place')
const form = document.forms.namedItem('add_new')
const base = 'http://localhost:8080'
form.onsubmit = (e) => {
    
    let task = {
        id: crypto.randomUUID(),
        name: new FormData(form).get('name'),
        complited: false,
    }
    fetch(base+'/todos', {
        method: "POST",
        body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(res => reload(res, main, task))
}

fetch(base+'/todos')
    .then(res => res.json())
    .then(res => reload(res, main, task))