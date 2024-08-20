const baseURL = 'http://localhost:8080'
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
        const cols = document.querySelectorAll('.task-card');
        let newStatus;

        cols.forEach((column, index) => {
            if (column.contains(task_body)) {
                newStatus = index + 1;
            }
        });

        fetch(`${baseURL}/tasks/${task_body.getAttribute('data-id')}`, {
            method: "PATCH",
            body: JSON.stringify({ status: newStatus })
        })
    }

    return task_body;
}