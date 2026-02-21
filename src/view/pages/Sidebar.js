class Sidebar{
    static sidebar = document.querySelector(".sidebar");

    static loadForm(form){
        this.sidebar.innerHTML = ``;
        this.sidebar.appendChild(form);
    }
}

export default Sidebar;