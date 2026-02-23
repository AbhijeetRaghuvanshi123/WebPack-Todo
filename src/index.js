import "./styles.css";
import { save, load } from './storage.js';
import { loadProjects, throwError, loadTodos, loadTasks } from "./dom.js";
import createProject from "./project.js";
import createTodo from "./todo.js";
import createTask from "./task.js";



//init app
const storage = load();
loadProjects(storage);
let activeProjectId;
let activeProject;
if (storage.length > 0) {
    activeProjectId = storage[0].id;
    activeProject = storage[0];
    loadTodos(activeProject);
}
let activeTodoId;
let activeTodo;


//connect logic to dom
const container = document.querySelector(".container");
container.addEventListener('click', (e) => {

    if (e.target.id === ("add-project-btn")) {
        console.log("add project button clicked");
        const addproject = document.getElementById("add-project");
        if (addproject.value.length < 3) {
            throwError(addproject, "input-length");
        } else {
            addproject.placeholder = "Project Name";
            storage.push(createProject(addproject.value))
            save(storage);
            loadProjects(storage);
            addproject.value = '';
        }
    }

    if (e.target.closest(".project")) {
        console.log("project clicked");
        const projectId = e.target.closest(".project").id;
        activeProjectId = projectId;
        activeProject = storage.find(project => project.id === projectId)
        loadTodos(activeProject);
    }

    if (e.target.closest(".todo")) {
        const todoId = e.target.closest(".todo").id;
        activeTodoId = todoId;
        activeTodo = activeProject.todos.find(todo => todo.id === activeTodoId);
        loadTasks(activeTodo);
    }

    if (e.target.classList.contains("add-task-btn")) {
        const taskcontainer = e.target.closest(".task");
        const description = taskcontainer.querySelector(".add-task");
        const value = description.value;
        if (!value.trim()) return;
        activeTodo.tasks.push(createTask(value));
        save(storage);
        loadTasks(activeTodo);
        description.value = ''
    }

    if (e.target.classList.contains("delete")) {
        const todoId = e.target.closest(".todo").id;
        activeProject.todos = activeProject.todos.filter(todo => todo.id !== todoId);
        save(storage);
        loadTodos(activeProject);
    }

    if(e.target.classList.contains("toggletask")){
        const taskId = e.target.closest(".task").id;
        const task = activeTodo.getTask(taskId);
        task.toggle();
        loadTasks(activeTodo);
    }
})

const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    if (!activeProjectId) return;
    const project = storage.find(project => project.id === activeProjectId);
    const todo = createTodo(formData.get("title"), formData.get("dueDate"));
    project.todos.push(todo);
    loadTodos(project);
    save(storage);
    form.reset();
})
