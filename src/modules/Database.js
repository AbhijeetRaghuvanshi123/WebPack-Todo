class DataBase{
    constructor(){
        this.projects = [];
    }

    addProject(project){
        this.projects.push(project);
    }

    deleteProject(title){
        this.projects = this.projects.filter(project => project.title != title);
    }

}

export default DataBase;