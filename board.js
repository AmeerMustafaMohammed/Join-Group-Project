let tasks = [
    {
        'id': 0,
        'title': 'Test1',
        'category': 'IT',
        'description': 'Dnge tun und andere Dinge ebenfalls tun',
        'due-date': '22.04.2022',
        'urgency': 'High',
        'assigned-to': 'Benjamin',
        'class': 'in-review'
    },
    {   
        'id': 1,
        'title': 'Test2',
        'category': 'Management',
        'description': 'Viele Sachen machen',
        'due-date': '30.03.2022',
        'urgency': 'Medium',
        'assigned-to': 'Tobias',
        'class': 'to-do'
    },
    {   
        'id': 2,
        'title': 'Test3',
        'category': 'Web',
        'description': 'Unterschiedliche Aufgaben erledigen',
        'due-date': '01.05.2022',
        'urgency': 'Low',
        'assigned-to': 'Ameer',
        'class': 'approved'
    },
    {   
        'id': 2,
        'title': 'Drag n Drop integrieren',
        'category': 'Web',
        'description': 'Unterschiedliche Aufgaben erledigen',
        'due-date': '01.05.2022',
        'urgency': 'High',
        'assigned-to': 'Ameer',
        'class': 'in-review'
    },
    {   
        'id': 2,
        'title': 'Design ändern',
        'category': 'Web',
        'description': 'Bla BLa lLorem Ipsum Dolor amet',
        'due-date': '01.05.2022',
        'urgency': 'High',
        'assigned-to': 'Ameer',
        'class': 'to-do'
    },
    {   
        'id': 2,
        'title': 'Änderungen durchführen',
        'category': 'Web',
        'description': 'Unterschiedliche Aufgaben erledigen',
        'due-date': '01.05.2022',
        'urgency': 'Medium',
        'assigned-to': 'Ameer',
        'class': 'approved'
    },
    {   
        'id': 2,
        'title': 'Backend integrieren',
        'category': 'Web',
        'description': 'Unterschiedliche Aufgaben erledigen',
        'due-date': '01.05.2022',
        'urgency': 'Low',
        'assigned-to': 'Ameer',
        'class': 'in-progress'
    },    {   
        'id': 2,
        'title': 'Login Screen Design',
        'category': 'Web',
        'description': 'Unterschiedliche Aufgaben erledigen',
        'due-date': '01.05.2022',
        'urgency': 'Medium',
        'assigned-to': 'Ameer',
        'class': 'in-progress'
    },
    {   
        'id': 2,
        'title': 'Test3',
        'category': 'Web',
        'description': 'Unterschiedliche Aufgaben erledigen',
        'due-date': '01.05.2022',
        'urgency': 'Low',
        'assigned-to': 'Ameer',
        'class': 'in-progress'
    }
];


function init() {
    updateHTML();
    console.log('initializing');
}

function updateHTML() {
    updateTodo();
    updateInProgress();
    updateInReview();
    updateApproved();
}

function updateTodo() {
    let toDo = document.getElementById('to-do');
    toDo.innerHTML = '';
    for(i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if(task['class'] == 'to-do') {
        toDo.innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
        }
    }
}

function updateInProgress() {
    let inProgress = document.getElementById('in-progress');
    inProgress.innerHTML = '';
    for(i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if(task['class'] == 'in-progress') {
        inProgress.innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
        }
    }
}

function updateInReview() {
    let inReview = document.getElementById('in-review');
    inReview.innerHTML = '';
    for(i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if(task['class'] == 'in-review') {
        inReview.innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
        }
    }
}

function updateApproved() {
    let approved = document.getElementById('approved');
    approved.innerHTML = '';
    for(i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if(task['class'] == 'approved') {
        approved.innerHTML += taskHTML(task, i);
        backgroundColors(task, i);
        }
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
    tasks[currentElement]['class'] = category;
    updateHTML();
}