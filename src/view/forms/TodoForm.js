class TodoForm{
    static getForm(){
        const form = document.createElement("form");
        form.classList.add("todo-form");

        const title = document.createElement("input");
        title.type = 'text';
        title.name = 'title';
        title.required = true;
        title.placeholder = 'Name ToDo'

        form.appendChild(title);

        const description = document.createElement("input");
        description.type = 'text';
        description.name = 'description';
        description.placeholder = "This is for.."

        form.appendChild(description);

        const dueDate = document.createElement("input");
        dueDate.type = "text";
        dueDate.name = "duedate";
        dueDate.required = true;
        dueDate.placeholder = "10 jan";

        form.appendChild(dueDate);

        const priority = document.createElement("input");
        priority.type = "range";
        priority.min = '1';
        priority.max = '5';

        form.appendChild(priority);

        const button = document.createElement("button");
        button.innerText = "Create Todo"
        button.type = 'submit';

        form.appendChild(button);
        
        return form;
    }
}

export default TodoForm;