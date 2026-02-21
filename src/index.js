import 'material-symbols/outlined.css';
import "./styles.css";
import DisplayController from "./controller/DisplayController.js";

class Main{
    static init(){
        DisplayController.loadProjectForm();
    }
}

Main.init();