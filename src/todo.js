const createTodo = (title, dueDate) => {
    return{
        title,
        dueDate,
        id: crypto.randomUUID(),
        tasks: [],
        addTask(task){
            this.tasks.push(task);
        },
        removeTask(index){
            this.tasks.splice(index , 1);
        },
        getTask(id){
            return this.tasks.find(task => task.id === id)
        }
    }
}

export default createTodo;