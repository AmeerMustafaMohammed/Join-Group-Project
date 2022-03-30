let tasksBacklog = [];


function initBacklog() {
    loadTasksBacklog();
    renderTasksBacklog();
}


function loadTasksBacklog() {
    let savedTasksBacklogString = localStorage.getItem('TASKS');

    if (savedTasksBacklogString) {
        tasksBacklog = JSON.parse(savedTasksBacklogString);
    }
}


function renderTasksBacklog() {
    for (let i = 0; i < tasksBacklog.length; i++) {
        let currentTask = tasksBacklog[i];

        document.getElementById('backlog_content').innerHTML += cardTemplate(currentTask, i);
        addCategories(i);
    }
}


function cardTemplate(currentTask, i) {
    return /*html*/`
      <div class="task_card_backlog">
      <div class="category_backlog" id="category_container_backlog${i}"></div>
          <span>${currentTask['assigned-to']}</span>
          <span class="categories_backlog">${currentTask['category']}</span>
          <span>${currentTask['description']}</span>
      </div>
    `;
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
    } else {
        categoryContainer.classList.add('backlog_backend');
    }
}