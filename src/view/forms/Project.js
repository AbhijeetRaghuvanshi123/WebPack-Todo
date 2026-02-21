class ProjectForm{
    static getForm(){
        const form = document.createElement("form");
        form.classList.add("project-form");

        const input = document.createElement("input");
        input.type = 'text';
        input.name = 'projectName';
        input.required = true;

        form.appendChild(input);

        const button = document.createElement("button");
        button.innerText = "Create Project"
        button.type = 'submit';

        form.appendChild(button);
        return form;
    }
}

export default ProjectForm;