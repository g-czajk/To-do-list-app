// GENERAL VARIABLES

const clearList = document.querySelector('.clear');
const listContainer = document.querySelector('.tasks');
const addBtn = document.querySelector('.insert-btn');
const input = document.querySelector('.task-input');

const iconInProgress = document.querySelector('.fas fa-spinner');
const iconDone = document.querySelector('.fas fa-check-circle');
const iconDelete = document.querySelector('.fas fa-trash-alt');

let taskCollection;
let id;

// RESTORE LIST FROM LOCAL STORAGE

let data = localStorage.getItem("toDo");

if (data) {
    taskCollection = JSON.parse(data);
    id = taskCollection.length;
    loadList(taskCollection);
} else {
    taskCollection = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function (item) {
        addListElement(item.name, item.id, item.progress, item.done, item.delete);
    });
}

// REMOVE APP DATA FROM LOCAL STORAGE

clearList.addEventListener("click", function () {
    localStorage.removeItem("toDo");
    location.reload();
});

// DATE DISPLAY

const dateDisplay = document.querySelector('.date')

const options = {
    weekday: "long",
    month: "long",
    day: "numeric"
};

const date = new Date();

dateDisplay.textContent = date.toLocaleDateString("pl", options);

// CREATE NEW TASK

function addListElement(taskName, id, inProgress, done, deleted) {

    if (deleted) {
        return;
    }

    const progress = inProgress ? 'active' : '';
    const state = done ? 'done' : '';
    const lineThrough = done ? 'done' : '';

    const listElement = document.createElement('li');
    const spanIndicator = document.createElement('span');
    const iElementInProgress = document.createElement('i');
    const iElementDone = document.createElement('i');
    const iElementDelete = document.createElement('i');
    const paragraphElement = document.createElement('p');
    listElement.className = 'task';
    listElement.id = id;
    spanIndicator.className = 'action';
    iElementInProgress.className = `fas fa-spinner ${progress}`;
    iElementDone.className = `fas fa-check-circle ${state}`;
    iElementDelete.className = 'fas fa-trash-alt';
    paragraphElement.className = `text ${lineThrough}`;
    paragraphElement.textContent = taskName;

    listContainer.appendChild(listElement);
    listElement.appendChild(spanIndicator);
    listElement.appendChild(iElementInProgress);
    listElement.appendChild(iElementDone);
    listElement.appendChild(paragraphElement);
    listElement.appendChild(iElementDelete);
}

// ADD TASK TO LIST + UPDATE LOCAL STORAGE

function btnClick(e) {
    e.preventDefault();

    const taskName = input.value;

    if (taskName && taskName !== ' ') {
        addListElement(taskName, id, false, false, false);

        taskCollection.push({
            name: taskName,
            id: id,
            progress: false,
            done: false,
            delete: false
        });

        localStorage.setItem("toDo", JSON.stringify(taskCollection));

        id++;
    }
    input.value = '';
};

addBtn.addEventListener('click', btnClick);

// CHECK IN PROGRESS ICON

function checkInProgress(element) {
    const actionElement = element.parentNode.querySelector('.action');

    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        actionElement.classList.remove('indicate-done');
        actionElement.classList.add('indicate-progress');
        actionElement.textContent = 'w toku!';
    } else {
        actionElement.classList.remove('indicate-progress');
        actionElement.classList.remove('indicate-done');
    }

    document.querySelectorAll('.fa-spinner').forEach(icon => {
        if (icon.classList.contains('active')) {
            icon.classList.remove('active');
            setTimeout(() => {
                icon.classList.add('active')
            }, 0);
        }
    })

    if (
        element.parentNode.querySelector('.fa-check-circle').classList.contains('done')) {
        element.parentNode.querySelector('.fa-check-circle').classList.remove('done');
        element.parentNode.querySelector('.text').classList.remove('done');
        taskCollection[element.parentNode.id].done = false;
    }

    taskCollection[element.parentNode.id].progress = taskCollection[element.parentNode.id].progress ? false : true;
}

// CHECK DONE ICON

function checkDone(element) {
    const actionElement = element.parentNode.querySelector('.action');

    element.classList.toggle('done');

    element.parentNode.querySelector('.text').classList.toggle('done');
    if (element.parentNode.querySelector('.fa-spinner').classList.contains('active')) {
        element.parentNode.querySelector('.fa-spinner').classList.remove('active');
        taskCollection[element.parentNode.id].progress = false;
    }

    if (element.classList.contains('done')) {
        actionElement.classList.remove('indicate-progress');
        actionElement.classList.add('indicate-done');
        actionElement.textContent = 'zrobione!';
    } else {
        actionElement.classList.remove('indicate-done');
        actionElement.classList.remove('indicate-done');
    }

    taskCollection[element.parentNode.id].done = taskCollection[element.parentNode.id].done ? false : true;
}

// DELETE TASK (TRASH BUTTON)

function deleteTask(element) {
    element.parentNode.remove();

    taskCollection[element.parentNode.id].delete = true;
}

// EVENT DELEGATION FOR ICONS + UPDATE LOCAL STORAGE

listContainer.addEventListener('click', function (event) {
    const element = event.target;

    const elementClass = element.classList[1];

    if (elementClass == "fa-spinner") {
        checkInProgress(element);
    } else if (elementClass == "fa-check-circle") {
        checkDone(element);
    } else if (elementClass == "fa-trash-alt") {
        deleteTask(element);
    }

    localStorage.setItem("toDo", JSON.stringify(taskCollection));
})