let addedTasks = [];

let currentElement;

let editing = false;


function initboard() {
    addedTasks = JSON.parse(localStorage.getItem('TASKS'));
    updateHTML();
}

/*generate Task Container HTML*/

function updateHTML() {
    updateTodo();
    updateInProgress();
    updateInReview();
    updateApproved();
    saveChanges();
}

function updateTodo() {
    let tasksToDo = addedTasks.filter(t => t['class'] == 'to-do');
    document.getElementById('to-do').innerHTML = '';
    for (i = 0; i < tasksToDo.length; i++) {
        const task = tasksToDo[i];
        document.getElementById('to-do').innerHTML += taskHTML(task);
        backgroundColors(task);
    }
}

function updateInProgress() {
    let tasksInProgress = addedTasks.filter(t2 => t2['class'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (i = 0; i < tasksInProgress.length; i++) {
        const task = tasksInProgress[i];
        document.getElementById('in-progress').innerHTML += taskHTML(task);
        backgroundColors(task);
    }
}

function updateInReview() {
    let tasksInReview = addedTasks.filter(t3 => t3['class'] == 'in-review');
    document.getElementById('in-review').innerHTML = '';
    for (i = 0; i < tasksInReview.length; i++) {
        const task = tasksInReview[i];
        document.getElementById('in-review').innerHTML += taskHTML(task);
        backgroundColors(task);
    }
}

function updateApproved() {
    let tasksApproved = addedTasks.filter(t4 => t4['class'] == 'approved');
    document.getElementById('approved').innerHTML = '';
    for (i = 0; i < tasksApproved.length; i++) {
        const task = tasksApproved[i];
        document.getElementById('approved').innerHTML += taskHTML(task);
        backgroundColors(task);
    }
}

function taskHTML(task) {
    let i = addedTasks.indexOf(task); // i = task index for function calls
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

function backgroundColors(task) {
    let i = addedTasks.indexOf(task); 
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

function showAddedTask(i) {
    let task = addedTasks[i];
    generateZoomTaskHTML(task, i);
    document.getElementById('zoom-task').classList.remove('scale-0');
    document.getElementById('zoom-task').classList.remove('opacity-0');
    document.getElementById('zoom-task').classList.add('opacity-1');
    document.getElementById('zoom-task').classList.add('z-index-2000');
    document.getElementById('zoom-task').classList.add('scale-1');
    document.getElementById(`added-task-${i}`).classList.remove('scale-0');
    document.getElementById(`added-task-${i}`).classList.add('scale-1-delayed');
}

function generateZoomTaskHTML(task, i) {
    document.getElementById('zoom-task').innerHTML = '';
    document.getElementById('zoom-task').innerHTML = taskZoomHTML(task, i);
}

function closeZoomTask() {
    if(editing == false) {
    document.getElementById('zoom-task').classList.add('scale-0');
    document.getElementById('zoom-task').classList.add('opacity-0');
    document.getElementById('zoom-task').classList.remove('opacity-1');
    document.getElementById('zoom-task').classList.remove('z-index-2000');
    document.getElementById('zoom-task').classList.remove('scale-1');
    document.getElementById(`added-task-${i}`).classList.add('scale-0');
    document.getElementById(`added-task-${i}`).classList.remove('scale-1-delayed');
    }
}

function taskZoomHTML(task, i) {
    return /*html*/ `
        <div id="added-task-${i}" class="added-task-zoom scale-0" style="position: relative">
            <div class="top-zoom">
                <h2 id="h-${i}"><b>${task['title']}</b></h2>
                <div class="delete" onclick="event.stopPropagation(), openDeleteModal(${i})"></div>
            </div>
            <span>Category: ${task['category']}</span>
            <span>Description: ${task['description']}</span>
            <span>Urgency: ${task['urgency']}</span>
            <div class="bottom-zoom">
                <span>${task['due-date']}</span>
                <span>${task['assigned-to']}</span>
            </div>
            <div id="delete-modal-${i}" class="delete-modal scale-0 opacity-0">
            <h3>Delete this task from Board?</h3>
            <div>
                <button id="delete-btn-${i}" class="btn" onclick="event.stopPropagation(), deleteFromBoard(${i}), closeZoomTask(${i})">Delete</button>
                <button id="cancel-btn-${i}" class="btn">Cancel</button>
            </div>
            </div>
            <p style="position: absolute; top: 24px; right: 48px" onclick="event.stopPropagation(), editTask(${i})">Edit</p>
        </div>`;
}

/*delete functionality*/

function openDeleteModal(i) {
    document.getElementById(`delete-modal-${i}`).classList.remove('scale-0');
    document.getElementById(`delete-modal-${i}`).classList.remove('opacity-0');
    document.getElementById(`delete-modal-${i}`).classList.add('scale-1');
    document.getElementById(`delete-modal-${i}`).classList.remove('opacity-1');
    document.getElementById('zoom-task').classList.remove('z-index-2000');
}

function closeDeleteModal(i) {
    document.getElementById(`delete-modal-${i}`).classList.add('scale-0');
    document.getElementById(`delete-modal-${i}`).classList.add('opacity-0');
    document.getElementById(`delete-modal-${i}`).classList.remove('scale-1');
    document.getElementById(`delete-modal-${i}`).classList.remove('opacity-1');
    document.getElementById('zoom-task').classList.add('z-index-2000');
}

function deleteFromBoard(i) {
    let deleted = addedTasks[i];
    deleted['deleted-from'] = deleted['class'];
    deleted['class'] = 'deleted';
    saveChanges();
    closeDeleteModal(i);
    updateHTML();
}

function openTrash() {
    document.getElementById('bin').classList.add('d-none');
    document.getElementById('bin-container').classList.add('task-container');
    document.getElementById('bin-container').classList.add('deleted-bg');
    document.getElementById('bin-container').innerHTML =   /*html*/     ` 
    <div class="trash-top"><p id="h-deleted"><i>TRASH</i></p>
        <p class="clear-btn" onclick="event.stopPropagation(), clearTrash()">Clear</p>
        <p class="clear-btn" onclick="event.stopPropagation(), closeTrash()">Close</p>
    </div>
    <div class="task" id="deleted"></div>`;
    updateDeleted();
}

function closeTrash() {
    document.getElementById('bin-container').classList.remove('task-container');
    document.getElementById('bin-container').classList.remove('deleted-bg');
    document.getElementById('bin-container').innerHTML = '<div class="bin" id="bin"><i>Trash</i></div>';
}

function clearTrash() {
    for(i = 0; i < addedTasks.length; i++) {
        const task = addedTasks[i];
        if(task['class'] == 'deleted') {
            addedTasks.splice(i);
        }
    }
    saveChanges();
    updateHTML();
}

/*edit functionality*/

function editTask(i) { // i = index of element in addedTasks
    editing = true; // to prevent zoom window from closing ba clicking in it
    document.getElementById(`added-task-${i}`).innerHTML = editTaskHTML(i);
}

function editTaskHTML(i) { // i = index of element in addedTasks
    let task = addedTasks[i];
    return /*html*/ `
            <div class="top-zoom">
                <h2 id="h-${i}"><input type="text" id="add-title"></b></h2>
            </div>
            <span>Category:  
                <select id="add-category" value="${task['category']}">
                    <option value="IT">IT</option>
                    <option value="Controling">Controling</option>
                    <option value="Web">Web</option>
                    <option value="Backend">Backend</option>
                </select>
            </span>
            <span style="display: flex; align-items: center">Description: 
                <textarea id="add-description" cols="30" rows="10" placeholder="${task['description']}">
                </textarea>
            </span>
            <span>Urgency:                
                <select id="add-urgency">
                   <option value="High">High</option>
                   <option value="Medium">Medium</option>
                   <option value="Low">Low</option>
               </select>
            </span>
            <div class="bottom-zoom">
                <span><input type="date" id="add-date" value="2022-03-25"></span>
                <span>                    
                    <select id="asign-member">
                        <option value="max musterman">Max Musterman</option>
                    </select></span>
            </div>
            <p style="position: absolute; top: 24px; right: 96px" onclick="cancelEdit()">Cancel</p>
            <p style="position: absolute; top: 24px; right: 48px" onclick="saveEdit(${i})">Save</p>`;
}

function cancelEdit() {
    editing = false;
    closeZoomTask();
}

function saveEdit(i) {
    catchInputs(i);
}

function catchInputs(i) {

    let neuTitle = document.getElementById('add-title').value;
    let neuCategory = document.getElementById('add-category').value;
    let neuDescription = document.getElementById('add-description').value;
    let neuDate = document.getElementById('add-date').value;
    let urgency = document.getElementById('add-urgency').value;
    let toMember = document.getElementById('asign-member').value;

    saveChangesToTask(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember, i);

}


function saveChangesToTask(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember, i) {

    let task = addedTasks[i];
    task['title'] = neuTitle;
    task['category'] = neuCategory;
    task['description'] = neuDescription;
    task['due-date'] = neuDate;
    task['urgency'] = urgency;
    task['assigned-to'] = toMember;
    saveChanges();
    updateHTML();
    editing = false;
    closeZoomTask();
}

/*drag function*/

function startDragging(id) {
    currentElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(category) {
    currentElement--; // reduce currentElement by 1 increment to match addedTasks index
    addedTasks[currentElement]['class'] = category;
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

function saveChanges() {
    // let tasksAsString = JSON.stringify(addedTasks);
    localStorage.setItem('TASKS', JSON.stringify(addedTasks));
}
