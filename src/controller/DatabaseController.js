import DataBase from "../model/Database.js";
import Project from "../model/Project.js";
import Content from "../view/pages/Content.js";

class DataBaseController{
    static addProject(formData){
        const title = formData.get("title");
        const project = new Project(title);
        DataBase.addProject(project);
        Content.loadProjects(DataBase.projects);
    }

    static deleteProject(id){
        DataBase.deleteProject(id);
        Content.loadProjects(DataBase.projects)
    }
}

export default DataBaseController;