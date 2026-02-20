class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();

        this.taskList = [];
    }

    addTask(task) {
        if(!(task instanceof Task)){
            throw new Error("Must be a Task Instance")
        }
        this.taskList.push(task);
    }

    deleteTask(id) {
        this.taskList = this.taskList.filter(task => task.id !== id);
    }
}