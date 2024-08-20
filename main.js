import { Task } from "./components/Task"
import { reload } from "./utils/helpres"
const baseURL = 'http://localhost:8080'
const cols = document.querySelectorAll('.task-card')
const btns = document.querySelectorAll('.task_btn')
const form_cont = document.querySelector('.task-form-container')
const exit = document.querySelector('.exit')
const form = document.forms.namedItem('task-form')

form.onsubmit = (e) => {
    
    let task = {
        description: new FormData(form).get('description'),
        status: new FormData(form).get('status'), 
    }
    fetch(baseURL+'/tasks', {
        method: "POST",
        body: JSON.stringify(task)
    })
    .then(res => console.log(res))
    
    form_cont.classList.remove('active')
}
fetch(baseURL+'/tasks')
    .then(res => res.json())
    .then(res => reload(res, Task, cols))

btns.forEach(item => {
    item.onclick = () => {
        form_cont.classList.add('active')
    }
})
exit.onclick = () => {
    form_cont.classList.remove('active')
}
cols.forEach(col => {
    
	col.ondragover = (event) => {
		event.preventDefault()
	}
	col.ondragenter = (event) => {
		event.preventDefault()
	}
	col.ondrop = () => {
		const selectedTask = document.getElementById('selected')
        
		col.append(selectedTask)
		selectedTask.removeAttribute('id')
	}
})