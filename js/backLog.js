setURL('https://gruppe-208.developerakademie.net/smallest_backend_ever');

let tasksBacklog = [];
let isOpened = false;
let tasksArchive = [];
let tasksTest;


/**
 * 
 * this function initializes the backlog page
 */
async function initBacklog() {
    await loadTasksBacklog();
    //await loadTasksArchive();
    renderTasksBacklog();
}


/**
 * 
 * this function is used to load the tasks
 */
async function loadTasksBacklog() {
    await downloadFromServer();
    let savedTasksBacklogString = await backend.getItem('TasksBacklog');

    tasksBacklog = await JSON.parse(savedTasksBacklogString) || [];
    console.log('TasksBacklog:', tasksBacklog);
}


/**
 * 
 * this function is used to catch all the values of the input fields on the add task page
 */
function catchInputsBacklog() {
    let newTitle = document.getElementById('add-title').value;
    let newCategory = document.getElementById('add-category').value;
    let newDescription = document.getElementById('add-description').value;
    let newDate = document.getElementById('add-date').value;
    let urgency = document.getElementById('add-urgency').value;
    let toMember = document.getElementById('asign-member').value;

    addTaskToTasksBacklog(newTitle, newCategory, newDescription, newDate, urgency, toMember);
    showSucces('task_created');
}


/**
 * 
 * this function is used to push the task into the tasks array with the values given as parameters
 * @param {string} newTitle 
 * @param {string} newCategory 
 * @param {string} newDescription 
 * @param {string} newDate 
 * @param {string} urgency 
 * @param {string} toMember 
 */
async function addTaskToTasksBacklog(newTitle, newCategory, newDescription, newDate, urgency, toMember) {
    let task = {
        'id': idAutoincrement(),
        'title': newTitle,
        'category': newCategory,
        'description': newDescription,
        'due-date': newDate,
        'urgency': urgency,
        'assigned-to': toMember,
        'class': 'to-do',
        'deleted-from': null
    };
    await downloadFromServer();
    tasksBacklog = await loadJSON('TasksBacklog'); //check for right keys
    tasksBacklog.push(task);
    await saveJson('TasksBacklog', tasksBacklog);
}


/**
 * 
 * this function is used to render the tasks in the backlogs
 */
function renderTasksBacklog() {
    document.getElementById('backlog_content').innerHTML = '';

    for (let i = 0; i < tasksBacklog.length; i++) {
        let currentTask = tasksBacklog[i];

        document.getElementById('backlog_content').innerHTML += cardTemplate(currentTask, i);
        addCategories(i);
    }
}


/**
 * 
 * this function is used to push a task of the array "tasksBacklog" at position i into the array "tasks"
 * @param {number} i
 */
async function pushToTasks(i) {
    tasks = await loadJSON('tasks');
    tasks.push(tasksBacklog[i]);
    saveJson('tasks', tasks);
    deleteTaskBacklog(i);
    showSucces('task_added');
}


/**
 * 
 * this function is used to show the information and hide it again after a while
 * @param {string} id 
 */
function showSucces(id) {
   document.getElementById(id).classList.add('show_info');

   setTimeout(hideAgain, 3000, id);
}


function hideAgain(id) {
    document.getElementById(id).classList.remove('show_info');
}


/**
 * 
 * this function is returning the HTML-template for a card
 * @param {object} currentTask 
 * @param {number} i 
 * @returns 
 */
function cardTemplate(currentTask, i) {
    return /*html*/`
    <div class="task_container_backlog">
      <div class="task_card_backlog" id="task_card_backlog${i}">
          <div class="category_backlog" id="category_container_backlog${i}"></div>

          <div class="d-none fullscreen_orientation" id="fullscreen_orientation${i}">
              <span>title:</span>
              <span>assigned-to:</span>
              <span>urgency:</span>
              <span>due:</span>
              <span>category:</span>
              <span>description:</span>
          </div>

          <div class="task_info_container" id="task_info${i}">
            <span class="d-none bold_backlog" id="title_backlog${i}">${currentTask['title']}</span>
            <span class="span_backlog user_container_backlog bold_backlog">${currentTask['assigned-to']}</span>
            <span class="d-none bold_backlog" id="urgency_backlog${i}">${currentTask['urgency']}</span>
            <span class="d-none bold_backlog" id="due_backlog${i}">${currentTask['due-date']}</span>
            <span class="span_backlog category_container_backlog bold_backlog" id="category${i}">${currentTask['category']}</span>

            <div class="span_backlog details_container_backlog details_backlog" id="details_container${i}">
              <span class="details_span_backlog" id="description${i}">${currentTask['description']}</span>
              <img onclick="checkStatus(${i})" class="responsive_button_backlog" id="responsive_button${i}" src="../../img/backlog-img/menu.svg">
            </div>

            <div class="d-none button_container_fullscreen" id="button_container_backlog${i}"> 
                <button onclick="deleteTaskBacklog(${i})" class="fullscreen_btn fullscreen_btn_remove" id="delete_button_fullscreen${i}">Delete</button>
                <button onclick="pushToTasks(${i})" class="fullscreen_btn fullscreen_btn_add" id="add_to_board_button_fullscreen${i}">Add task to board</button>
              </div>
           </div>
      </div>

      <button onclick="pushToTasks(${i})" class="add_to_board_btn" id="add_to_board_button${i}">Add task to board</button>
    </div>
    `;
}


/**
 * 
 * this function is used to call the both functions that are needed to show the fullscreen view of a card
 * @param {number} i
 */
function showFullscreenBacklog(i) {
    addClassesShowFullscreen(i);
    removeClassesShowFullscreen(i);
}


/**
 * 
 * this function is adding all the fullscreen classes
 * @param {number} i
 */
function addClassesShowFullscreen(i) {
    document.getElementById('task_card_backlog' + i).classList.add('fullscreen_card');
    document.getElementById('category_container_backlog' + i).classList.add('fullscreen_category_container');
    document.getElementById('category' + i).classList.add('display');
    document.getElementById('description' + i).classList.add('display');
    document.getElementById('task_info' + i).classList.add('fullscreen_task_info');
    document.getElementById('details_container' + i).classList.add('fullscreen_details');
    changeImageShowFullscreen(i);
}


/**
 * 
 * this function is used to change the menu image to the cross image
 * @param {number} i
 */
function changeImageShowFullscreen(i) {
    document.getElementById('responsive_button' + i).classList.add('fullscreen_image');
    document.getElementById('responsive_button' + i).src ="../../img/backlog-img/close.svg";
}


/**
 * 
 * this function is used to remove all the classes that are not needed for the fullscreen view
 * @param {number} i
 */
function removeClassesShowFullscreen(i) {
    document.getElementById('title_backlog' + i).classList.remove('d-none');
    document.getElementById('urgency_backlog' + i).classList.remove('d-none');
    document.getElementById('due_backlog' + i).classList.remove('d-none');
    document.getElementById('fullscreen_orientation' + i).classList.remove('d-none');
    document.getElementById('button_container_backlog' + i).classList.remove('d-none');
    document.getElementById('fullscreen_background').classList.remove('d-none');
}


/**
 * 
 * this function is used to call the two functions needed to exit the fullscreen view
 * @param {number} i
 */
function quitFullscreenBacklog(i) {
    addClassesQuitFullscreen(i);
    removeClassesQuitFullscreen(i);
}


/**
 * 
 * this function is used to add all the functions removed when the fullscreen view was opened back
 * @param {number} i
 */
function addClassesQuitFullscreen(i) {
    document.getElementById('title_backlog' + i).classList.add('d-none');
    document.getElementById('urgency_backlog' + i).classList.add('d-none');
    document.getElementById('due_backlog' + i).classList.add('d-none');
    document.getElementById('fullscreen_orientation' + i).classList.add('d-none');
    document.getElementById('button_container_backlog' + i).classList.add('d-none');
    document.getElementById('fullscreen_background').classList.add('d-none');
}


/**
 * 
 * this function is used to remove all the fullscreen classes
 * @param {number} i
 */
function removeClassesQuitFullscreen(i) {
    document.getElementById('task_card_backlog' + i).classList.remove('fullscreen_card');
    document.getElementById('category_container_backlog' + i).classList.remove('fullscreen_category_container');
    document.getElementById('task_info' + i).classList.remove('fullscreen_task_info');
    document.getElementById('category' + i).classList.remove('display');
    document.getElementById('description' + i).classList.remove('display');
    document.getElementById('details_container' + i).classList.remove('fullscreen_details');
    changeImageQuitFullscreen(i);
}


/**
 * 
 * this function this function is used to change the cross image back to the menu image
 * @param {number} i
 */
function changeImageQuitFullscreen(i) {
    document.getElementById('responsive_button' + i).classList.remove('fullscreen_image');
    document.getElementById('responsive_button' + i).src ="../../img/backlog-img/menu.svg";
}


/**
 * 
 * this function is used to delete a backlog task
 * @param {number} i
 */
async function deleteTaskBacklog(i) {
    tasksBacklog.splice(i, 1);
    await saveJson('TasksBacklog', tasksBacklog);
    renderTasksBacklog();
    document.getElementById('fullscreen_background').classList.add('d-none');

    if (isOpened) {
        isOpened = !isOpened;
    }
}


/**
 * 
 * this function is used to check wether a card is opened or not
 * @param {number} i
 */
function checkStatus(i) {
        if (!isOpened) {
            showFullscreenBacklog(i);
        } else {
            quitFullscreenBacklog(i);
        }
    
    isOpened = !isOpened;
}


/**
 * 
 * this function  is used to add the css classes matching to the category of the task
 * @param {number} i
 */
function addCategories(i) {
    let category = tasksBacklog[i]['category'];
    let categoryContainer = document.getElementById('category_container_backlog' + i);

    if (category == 'IT') {
        categoryContainer.classList.add('backlog_IT');
    } else if (category == 'Controlling') {
        categoryContainer.classList.add('backlog_controlling');
    } else if (category == 'Web') {
        categoryContainer.classList.add('backlog_web');
    } else if (category == 'Backend') {
        categoryContainer.classList.add('backlog_backend');
    } else {
        categoryContainer.classList.add('new_category_backlog');
    }
}