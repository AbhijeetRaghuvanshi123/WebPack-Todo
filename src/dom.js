const loadProjects = (projects) => {
    const projectList = document.querySelector(".projects")
    projectList.innerHTML = '';
    projects.forEach(project => {
        const div = document.createElement("div");
        div.classList.add("project");
        const h2 = document.createElement("h2");
        h2.innerText = project.name;
        div.appendChild(h2);
        div.id = project.id;

        projectList.appendChild(div);
    });
}

const throwError = (element, error) => {
    switch(error){
        case "input-length":
            element.placeholder = "Minimum length 3 required";
    }
}

const loadTodos = (project) => {
    const todoList = document.querySelector(".todos");
    todoList.innerHTML = '';
    if(project.todos.length < 1){
        todoList.innerHTML = `<h1>No todo to show Add with form</h1>`;
        return;
    }
    project.todos.forEach(todo => {
        const div = document.createElement("div");
        div.classList.add("todo");
        div.id = todo.id;
        const h3 = document.createElement("h3");
        h3.innerText = todo.title;
        const p = document.createElement("p");
        p.classList.add("dueDate");
        const del = document.createElement("div");
        del.classList.add("delete");
        del.innerText = "delete";
        p.innerText = todo.dueDate;

        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(del);

        todoList.appendChild(div);
    })
}

const loadTasks = (todo) => {
    const taskList = document.querySelector(".todos");
    taskList.innerHTML = '';
    todo.tasks.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task");
        div.id = task.id;
        const h3 = document.createElement("h3");
        h3.innerText = task.description;
        const toggle = document.createElement("p");
        toggle.classList.add("toggletask");
        toggle.innerText = task.completed ? "Completed" : "Incomplete";

        div.appendChild(h3);
        div.appendChild(toggle);

        taskList.appendChild(div);
    })

    const add = document.createElement("div");
    add.classList.add("task");
    const description = document.createElement("input");
    description.classList.add("add-task");
    description.placeholder = "I have to do..."
    const btn = document.createElement("p");
    btn.innerText= 'Add';
    btn.classList.add("add-task-btn");
    
    add.appendChild(description);
    add.appendChild(btn);
    taskList.appendChild(add);
}



export {loadProjects ,throwError, loadTodos, loadTasks};