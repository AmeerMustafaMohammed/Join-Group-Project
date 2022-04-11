setURL('http://gruppe-208.developerakademie.net/smallest_backend_ever');

let addedTasks = [];

/*helper function to capitalize first letter*/

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

async function initTrash() {
    await downloadFromServer();
    addedTasks = JSON.parse(localStorage.getItem('TASKS'));
    updateTrashHTML();
}

function updateTrashHTML() {
    let tasksDeleted = addedTasks.filter(t => t['class'] == 'deleted');
    document.getElementById('trash-container').innerHTML = '';
    for (i = 0; i < tasksDeleted.length; i++) {
        const task = tasksDeleted[i];
        document.getElementById('trash-container').innerHTML += deletedtaskHTML(task);
    }
}

function deletedtaskHTML(task) {
    let i = addedTasks.indexOf(task);
    return /*html*/ `
    <div class="deleted-tasks-container">
        <div class="keys">
            <div style="width: 10%; min-width: 120px">
                <p>${capitalize(task['deleted-from'])}</p>
            </div>
            <div style="width: 10%; min-width: 120px">
                <p>${task['category']}</p>
            </div>
            <div style="width: 10%; min-width: 120px">
                <p>${task['title']}</p>
            </div>
            <div style="width: 20%; min-width: 150px">
                <p>${task['description']}</p>
            </div>
            <div style="width: 10%; min-width: 120px">
                <p>${task['assigned-to']}</p>
            </div>
        </div>
        <div class="options">
            <div class="back-to-board" onclick="addToBoard(${i})" title="add to board">
            </div>
            <div class="delete-for-ever" onclick="deleteForEver(${i})" title="delete irrevocably"></div>
        </div>
    </div>`;
}

function addToBoard(i) { // i = index of element in addedTasks
    let task = addedTasks[i];
    task['class'] = 'to-do'; task['deleted-from'] = '';
    saveChanges();
    updateTrashHTML();
}

function deleteForEver(i) { // i = index of element in addedTasks
    addedTasks.splice(i, 1);
    saveChanges();
    updateTrashHTML();
}

function saveChanges() {
    // let tasksAsString = JSON.stringify(addedTasks);
    localStorage.setItem('TASKS', JSON.stringify(addedTasks));
}