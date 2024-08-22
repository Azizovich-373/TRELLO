export function Task(item) {
    const task_body = document.createElement('div');
    const task_description = document.createElement('p');
    task_body.draggable = 'true'
    task_body.classList.add('task-body')
    task_description.innerHTML = item.description
    task_body.setAttribute('data-id', item.id);
    task_body.append(task_description)
    task_body.ondragstart = () => {
        task_body.id = "selected"
        setTimeout(() => {
            task_body.classList.add('hide')
        }, 0);
    }
    task_body.ondragend = () => {
        task_body.classList.remove('hide')
    }

    return task_body;
}