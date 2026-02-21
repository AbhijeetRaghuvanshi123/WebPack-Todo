import UIController from "../../controller/UIController.js";

class Content{
    static content = document.querySelector('.content');

    static loadProjects(projects = []){
        if(projects.length < 1){
            this.content.innerHTML = `<h1 class="warning">No Projects to Load</h1>`;
        }
        else{
            this.content.innerHTML = ``;
            projects.forEach(project => {
                const div = document.createElement("div");
                div.classList.add("project");
                div.id = project.id;
                const h2 = document.createElement("h2");
                h2.innerText = project.title;

                const foot = document.createElement("div");
                const del = document.createElement('button');
                del.classList.add("delete-project")
                del.innerText = "Delete";

                const view = document.createElement("button");
                view.classList.add("view-todo")
                view.innerText = "ToDos";

                foot.appendChild(del);
                foot.appendChild(view);

                div.appendChild(h2);
                div.appendChild(foot);
                this.content.appendChild(div);
            })
        }
    }
}

export default Content;