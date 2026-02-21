import Database from "../model/Database.js";
import Project from "../model/Project.js";

class DatabaseController{

    static add(project){
        project = new Project(project);
    }
}

export default DatabaseController;