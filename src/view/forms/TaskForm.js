class TaskForm{
    static getForm(){
        const form = document.createElement("form");
        form.classList.add("task-form");

        const description = document.createElement("input");
        description.type = 'text';
        description.name = 'description';
        description.placeholder = "I have to..."

        form.appendChild(description);

        return form;
    }
}

export default TaskForm;