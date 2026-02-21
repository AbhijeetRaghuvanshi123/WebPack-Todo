import Sidebar from "../view/pages/Sidebar.js";
import ProjectForm from "../view/forms/ProjectForm.js"
import TodoForm from "../view/forms/TodoForm.js"
import DatabaseController from "./DatabaseController.js";
import TaskForm from "../view/forms/TaskForm.js"

class DisplayController{
    static loadProjectForm(){
        const form = ProjectForm.getForm();
        Sidebar.Load(form);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            DatabaseController.addProject(form);
            this.loadTodoForm();
            form.reset();
        })
    }

    static loadTodoForm(){
        const form = TodoForm.getForm();
        Sidebar.Load(form);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            DatabaseController.addTodo(form);
            this.loadTaskForm();
            form.reset();
        })
    }

    static loadTaskForm(){
        const form = TaskForm.getForm();
        Sidebar.Load(form);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            DatabaseController.addTask(form);
            form.reset();
        })
    }
    
}

export default DisplayController;