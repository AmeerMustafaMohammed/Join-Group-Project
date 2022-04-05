let tasksBacklog = [];
let isOpened = false;
let tasksArchive = [];

function initBacklog() {
    loadTasksBacklog();
    loadTasksArchive();
    renderTasksBacklog();
}


function loadTasksArchive() {
    let archiveAsString = localStorage.getItem('TasksArchive');

    if(archiveAsString) {
        tasksArchive = JSON.parse(archiveAsString);
    }
}


function loadTasksBacklog() {
    let savedTasksBacklogString = localStorage.getItem('TasksBacklog');

    if (savedTasksBacklogString) {
        tasksBacklog = JSON.parse(savedTasksBacklogString);
        tasks = JSON.parse(savedTasksBacklogString);
    }
}


function catchInputsBacklog() {
    //LEFT

    let neuTitle = document.getElementById('add-title').value;
    let neuCategory = document.getElementById('add-category').value;
    let neuDescription = document.getElementById('add-description').value;

    //RIGHT
    let neuDate = document.getElementById('add-date').value;
    let urgency = document.getElementById('add-urgency').value;
    let toMember = document.getElementById('asign-member').value;

    addTaskToTasksBacklog(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember);
}


function addTaskToTasksBacklog(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember) {
    let task = {
        'id': idAutoincrement(),
        'title': neuTitle,
        'category': neuCategory,
        'description': neuDescription,
        'due-date': neuDate,
        'urgency': urgency,
        'assigned-to': toMember,
        'class': 'to-do',
        'deleted-from': null
    };
    tasks.push(task);
    loadTasksArchive();
    tasksArchive.push(task);
    saveJson('TasksBacklog', tasks);
    saveJson('TasksArchive', tasksArchive);
}


function renderTasksBacklog() {
    document.getElementById('backlog_content').innerHTML = '';
    document.getElementById('backlog_button_container').innerHTML = '';

    for (let i = 0; i < tasksBacklog.length; i++) {
        let currentTask = tasksBacklog[i];

        document.getElementById('backlog_content').innerHTML += cardTemplate(currentTask, i);
        document.getElementById('backlog_button_container').innerHTML += /*html*/`<button onclick="saveJson('TASKS', tasksArchive), deleteTaskBacklog(${i}), hideButtonContainerBacklog()" class="add_to_board_btn" id="add_to_board_button${i}">Add task to board</button>`  //!!!!!Hat einen Bug
        addCategories(i);
    }
}


function cardTemplate(currentTask, i) {
    return /*html*/`
    <div class="task_container_backlog">
      <div class="task_card_backlog">
      <div class="category_backlog" id="category_container_backlog${i}"></div>
          <span class="span_backlog user_container_backlog bold_backlog">${currentTask['assigned-to']}</span>
          <span class="span_backlog category_container_backlog bold_backlog">${currentTask['category']}</span>
          <div class="span_backlog details_container_backlog details_backlog">
          <span>${currentTask['description']}</span>
          <img onclick="showButtonBacklog(${i})" class="responsive_button_backlog" src="/img/backlog-img/menu.svg">   
        </div>
      </div>
    </div>
    `;
}


function deleteTaskBacklog(i) {
    tasksBacklog.splice(i, 1);
    saveJson('TasksBacklog', tasksBacklog);
    renderTasksBacklog();
}


function showButtonBacklog(i) {
   if (!isOpened) {
   document.getElementById('backlog_button_container').style = 'display: unset';
   document.getElementById('add_to_board_button' + i).style = 'display: unset';
   } else {
    document.getElementById('backlog_button_container').style = 'display: none';
    document.getElementById('add_to_board_button' + i).style = 'display: none';
   }

   isOpened = !isOpened;
}


function hideButtonContainerBacklog() {
   if (window.screen.width < 800) {
       document.getElementById('backlog_button_container').style = 'display: none';
   } else {
       return;
   }
}


function saveTasksBacklog() {
    let tasksArrayAsString = localStorage.getItem('TASKS');
    let tasksArray;
    if (tasksArrayAsString) {
       tasksArray = JSON.parse(tasksArrayAsString);
    }
    saveJson('TASKS', tasks);
}


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