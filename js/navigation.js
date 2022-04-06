let closeMenu = true;
let openMenuButton = '/img/navigation/open.svg';
let closeMenuButton = '/img/navigation/close.svg';


function initNav() {
    addSource();
}


function addSource() {
    if (closeMenu) {
        document.getElementById('close-btn').src = openMenuButton;
    } else {
        document.getElementById('close-btn').src = closeMenuButton;
    }
}


function openCloseNavigation() {
    let navigation = document.getElementById("navigation");
    if (closeMenu) {
        navigation.classList.add("open-menu")
        closeMenu = false;
        addSource();
    } else {
        navigation.classList.remove("open-menu")
        closeMenu = true;
        addSource();
    }

}