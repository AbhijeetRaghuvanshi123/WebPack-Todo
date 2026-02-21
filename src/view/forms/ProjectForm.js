class ProjectForm{
    static getForm(){
        const form = document.createElement("form");
        form.classList.add("project-form");

        const title = document.createElement("input");
        title.type = 'text';
        title.name = 'title';
        title.required = true;

        form.appendChild(title);

        const button = document.createElement("button");
        button.innerText = "Create Project"
        button.type = 'submit';

        form.appendChild(button);
        return form;
    }
}

export default ProjectForm;