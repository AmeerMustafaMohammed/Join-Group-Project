setURL('https://gruppe-208.developerakademie.net/smallest_backend_ever');

let currentGroup;
currentGroup = "DEMO";
let tasks = [];
let allUser = [];
let allCategories = [];
let logInUser;




async function init() {
    await downloadFromServer();
//    if (loadJSON('TasksBacklog')) {
      //await loadJSON('TasksBacklog', 'tasksBacklog');
//    }
//    if (loadJSON('allUser')) {
      //await loadJSON('allUser', 'allUser');
//    }


//    loadGroupName(); //name of registered group is loaded from login.js
    changeDemo();
    loadAllUser(); // Load all user from LocalStorage
    addUserFromLogin();
    showAllUsers(); // Show updated User on Screen
    loadCategories();
    showallCategories();
}

/* Change Demo if loggied in */

async function changeDemo() {
    logInUser = await loadJSON('currentUser');
    if (logInUser) {
        currentGroup = logInUser.group;
    }
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


async function addTaskToTasks(neuTitle, neuCategory, neuDescription, neuDate, urgency, toMember) {

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
    saveJson('tasks', tasks)
    location.replace("backLog.html");
}



/* CUSTOMIZING USER AND CATEGORIES */

/*  USERS */
async function loadAllUser() {
    allUser = await loadJSON('allUser');
}

function showAllUsers() {
    let memberOptions = document.getElementById('asign-member');
    memberOptions.innerHTML = '';
    if (!allUser.length == 0) {
        for (let i = 0; i < allUser.length; i++) {
            if (allUser[i]['gruppe'] == currentGroup) {
                let userName = allUser[i]['name']
                    //
                console.log("Show User ausgefürht")
                memberOptions.innerHTML += `
                <option id = "option${i}" value="${userName}">${allUser[i]['name']}</option>
                `;
                selectCurrentUser(`option${i}`, userName);
            }
        }
    } else {
        memberOptions.innerHTML = `
        <option value="keine User">Add USER</option>
        `;
    }

}

/* Make CurrentUser Default Option by asign to User */
function selectCurrentUser(input, userName) {
    let currentUser = loadJSON('currentUser');
    if (currentUser) {
        let currentUserName = currentUser['username']
        if (userName == currentUserName) {
            document.getElementById(input).selected = true;
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
    hideDiv('add-user-container');
}


/* ADD USER TO allUser from Login page */

function addUserFromLogin() {
    let userSaved = false;
    if (logInUser && !isUserSaved()) {
        let user = {
            name: logInUser.username,
            gruppe: logInUser.group
        }

        allUser.push(user)
        console.log(user)
        saveJson('allUser', allUser);
    }

}

/* Cheking if new user is already saved */
function isUserSaved() {
    let userSaved = false;
    if (logInUser) {
        for (let i = 0; i < allUser.length; i++) {
            if (allUser[i].name == logInUser.username && allUser[i].gruppe == logInUser.group) {
                userSaved = true;
            }
        }
    }
    return userSaved;
}

/* CATEGORYIES */
async function loadCategories() {
    allCategories = await loadJSON('allCategories');
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
    hideDiv('add-Category-container')
}

function editCategory() {

}
/* JSON */

async function saveJson(key, Json) {
    let jsonAsString = JSON.stringify(Json);
    await backend.setItem(key, jsonAsString);
}


/**
 * 
 * This function gets the parameters of the key of the array and the variable the array gets loaded to (line 216)
 * @param {string} key 
 * @param {string} variable 
 */
async function loadJSON(key) {
    let JSONAsString = await backend.getItem(key);

    let result =  await JSON.parse(JSONAsString) || [];
    return result;
}


function loadJsonFromLocalStorage(key, variable) {
    let JSONAsString = localStorage.getItem(key);

    if(JSONAsString) {
    variable =  JSON.parse(JSONAsString);

    console.log(key, variable);
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