const baseURL = 'http://localhost:8080'
import { TrueToastify } from "../utils/toastify"
import { WrongToastify } from "../utils/toastify"
import { ApiCall } from "../utils/http.request"
const apiCall = new ApiCall(import.meta.env.VITE_BATH_URL)
const trash = document.querySelector('.trash')
const form_cont = document.querySelector('.task-form-container')
export function Column(item){
    const col = document.createElement('div')
    const task_header = document.createElement('div')
    const task_title = document.createElement('h3')
    const task_options = document.createElement('button')
    const task_card = document.createElement('div')
    const task_footer = document.createElement('div')
    const task_btn = document.createElement('button')

    col.classList.add('col')
    task_header.classList.add('task-header')
    task_title.classList.add('task-title')
    task_options.classList.add('task-options')
    task_card.classList.add('task-card')
    task_card.draggable = 'true'
    task_footer.classList.add('task-footer')
    task_btn.classList.add('task_btn')

    task_title.innerHTML = item.title
    task_options.innerHTML = 'x'
    task_btn.innerHTML = '+ Добавить карточку'
    
    col.append(task_header,task_card,task_footer)
    task_header.append(task_title,task_options)
    task_footer.append(task_btn)
    task_btn.onclick = () => {
        form_cont.classList.add('active')
    }
    task_options.onclick = async () => {
        col.remove()
        const res = await apiCall.deleteData('/columns/' + item.id)
    }
    task_card.ondragover = (event) => {
		event.preventDefault()
	}
	task_card.ondragenter = (event) => {
		event.preventDefault()
	}
	task_card.ondrop = async () => {
		const selectedTask = document.getElementById('selected')
		task_card.append(selectedTask)
        setTimeout(() => {
            trash.style.right = '-1000px';
        }, 1000)
		selectedTask.removeAttribute('id')
        const res = await fetch(`${baseURL}/tasks/${selectedTask.getAttribute('data-id')}`, {
            method: "PATCH",
            body: JSON.stringify({ status: item.status})
        })
        console.log(item.status);
        
        if (res.status === 200) {
            TrueToastify()
        } else {
            WrongToastify()
        }
	}

    return col
}