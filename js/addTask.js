let currentGroup;
let tasks = [];

function init() {
    if (loadJSON('TASKS')) {
        tasks = loadJSON('TASKS');
    }
}

function loadJSON(key) {
    let JSONAsString = localStorage.getItem(key)
    if (JSONAsString) {
        result = JSON.parse(JSONAsString);
        return result;
    }

}

/* ADDING TASKS *********************** */
function catchInputs() {
    //LEFT

    let neuTitle = document.getElementById('add-title').value;
    let neuCategory = document.getElementById('add-category').value;
    let neuDescription = document.getElementById('add-description').value;

    //RIGHT
    let neuDate = document.getElementById('add-date').value;
    let urgency = document.getElementById('add-category').value;
    let toMember = document.getElementById('asign-member').value;

    addTaskToTasks(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember);

}


function addTaskToTasks(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember) {
    
    let task = {
        'id': idAutoincrement(),
        'title': neuTitle,
        'category': neuCategory,
        'description': neuDescription,
        'due-date': neuDate,
        'urgency': urgency,
        'assigned-to': toMember,
        'class': 'to-do'
    }
    tasks.push(task)
    saveJson('TASKS', tasks)
}


function saveJson(key, Json) {
    let jsonAsString = JSON.stringify(Json);
    localStorage.setItem(key, jsonAsString)
}



function loadcurrentGrop() {
    currentGroup = localStorage.getItem('currentGroup');
}


/* ID AUTO INCREMENT */
function idAutoincrement() {
    if (tasks) {
        id = tasks.length + 1
    } else {
        id = 0
    }
    return id;
}