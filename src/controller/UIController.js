import ProjectForm from "../view/forms/ProjectForm.js";
import Sidebar from "../view/pages/Sidebar.js";
import DataBaseController from "./DatabaseController.js";
import Content from "../view/pages/Content.js";

class UIController {
    static init() {
        document.querySelector("body").addEventListener('click', (e) => {
            if (e.target.id === "add-project") {
                const form = ProjectForm.getForm();
                Sidebar.loadForm(form);
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const formData = new FormData(form);
                    DataBaseController.addProject(formData);
                    form.reset();
                })
            }

            if (e.target.classList.contains("delete-project")) {
                const proId = e.target.closest(".project")
                DataBaseController.deleteProject(proId.id);
            }
        });
    }
}   

export default UIController;