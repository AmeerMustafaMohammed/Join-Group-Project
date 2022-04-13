setURL('http://gruppe-208.developerakademie.net/smallest_backend_ever');

let tasksBacklog = [];
let isOpened = false;
let tasksArchive = [];
let tasksTest;

async function initBacklog() {
    await loadTasksBacklog();
    //await loadTasksArchive();
    renderTasksBacklog();
}


/*async function loadTasksArchive() {
    let archiveAsString = await backend.getItem('TASKS');
    console.log(archiveAsString);//test

    tasksArchive =  JSON.parse(archiveAsString) || [];
    console.log('tasksArchive', tasksArchive);//test
}*/


async function loadTasksBacklog() {
    await downloadFromServer();
    let savedTasksBacklogString = await backend.getItem('TasksBacklog');

        tasksBacklog = await JSON.parse(savedTasksBacklogString) || [];
        //tasks = await JSON.parse(savedTasksBacklogString) || [];
        console.log('TasksBacklog:', tasksBacklog);
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


async function addTaskToTasksBacklog(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember) {
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
    await downloadFromServer();
    tasksBacklog = await loadJSON('TasksBacklog'); //check for right keys
    tasksBacklog.push(task);
/*    await loadTasksArchive();
    tasksArchive.push(task);*/
    await saveJson('TasksBacklog', tasksBacklog);
//    await saveJson('TASKS', tasksArchive); //TasksArchive
}


function renderTasksBacklog() {
    document.getElementById('backlog_content').innerHTML = '';
    document.getElementById('backlog_button_container').innerHTML = '';

    for (let i = 0; i < tasksBacklog.length; i++) {
        let currentTask = tasksBacklog[i];

        document.getElementById('backlog_content').innerHTML += cardTemplate(currentTask, i);
        document.getElementById('backlog_button_container').innerHTML += /*html*/`<button onclick="/*deleteTaskBacklog(${i})*/pushToTasks(${i}), hideButtonContainerBacklog()" class="add_to_board_btn" id="add_to_board_button${i}">Add task to board</button>`
        addCategories(i);
    }
}


async function pushToTasks(i) {
    tasks = await loadJSON('tasks');
    tasks.push(tasksBacklog[i]);
    saveJson('tasks', tasks);
    deleteTaskBacklog(i);
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


async function deleteTaskBacklog(i) {
    tasksBacklog.splice(i, 1);
    await saveJson('TasksBacklog', tasksBacklog);
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