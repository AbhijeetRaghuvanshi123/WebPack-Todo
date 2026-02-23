const createTask = (description) => {
    return{
        description,
        completed: false,
        id: crypto.randomUUID(),
        toggle(){
            this.completed = !this.completed;
        }
    }
}

export default createTask;