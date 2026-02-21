class ProjectForm{
    static getForm(){
        const form = document.createElement("form");
        form.classList.add("project-form");

        const title = document.createElement("input");
        title.type = 'text';
        title.name = 'title';
        title.required = true;

        const submit = document.createElement("button");
        submit.type = 'submit';
        submit.innerText = 'Add Project';

        form.appendChild(title);
        form.appendChild(submit);

        return form;
    }
}

export default ProjectForm;