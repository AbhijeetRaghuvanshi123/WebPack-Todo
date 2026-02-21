import 'material-symbols/outlined.css';
import "./styles.css";
import UIController from './controller/UIController.js';
import DataBase from './model/Database.js';
import Content from './view/pages/Content.js';

class Main{
    static init(){
        DataBase.init();
        Content.loadProjects(DataBase.projects);
        UIController.init();
    }
}

Main.init();