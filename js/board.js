let tasks = [];


function init() {
    tasks = loadJSON('TASKS')
    updateHTML();

}

function updateHTML() {
    updateTodo();
    updateInProgress();
    updateInReview();
    updateApproved();
}

function updateTodo() {
    let toDo = document.getElementById('to-do');
    toDo.innerHTML = '';
    for (i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task['class'] == 'to-do') {
            toDo.innerHTML += taskHTML(task, i);
            backgroundColors(task, i);
        }
    }
}

function updateInProgress() {
    let inProgress = document.getElementById('in-progress');
    inProgress.innerHTML = '';
    for (i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task['class'] == 'in-progress') {
            inProgress.innerHTML += taskHTML(task, i);
            backgroundColors(task, i);
        }
    }
}

function updateInReview() {
    let inReview = document.getElementById('in-review');
    inReview.innerHTML = '';
    for (i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task['class'] == 'in-review') {
            inReview.innerHTML += taskHTML(task, i);
            backgroundColors(task, i);
        }
    }
}

function updateApproved() {
    let approved = document.getElementById('approved');
    approved.innerHTML = '';
    for (i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task['class'] == 'approved') {
            approved.innerHTML += taskHTML(task, i);
            backgroundColors(task, i);
        }
    }
}

function backgroundColors(task, i) {
    let h = document.getElementById(`h-${i}`);

    if (task['urgency'] == 'High') {
        h.classList.add('high-urgency');
    }

    if (task['urgency'] == 'Medium') {
        h.classList.add('medium-urgency');
    }

    if (task['urgency'] == 'Low') {
        h.classList.add('low-urgency');
    }
}

function taskHTML(task, i) {
    return /*html*/ `
        <div class="added-task" draggable="true" ondragstart="startDragging(${task['id']})">
            <div class="top-added">
                <span id="h-${i}" class="h-added">${task['title']}</span>
                <span class="category-added">${task['category']}</span>
            </div>
            <span class="description-added">${task['description']}</span>
            <div>
                <span class="date-added">${task['due-date']}</span>
                <span class="assigned-added">${task['assigned-to']}</span>
            </div>
        </div>`;
}

/*drag function*/

let currentElement;

function startDragging(id) {
    currentElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(category) {
    tasks[currentElement]['class'] = category;
    updateHTML();
}


function loadJSON(key) {
    let JSONAsString = localStorage.getItem(key)
    if (JSONAsString) {
        JSON = JSON.parse(JSONAsString);
        return JSON;
    }

}