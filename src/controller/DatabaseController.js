import Database from "../model/Database.js";
import Project from "../model/Project.js";
import Todo from "../model/Todo.js";
import Task from "../model/Task.js";

class DatabaseController{

    static addProject(form){
        const formData = new FormData(form);
        const title = formData.get("title");
        const project = new Project(title);
        Database.addProject(project);
    }

    static addTodo(form){
        const formData = new FormData(form);
        const title = formData.get("title");
        const description = formData.get("description");
        const duedate = formData.get("duedate");
        const priority = formData.get("priority");
        const todo = new Todo(title, description, duedate, priority);
        Project.addTodo(todo);
    }

    static addTask(form){
        const formData = new FormData(form);
        const description = formData.get("description");
        const task = new Task(description);
        Todo.addTask(task);
    }
}

export default DatabaseController;