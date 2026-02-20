class Project {
    constructor(title ) {
        this.id = crypto.randomUUID();
        this.project = [];
        this.title = title;
    }

    addTodo(todo) {
        if(!(todo instanceof Todo)){
            throw new Error("Must be a Todo instance");
        }

        this.project.push(todo);
    }

    delete(id) {
        this.project = this.project.filter(todo => todo.id !== id)
    }
}
