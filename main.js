import { Task } from "./components/Task"
import { reload } from "./utils/helpres"
import { TrueToastify, WrongToastify } from "./utils/toastify"
const baseURL = 'http://localhost:8080'
const cols = document.querySelectorAll('.task-card')
const btns = document.querySelectorAll('.task_btn')
const btn = document.querySelector('.create_new')
const form_cont = document.querySelector('.task-form-container')
const trash = document.querySelector('.trash')
const trash_cont = document.querySelector('.trash_cont')
const video = document.querySelector('.video_trash')
const audio = document.querySelector('.audio_trash')
const success = document.querySelector('.success')
const exit = document.querySelector('.exit')
const form = document.forms.namedItem('task-form')

trash_cont.ondragover = (e) => {
    e.preventDefault()
}
trash_cont.ondragleave = (e) => {
    e.preventDefault()
    setTimeout(() => {
        if (!isInsideTrash) {
            trash.style.right = '-1000px';
        }
    }, 1000);
}
trash_cont.ondragenter = (e) => {
    e.preventDefault()
    trash.style.right = '10px'
}
trash.ondragover = (e) => {
    e.preventDefault()
}
trash.ondragenter = (e) => {
    e.preventDefault()
}
trash.ondragleave = (e) => {
    e.preventDefault()
    video.pause();
    video.currentTime = 0
    audio.pause()
    audio.currentTime = 0
}
trash.ondrop = async (e) => {
    e.preventDefault()
    const selectedTask = document.getElementById('selected')
    const data_id = selectedTask.getAttribute('data-id')
    selectedTask.remove()  
    video.play()
    video.currentTime = 0
    audio.play()
    audio.currentTime = 0
    const res = await fetch(baseURL + '/tasks/' + data_id ,{method: "DELETE"})
    console.log(res.status);
    
    if(res.status === 200){
        TrueToastify()
        setTimeout(() => {
            trash.style.transition = 'right 0.5s ease'; // Плавный переход
            trash.style.right = '-1000px';
        }, 1000)
    } else {
        WrongToastify()
        setTimeout(() => {
            trash.style.transition = 'right 0.5s ease'; // Плавный переход
            trash.style.right = '-1000px';
        }, 1000)
    }
}
form.onsubmit = async (e) => {
    e.preventDefault()
    let task = {
        description: new FormData(form).get('description'),
        status: new FormData(form).get('status'), 
    }
    const res = await fetch(baseURL+'/tasks', {
        method: "POST",
        body: JSON.stringify(task)
    })
    if (res.status === 201) {
        TrueToastify()
    } else {
        WrongToastify()
    }
    form_cont.classList.remove('active')
    success.play()
    success.currentTime = 0
    fetch(baseURL+'/tasks')
        .then(res => res.json())
        .then(res => reload(res, Task, cols))
}
fetch(baseURL+'/tasks')
    .then(res => res.json())
    .then(res => reload(res, Task, cols))


btn.onclick = () => {
    form_cont.classList.add('active')
}
btns.forEach(item => {
    item.onclick = () => {
        form_cont.classList.add('active')
    }
})
exit.onclick = () => {
    form_cont.classList.remove('active')
}
cols.forEach((col, idx) => {
    
	col.ondragover = (event) => {
		event.preventDefault()
	}
	col.ondragenter = (event) => {
		event.preventDefault()
	}
	col.ondrop = async () => {
		const selectedTask = document.getElementById('selected')
		col.append(selectedTask)
        success.play()
        success.currentTime = 0
		selectedTask.removeAttribute('id')


        const res = await fetch(`${baseURL}/tasks/${selectedTask.getAttribute('data-id')}`, {
            method: "PATCH",
            body: JSON.stringify({ status: (idx + 1)})
        })
        if (res.status === 200) {
            TrueToastify()
        } else {
            WrongToastify()
        }
	}
})