class Project{
    constructor(title){
        this.title = title;
        this.id = crypto.randomUUID();
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    deleteTodo(){
        this.todos = this.todos.filter(todo => todo.it !== id);
    }

    getTodoById(id){
        return this.todos.find(todo => todo.id === id);
    }
}

export default Project;