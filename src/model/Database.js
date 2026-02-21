class Database{
    static projects = [];

    static addProject(project){
        this.projects.push(project);
    }

    static deleteProject(id){
        this.projects = this.projects.filter(project => project.id !== id);
    }

    static getProjectById(id){
        return this.projects.find(project => project.id === id)
    }
}

export default Database;