import Project from "./Project.js";

class DataBase{
    static init(){
        const storedProjects = localStorage.getItem("projects");

        if(storedProjects){
            const parsed = JSON.parse(storedProjects);

            this.projects = parsed.map(projectData => {
                const project = new Project(projectData.title);
                project.id = projectData.id;
                project.todos = projectData.todos || [];
                return project;
            });
        }else{
            this.projects = [];
        }
    }

    static save(){
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }
    
    static addProject(project){
        this.projects.push(project);
        this.save();
    }

    static deleteProject(id){
        this.projects = this.projects.filter(project => project.id !== id);
        this.save();
    }

    static getProjectById(id){
        return this.projects.find(project => project.id == id);
    }
}

export default DataBase;