import { Column } from "./components/Column"
import { Task } from "./components/Task"
import { reload } from "./utils/helpres"
import { ApiCall } from "./utils/http.request"
const apiCall = new ApiCall(import.meta.env.VITE_BATH_URL)
const btn = document.querySelector('.create_new')
const form_cont = document.querySelector('.task-form-container')
const col_cont = document.querySelector('.col-form-container')
const trash = document.querySelector('.trash')
const video = document.querySelector('.video_trash')
const audio = document.querySelector('.audio_trash')
const success = document.querySelector('.success')
const exit = document.querySelector('.exit')
const col_exit = document.querySelector('#col_exit')
const place_col = document.querySelector('.cols_place')
const new_col = document.querySelector('.col_btn')
const form = document.forms.namedItem('task-form')
const form_col = document.forms.namedItem('col-form')

trash.ondragover = (e) => {
    e.preventDefault()
}
trash.ondragenter = (e) => {
    e.preventDefault()
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
    const res = await apiCall.deleteData('/tasks/' + data_id)
    
    if(res.status === 200){
        setTimeout(() => {
            trash.style.right = '-1000px';
        }, 1000)
    } else {
        setTimeout(() => {
            trash.style.right = '-1000px';
        }, 1000)
    }
}
let currentStatus = localStorage.getItem('currentStatus') 
    ? parseInt(localStorage.getItem('currentStatus')) 
    : 1;
form_col.onsubmit = async (e) => {
    e.preventDefault()
    let col = {
        title: new FormData(form_col).get('title'),
        status: currentStatus.toString(), 
    }

    await apiCall.postData('/columns', col)
    form_cont.classList.remove('active')
    success.play()
    success.currentTime = 0
    currentStatus++;
    localStorage.setItem('currentStatus', currentStatus);

    const columns = await apiCall.getData('/columns')
    reload(columns, Column, [place_col], false)
}
const columns = await apiCall.getData('/columns')
reload(columns, Column, [place_col], false)
form.onsubmit = async (e) => {
    e.preventDefault()
    let task = {
        description: new FormData(form).get('description'),
        status: new FormData(form).get('status'), 
    }
    await apiCall.postData('/tasks', task)
    form_cont.classList.remove('active')
    success.play()
    success.currentTime = 0
    const tasks = await apiCall.getData('/tasks')
    reload(tasks, Task, cols)
}

const cols = document.querySelectorAll('.task-card')
const tasks = await apiCall.getData('/tasks')
reload(tasks, Task, cols)
btn.onclick = () => {
    form_cont.classList.add('active')
}
new_col.onclick = () => {
    col_cont.classList.add('active')
}
exit.onclick = () => {
    form_cont.classList.remove('active')
}
col_exit.onclick = () => {
    col_cont.classList.remove('active')
}
