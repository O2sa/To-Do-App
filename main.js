let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');


// array of tasks
let tasksArray = [];


//Check if there is  items in localStorage
if (window.localStorage.getItem('Tasks')) {
    tasksArray =JSON.parse(localStorage.getItem('Tasks')) ;
}
getElementsFromLocalStorage();

submit.onclick = function () {
    if (input.value !== "") {
        addTask(input.value);
        input.value = "";
    }
};

// Click on task element
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {

        // Delete task from local storage
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
        // Delete Task from page
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){
    //     // Toggle completed to the task 
        toggkeStutasTask(e.target.getAttribute("data-id"));

        e.target.classList.toggle("done");

    }
})
function addTask(taskText) {

    const taskData = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    tasksArray.push(taskData);
    //call function to add tasks to page
    addTasksToPage(tasksArray);
    // Add tasks to Local Storage
    addtasksToLocalStorage(tasksArray);
}



function addTasksToPage(tasks) {
    // make the container of tasks empty
    tasksDiv.innerHTML = "";

    //add all tasks to the page
    tasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // Check if task is completed
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        // create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));

        div.appendChild(span);

        // Add task div to page
        tasksDiv.appendChild(div);

    })

}

function addtasksToLocalStorage(tasks) {
    window.localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function getElementsFromLocalStorage() {
    let data = window.localStorage.getItem('Tasks');
    if (data) {
        let tasks = JSON.parse(data);
        addTasksToPage(tasks);
    }
}

function deleteTaskFromLocalStorage(taskId) {

    // remove the specified task from the list of tasks
    tasksArray = tasksArray.filter((task) => task.id != taskId);

    // Add the new data to localStorage
    // if (tasksArray.length > 0) {
        addtasksToLocalStorage(tasksArray);
    
}



function toggkeStutasTask(taskId) {

    for(let i=0; i<tasksArray.length; i++) {
        if(tasksArray[i].id == taskId) {
            tasksArray[i].completed == false? (tasksArray[i].completed =true) : (tasksArray[i].completed =false);
        }

    }
    addtasksToLocalStorage(tasksArray);
}