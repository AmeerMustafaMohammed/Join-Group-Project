let tasks = [];
let currentElement;


function init() {
    tasks = loadJSON('TASKS');
    updateHTML();
}

/*generate Task Container HTML*/

function updateHTML() {
    updateTodo();
    updateInProgress();
    updateInReview();
    updateApproved();
    saveTasksToLocal('TASKS', tasks);
}

function updateTodo() {
    let tasksToDo = tasks.filter(t => t['class'] == 'to-do');
    document.getElementById('to-do').innerHTML = '';
    for (i = 0; i < tasksToDo.length; i++) {
        const task = tasksToDo[i];
        document.getElementById('to-do').innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
    }
}

function updateInProgress() {
    let tasksInProgress = tasks.filter(t => t['class'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (i = 0; i < tasksInProgress.length; i++) {
        const task = tasksInProgress[i];
        document.getElementById('in-progress').innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
    }
}

function updateInReview() {
    let tasksInReview = tasks.filter(t => t['class'] == 'in-review');
    document.getElementById('in-review').innerHTML = '';
    for (i = 0; i < tasksInReview.length; i++) {
        const task = tasksInReview[i];
        document.getElementById('in-review').innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
    }
}

function updateApproved() {
    let tasksApproved = tasks.filter(t => t['class'] == 'approved');
    document.getElementById('approved').innerHTML = '';
    for (i = 0; i < tasksApproved.length; i++) {
        const task = tasksApproved[i];
        document.getElementById('approved').innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
    }
}

function taskHTML (task, i) {
    return /*html*/ `
    <div onclick="showAddedTask(${i})" class="added-task" draggable="true" ondragstart="startDragging(${task['id']})">
            <div class="top-added">
                <span id="h-${i}" class="h-added">${task['title']}</span>
                <span class="date-added">${task['due-date']}</span>
                <span class="assigned-added">${task['assigned-to']}</span>
            </div>
        </div>`;
}

/*change headline bg-colors according to urgency*/

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

/*show Details of clicked Task*/

function  showAddedTask(i) {
    let task = tasks[i];
    generateZoomTaskHTML(task);
    document.getElementById('zoom-task').classList.remove('scale-0');
    document.getElementById('zoom-task').classList.remove('opacity-0');
    document.getElementById('zoom-task').classList.add('opacity-1');
    document.getElementById('zoom-task').classList.add('z-index-2000');
    document.getElementById('zoom-task').classList.add('scale-1');
}

function taskZoomHTML(task) {
    return /*html*/ `
        <div class="added-task-zoom">
            <div class="top-zoom">
                <h2 id="h-${i}"><b>${task['title']}</b></h2>
            </div>
            <span>Category: ${task['category']}</span>
            <span>Description: ${task['description']}</span>
            <span>Urgency: ${task['urgency']}</span>
            <div class="bottom-zoom">
                <span>${task['due-date']}</span>
                <span>${task['assigned-to']}</span>
            </div>
        </div>`;
}

function generateZoomTaskHTML(task) {
    document.getElementById('zoom-task').innerHTML = '';
    document.getElementById('zoom-task').innerHTML = taskZoomHTML(task);
}

function backToNormal() {
    document.getElementById('zoom-task').classList.add('scale-0');
    document.getElementById('zoom-task').classList.add('opacity-0');
    document.getElementById('zoom-task').classList.remove('opacity-1');
    document.getElementById('zoom-task').classList.remove('z-index-2000');
    document.getElementById('zoom-task').classList.remove('scale-1');
}

/*drag function*/

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

/*access storage*/

function loadJSON(key) {
    let JSONAsString = localStorage.getItem(key)
    if (JSONAsString) {
        JSON = JSON.parse(JSONAsString);
        return JSON;
    }
}

function saveTasksToLocal(key, tasks) {
    // let tasksAsString = JSON.stringify(array);
    localStorage.setItem(key, JSON.stringify(tasks))
}
