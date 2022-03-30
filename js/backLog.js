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
        
        document.getElementById('backlog_content').innerHTML += cardTemplate(currentTask);
    }
}


function cardTemplate(currentTask) {
    return /*html*/`
      <div class="task_card_backlog">
          <span>${currentTask['assigned-to']}</span>
          <span>${currentTask['category']}</span>
          <span>${currentTask['description']}</span>
      </div>
    `;
}