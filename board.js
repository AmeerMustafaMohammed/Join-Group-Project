let tasks = [
    {
        'id': 0,
        'title': 'Test1',
        'category': 'IT',
        'description': 'Dnge tun und andere Dinge ebenfalls tun',
        'due-date': '22.04.2022',
        'urgency': 'High',
        'assigned-to': 'Benjamin',
        'category': 'to-do'
    },
    {   
        'id': 1,
        'title': 'Test2',
        'category': 'Management',
        'description': 'Viele Sachen machen',
        'due-date': '30.03.2022',
        'urgency': 'Medium',
        'assigned-to': 'Tobias',
        'category': 'to-do'
    },
    {   
        'id': 2,
        'title': 'Test3',
        'category': 'Web',
        'description': 'Unterschiedliche Aufgaben erledigen',
        'due-date': '01.05.2022',
        'urgency': 'Low',
        'assigned-to': 'Ameer',
        'category': 'to-do'
    }];


function init() {
    showTasks();
}

function showTasks() {
    let toDo = document.getElementById('to-do');
    toDo.innerHTML = '';
    for(i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        toDo.innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
    }
}

function backgroundColors(task, i) {
    let h = document.getElementById(`h-${i}`);

    if(task['urgency'] == 'High') {
        h.classList.add('high-urgency');
    }

    if(task['urgency'] == 'Medium') {
        h.classList.add('medium-urgency');
    }

    if(task['urgency'] == 'Low') {
        h.classList.add('low-urgency');
    }
}

function taskHTML(task, i) {
    return /*html*/ `
        <div class="added-task" draggable="true" ondragstart="startDragging(${task['id']})">
            <div class="top-added">
                <span id="h-${i}" class="h-added">${task['title']}</span>
                <span class="category-added">${task['category']}</span>
            </div>
            <span class="description-added">${task['description']}</span>
            <div>
                <span class="date-added">${task['due-date']}</span>
                <span class="assigned-added">${task['assigned-to']}</span>
            </div>
        </div>`;
}

/*drag function*/

let currentElement;

function startDragging(id) {
    currentElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(category) {
    tasks[currentElement]['category'] = category;
}