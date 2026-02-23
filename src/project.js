const createProject = (name) => {
    return{
        name,
        todos: [],
        id: crypto.randomUUID(),
        addTodo(todo){
            this.todos.push(todo);
        },
        removeTodo(index){
            this.todos.splice(index, 1);
        }
    };
}

export default createProject;