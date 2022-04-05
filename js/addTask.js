let currentGroup;
currentGroup = "DEMO";
let tasks = [];
let allUser = [];
let allCategories = [];




function init() {
    if (loadJSON('TasksBacklog')) {
        tasks = loadJSON('TasksBacklog'); //##############TOBIAS: ich habe die ganzen Funktionen so umgeändert, dass die Tasks ins Backlog und nicht auf das Board gepusht werden, von wo aus man sie weiter zum Board pushen kann##############
    }
    if (loadJSON('allUser')) {
        allUser = loadJSON('allUser');
    }
    loadGroupName(); //name of registered group is loaded from login.js

    loadAllUser(); // Load all user from LocalStorage
    showAllUsers(); // Show updated User on Screen
    loadCategories();
    showallCategories();

}

/* SHOWING CurrentUser ON  Member -Selector */

function showCurrentUser() {

}
/* ADDING TASKS *********************** */
function catchInputs(i) {
    //LEFT

    let neuTitle = tasks[i]['title'];
    let neuCategory = tasks[i]['category'];
    let neuDescription = tasks[i]['description'];

    //RIGHT
    let neuDate = tasks[i]['due-date'];
    let urgency = tasks[i]['urgency'];
    let toMember = tasks[i]['assigned-to'];

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
        'class': 'to-do',
        'deleted-from': null
    }
    tasks.push(task)
    saveJson('TASKS', tasks)
}



/* CUSTOMIZING USER AND CATEGORIES */

/*  USERS */
function loadAllUser() {
    if (loadJSON('allUser')) {
        allUser = loadJSON('allUser')
    }

}

function showAllUsers() {
    let memberOptions = document.getElementById('asign-member');
    memberOptions.innerHTML = '';
    if (!allUser.length == 0) {
        for (let i = 0; i < allUser.length; i++) {
            if (allUser[0]['gruppe'] == currentGroup) {
                memberOptions.innerHTML += `
                <option value="${allUser[i]['name']}">${allUser[i]['name']}</option>
                `;
            }
        }
    } else {
        memberOptions.innerHTML = `
        <option value="keine User">Add USER</option>
        `;
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

/* CATEGORYIES */
function loadCategories() {
    if (loadJSON('allCategories')) {
        allCategories = loadJSON('allCategories')
    }
}

function showallCategories() {
    let categoryOptions = document.getElementById('add-category');
    if (!allCategories.length == 0) {
        for (let i = 0; i < allCategories.length; i++) {
            if (allCategories[0]['gruppe'] == currentGroup) {
                categoryOptions.innerHTML += `
                <option value="${allCategories[i]['name']}">${allCategories[i]['name']}</option>
                `;
            }
        }
    }
}

function addNeuCategory() {
    let neuCategory = document.getElementById('neu-Category').value;
    let Category = {
        name: neuCategory,
        gruppe: currentGroup,
        color: randomColor()
    }

    allCategories.push(Category)
    saveJson('allCategories', allCategories);
    showallCategories();
}

function editCategory() {

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


/* GET RANDOM COLOR */

function randomColor() {
    let suffix = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color = color + suffix[Math.floor(Math.random() * 16)];
    }

    /* CHECKING COLOR */
    for (let j = 0; j < allCategories.length; j++) {
        if (allCategories[j].gruppe == currentGroup) {
            if (allCategories[j].color == color) {
                randomColor();
            }
        }
    }

    return color;

}