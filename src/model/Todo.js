class Todo {
    constructor(title, description, duedate, priority) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
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

    getTaskById(id){
        return this.taskList.find(task => task.id === id);
    }
}

export default Todo;