class Project {
    constructor(title ) {
        this.id = crypto.randomUUID();
        this.todos = [];
        this.title = title;
    }

    addTodo(todo) {
        if(!(todo instanceof Todo)){
            throw new Error("Must be a Todo instance");
        }

        this.todos.push(todo);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    getTodoById(id){
        return this.todos.find(todo => todo.id === id);
    }
}

export default Project;