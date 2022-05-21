setURL('https://gruppe-208.developerakademie.net/smallest_backend_ever');

let groups = []; //all founded groups
let users = []; //all user names
let requestedGroup; //group, which was requested
let user; //username
let currentUser = []; //combination of group and user


/*async function initLogin() {
    await downloadFromServer();
    loadItems();
}


function loadGroupName() {
    loadItems();
    if (currentUser) {
        document.getElementById('group_name_add_tasks').innerHTML = currentUser['group'];
    }
}*/


/**
 * 
 * this function is used to show the element with the id of the parameter "id"
 * @param {string} id 
 */
function show(id) {
    document.getElementById(id).classList.remove('d-none');
}

/**
 * 
 *  this function is used to hide the element with the id of the parameter "id"
 * @param {string} id 
 */
function hide(id) {
    document.getElementById(id).classList.add('d-none');
}


/**
 * 
 * this function checks if the requested group exists. If it does it leads the user to the login, if not it shows a message to the user
 */
function checkIfGroupExists() {
    let group = document.getElementById('group_name_input').value;

    if (groups.indexOf(group) !== -1) {
        goToLogin(group);
    } else if (group.length == 0) {
        showWarningEmptyInput();
    } else {
        showWarningGroupNotExisting();
    }
}

/**
 * 
 * this function shows the login card
 * @param {string} group 
 */
function goToLogin(group) {
    requestedGroup = group;
    hide('group_search');
    show('user_login');
    hideWarnigns();
}

/**
 * 
 * this function is used to hide the warnigs shown, when a group does not exist or the user did not type anything
 */
function hideWarnigns() {
    document.getElementById('group_not_found').classList.add('d-none');
    document.getElementById('empty_group_input').classList.add('d-none');
}


/**
 * 
 * this function checks, if the user exists. If the user exists, it sets the user and leads him to the landing page. If not, it shows a warning
 */
function userLogIn() {
    let username = document.getElementById('username_input').value;

    if (users.indexOf(username) !== -1) {
        user = username;

        setUser();
        window.location.href = 'addTasks.html'
    } else if (users.indexOf(username) == -1) {
        showWarningUserNotFound();
    } else {
        showWarningEmptyInput();
    }
}


/**
 * 
 * this function is used to create a new user
 */
function createAccount() {
    let username = document.getElementById('create_username_input').value;

    users.push(username);
    saveItems();
    user = username;

    setUser();
}


/**
 * 
 * this function is used to set the current combination of user and group
 */
function setUser() {
    currentUser = {
        'group': requestedGroup,
        'username': user
    }

    saveItems();
}


/**
 * 
 * this function shows the warning for a wrong username and hides the other warning in case it is displayed
 */
function showWarningUserNotFound() {
    document.getElementById('empty_group_input').classList.add('d-none');
    document.getElementById('user_not_found').classList.remove('d-none');
}


/**
 * 
 * this function shows the warning for an empty input and hides the other warning in case it is displayed
 */
function showWarningEmptyInput() {
    document.getElementById('empty_group_input').classList.remove('d-none');
    document.getElementById('group_not_found').classList.add('d-none');
}


/**
 * 
 * this function shows the warning for a wrong group input and hides the other warning in case it is displayed
 */
function showWarningGroupNotExisting() {
    document.getElementById('group_not_found').classList.remove('d-none');
    document.getElementById('empty_group_input').classList.add('d-none');
}


/**
 * 
 * this function is used to create and then set a new group
 */
function addGroup() {
    let groupName = document.getElementById('found_group_name_input').value;

    groups.push(groupName);
    saveItems();
    requestedGroup = groupName;
    hide('found_group_container');
    show('user_login');
}


/**
 * 
 * this function is used to save items into the local storage
 */
function saveItems() {
    localStorage.setItem('groups', JSON.stringify(groups));//needs backend saving
    localStorage.setItem('users', JSON.stringify(users));//needs backend saving

    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}


/**
 * 
 * this function is used to load all the needed items
 */
function loadItems() {
    let savedUser = localStorage.getItem('currentUser');

    let groupsAsString =  localStorage.getItem('groups'); //groupsAsString
    let usersAsString =  localStorage.getItem('users'); //usersAsString

     
    if (groupsAsString) {
        groups =  JSON.parse(groupsAsString);
    }

    if(usersAsString) {
        users =  JSON.parse(usersAsString);
    }

    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}