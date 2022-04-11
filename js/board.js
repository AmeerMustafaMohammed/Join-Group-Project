setURL('http://gruppe-208.developerakademie.net/smallest_backend_ever');

let addedTasks = [];

let currentElement;

let editing = false;


async function initboard() {
    await downloadFromServer();
    addedTasks = JSON.parse(localStorage.getItem('TASKS'));
    updateHTML();
}

/**
 * This function is used to update the HTML of all Cards
 * 
 */

function updateHTML() {
    updateTodo();
    updateInProgress();
    updateInReview();
    updateApproved();
    checkforEmpty();
    saveChanges();
}

function checkforEmpty() {
    let toDo = document.getElementById('to-do');
    if(toDo.innerHTML == '') {
        addPlus();
    }
}

function addPlus() {
    document.getElementById('to-do').innerHTML = /*html*/ `
        <div class="default-content">
        <a href="#" onclick="window.location.href = 'addTasks.html'" title="add a task"><img src="/img/board-img/plus.png"></a>
        </div>`;
}

/**
 * The following 4 functions filter through addedTasks 
 * checking the value at the key 'class'
 * and render HTML into the related Card
 * 
 */

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

/**
 * This function returns the HTML of the added Tasks
 * 
 * @param {JSON} task - This is an object containing details about the task
 * 
 */

function taskHTML(task) {
    let i = addedTasks.indexOf(task);
    return /*html*/ `
    <div onclick="showAddedTask(${i})" class="added-task" draggable="true" ondragstart="startDragging(${task['id']})">
            <div class="top-added">
                <span id="h-${i}" class="h-added">${task['title']}</span>
                <span class="date-added">${task['due-date']}</span>
                <span class="assigned-added">${task['assigned-to']}</span>
            </div>
        </div>`;
}

/**
 * This function changes the background color  
 * of the headline of a task 
 * according to its urgency
 * 
 * @param {JSON} task - This is an object containing details about the task
 */

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

/**
 * This function opens a more detailed view of the clicked task
 * 
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 *                      
 */

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

/**
 * This function generates the HTML of the div
 * that displays the detailed view of the clicked task
 * 
 * @param {JSON} task - This is an object containing details about the task
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

function generateZoomTaskHTML(task, i) {
    document.getElementById('zoom-task').innerHTML = '';
    document.getElementById('zoom-task').innerHTML = taskZoomHTML(task, i);
}

/**
 * This function returns the HTML of the div
 * that displays the detailed view of the clicked task
 * 
 * @param {JSON} task - This is an object containing details about the task
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

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
                <button id="delete-btn-${i}" class="btn" onclick="event.stopPropagation(), deleteFromBoard(${i}), closeZoomTask()">Delete</button>
                <button id="cancel-btn-${i}" class="btn">Cancel</button>
            </div>
            </div>
            <p style="position: absolute; top: 24px; right: 70px; cursor: pointer" onclick="event.stopPropagation(), editTask(${i})">Edit</p>
        </div>`;
}

function closeZoomTask() {
    //the if statement prevents the zoomed Task from closing
    //when clicking in the edit view
    if (editing == false) {
        document.getElementById('zoom-task').classList.add('scale-0');
        document.getElementById('zoom-task').classList.add('opacity-0');
        document.getElementById('zoom-task').classList.remove('opacity-1');
        document.getElementById('zoom-task').classList.remove('z-index-2000');
        document.getElementById('zoom-task').classList.remove('scale-1');
    }
}

/*delete functionality*/

/**
 * The following 2 functions open and close the delete modal
 * 
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

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

/**
 * This function changes the values of the keys
 * 'deleted-from' and 'class' of the task at addedTasks[i]
 * and updates the HTML of the cards 
 * 
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

function deleteFromBoard(i) {
    let deleted = addedTasks[i];
    deleted['deleted-from'] = deleted['class'];
    deleted['class'] = 'deleted';
    saveChanges();
    closeDeleteModal(i);
    updateHTML();
}

/* edit functionality */

/**
 * This function changes the HTML of the clicked task 
 * to enable editing
 * 
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

function editTask(i) {
    editing = true; // to prevent zoom window from closing by clicking in it
    document.getElementById(`added-task-${i}`).innerHTML = editTaskHTML(i);
    setCategory(i);
    setUrgency(i);
    // setUser(i);
}

/**
 * This function returns the HTML that enables editing
 * 
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

function editTaskHTML(i) {
    let task = addedTasks[i];
    return /*html*/ `
            <div class="top-zoom">
                <h2 id="h-${i}"><input type="text" id="add-title" value="${task['title']}"></b></h2>
            </div>
            <span>Category:  
                <select id="add-category" class="select-dropdown">
                    <option class="category-options" value="IT">IT</option>
                    <option class="category-options" value="Controling">Controling</option>
                    <option class="category-options" value="Web">Web</option>
                    <option class="category-options" value="Backend">Backend</option>
                </select>
            </span>
            <span style="display: flex; align-items: center">Description: 
                <textarea id="add-description" cols="30" rows="10">${task['description']}</textarea>
            </span>
            <span>Urgency:                
                <select id="add-urgency" class="select-dropdown">
                   <option class="urgency-options" value="High">High</option>
                   <option class="urgency-options" value="Medium">Medium</option>
                   <option class="urgency-options" value="Low">Low</option>
               </select>
            </span>
            <div class="bottom-zoom">
                <span><input type="date" id="add-date" value="2022-03-25"></span>
                <span>                    
                    <select id="asign-member"  class="select-dropdown">
                    </select></span>
            </div>
            <p style="position: absolute; top: 24px; right: 96px; cursor: pointer" onclick="cancelEdit(${i})">Cancel</p>
            <p style="position: absolute; top: 24px; right: 48px; cursor: pointer" onclick="saveEdit(${i})">Save</p>`;
}

/**
 * This function checks all option elements 
 * with a class of .category-options
 * for their values
 * and sets the value that is equal to 
 * the current task at the key 'category' as selected
 * 
 * 
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

function setCategory(i) {
    let task = addedTasks[i];
    let options = document.querySelectorAll('.category-options');
    options.forEach(option => { if (option.value == task['category']) { option.selected = true } });
}

/**
 * This function checks all option elements 
 * with a class of .urgency-options
 * for their values
 * and sets the value that is equal to 
 * the current task at the key 'urgency' as selected
 * 
 * 
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

function setUrgency(i) {
    let task = addedTasks[i];
    let urgencyOptions = document.querySelectorAll('.urgency-options');
    urgencyOptions.forEach(urgencyOption => { if (urgencyOption.value == task['urgency']) { urgencyOption.selected = true } });
}

// function setUser(i) {
//     let allUsers = loadJSON('allUser');
//     let selectUser = document.getElementById('asign-member');
//     let task = addedTasks[i];
//     allUsers.forEach(user => {
//         selectUser.innerHTML += /*html*/ `
//             <option class="user-options" value="${user['name']}">${user['name']}</option>`;
//     });
//     let userOptions = document.querySelectorAll('.user-options');
//     userOptions.forEach(userOption => {if(userOption.value == task['assigned-to']){userOption.selected = true}});
// }

function cancelEdit(i) {
    editing = false;
    closeZoomTask(i);
}

function saveEdit(i) {
    catchInputs(i);
}

/**
 * This function reads the values of all inputs
 * of the edit task view
 * 
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

function catchInputs(i) {
    let neuTitle = document.getElementById('add-title').value;
    let neuCategory = document.getElementById('add-category').value;
    let neuDescription = document.getElementById('add-description').value;
    let neuDate = document.getElementById('add-date').value;
    let urgency = document.getElementById('add-urgency').value;
    let toMember = document.getElementById('asign-member').value;
    saveChangesToTask(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember, i);
}

/**
 * This function saves the changes that were made in the edit view
 * by changing the value of the corresponding key of a task
 * and updates the cards HTML accordingly
 * 
 * @param {string} neuTitle - This is the title of the task
 * @param {string} neuCategory - This is the category of the task
 * @param {string} neuDescription - This is the description of the task
 * @param {Date} neuDate - This is the due date of teh task
 * @param {string} urgency - This is the urgency of the task
 * @param {string} toMember - This is the member the task is assigned to
 * @param {number} i - This number is unique for every task, it is equal to the index of the task in addedTasks
 */

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

/*dragndrop functionality*/

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

async function loadJSON(key) {
    await downloadFromServer();
    let JSONAsString = await backend.getItem(key)

    JSON = JSON.parse(JSONAsString) || [];
    return JSON;
}

async function saveChanges() {
    await backend.setItem('TASKS', JSON.stringify(addedTasks));
}
