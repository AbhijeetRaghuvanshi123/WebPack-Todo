import Sidebar from "../view/pages/Sidebar.js";
import ProjectForm from "../view/forms/Project.js"
import DatabaseController from "./DatabaseController.js";

class DisplayController{
    static loadProjectForm(){
        const form = ProjectForm.getForm();
        Sidebar.Load(form);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })
    }
}

export default DisplayController;