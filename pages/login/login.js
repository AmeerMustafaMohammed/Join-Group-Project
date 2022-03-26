let groups = [];  //all founded groups
let users = [];  //all user names
let requestedGroup;  //group, which was requested
let user;  //username
let currentUser = [];  //combination of group and user


function init() {
    loadArrays();
}


function show(id) {
    document.getElementById(id).classList.remove('d-none');
}


function hide(id) {
    document.getElementById(id).classList.add('d-none');
}


function checkIfGroupExists() {
    let group = document.getElementById('group_name_input').value;

    if (groups.indexOf(group) !== -1) {
        goToLogin(group);
    } else if (group.length == 0) {
        showWarningEmptyInput();
    }
    else {
        showWarningGroupNotExisting();
    }
}


function goToLogin(group) {
    requestedGroup = group;
    hide('group_search');
    show('user_login');
    hideWarnigns();
}


function hideWarnigns() {
    document.getElementById('group_not_found').classList.add('d-none');
    document.getElementById('empty_group_input').classList.add('d-none');
}


function userLogIn() {
    let username = document.getElementById('username_input').value;

    if (users.indexOf(username) !== -1) {
        user = username;

        setUser();
    }
}


function createAccount() {
    let username = document.getElementById('create_username_input').value;

    users.push(username);
    saveArrays();
    user = username;

    setUser();
}


function setUser() {
    currentUser = {
        'group': requestedGroup,
        'username': user
    }
}


function showWarningEmptyInput() {
    document.getElementById('empty_group_input').classList.remove('d-none');
    document.getElementById('group_not_found').classList.add('d-none');
}


function showWarningGroupNotExisting() {
    document.getElementById('group_not_found').classList.remove('d-none');
    document.getElementById('empty_group_input').classList.add('d-none');
}


function addGroup() {
    let groupName = document.getElementById('found_group_name_input').value;

    groups.push(groupName);
    saveArrays();
    requestedGroup = groupName;
    hide('found_group_container');
    show('user_login');
}


function saveArrays() {
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('users', JSON.stringify(users));
}


function loadArrays() {
    let groupsAsString = localStorage.getItem('groups');
    let usersAsString = localStorage.getItem('users');

    if (groupsAsString && usersAsString) {
        groups = JSON.parse(groupsAsString);
        users = JSON.parse(usersAsString);
    }
}