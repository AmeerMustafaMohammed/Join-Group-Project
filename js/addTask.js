let currentGroup;
currentGroup = "DEMO";
let tasks = [];
let allUser = [];

function init() {
    if (loadJSON('TASKS')) {
        tasks = loadJSON('TASKS');
    }
    if (loadJSON('allUser')) {
        allUser = loadJSON('allUser');
    }
    showAllUsers();
    loadAllUser()

}

/*  USERS */

function loadAllUser() {
    if (loadJSON('allUser')) {
        allUser = loadJSON('allUser')
    }

}

function showAllUsers() {
    let memberOptions = document.getElementById('asign-member');
    memberOptions.innerHTML = '';
    for (let i = 0; i < allUser.length; i++) {
        if (allUser[0]['gruppe'] == currentGroup) {
            memberOptions.innerHTML += `
            <option value="max musterman">${allUser[i]['name']}</option>
            `;
        }
    }
}



function addNeuUser() {
    let neuUser = document.getElementById('neu-user').value;
    let user = {
        name: neuUser,
        gruppe: currentGroup
    }

    allUser.push(user)
    saveJson('allUser', allUser);
    showAllUsers();
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

/* JSON */

function saveJson(key, Json) {
    let jsonAsString = JSON.stringify(Json);
    localStorage.setItem(key, jsonAsString)
}



function loadJSON(key) {
    let JSONAsString = localStorage.getItem(key)
    if (JSONAsString) {
        result = JSON.parse(JSONAsString);
        return result;
    }

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


/* HIDE + SHOW DIVS */


function showDiv(id) {
    document.getElementById(id).style = "display:flex;"
}

function hideDiv(id) {
    document.getElementById(id).style = "display:none;"
}