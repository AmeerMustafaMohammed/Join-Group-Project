let closeMenu = true;

function openCloseNavigation() {
    let navigation = document.getElementById("navigation");
    if (closeMenu) {
        navigation.classList.add("open-menu")
        closeMenu = false;
    } else {
        navigation.classList.remove("open-menu")
        closeMenu = true;
    }

}