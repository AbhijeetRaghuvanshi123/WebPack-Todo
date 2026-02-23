import createProject from "./project.js";
import createTask from "./task.js";
import createTodo from "./todo.js";

const save = (data) => {
    localStorage.setItem('projects', JSON.stringify(data));
}

const load = () => {
    const data = JSON.parse(localStorage.getItem('projects')) || [];

    return data.map(project => {
        const newProject = createProject(project.name);
        newProject.id = project.id;

        project.todos.forEach(todo => {
            const newTodo = createTodo(todo.title, todo.dueDate);
            newTodo.id = todo.id;

            todo.tasks.forEach(task => {
                const newTask = createTask(task.description);
                newTask.id = task.id;
                newTask.completed = task.completed;
                newTodo.tasks.push(newTask);
            });

            newProject.todos.push(newTodo);
        });

        return newProject;
    });
}

export { save , load};
