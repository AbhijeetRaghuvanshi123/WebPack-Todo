class Sidebar{
    static sidebar = document.querySelector(".sidebar");

    static Load(form){
        this.sidebar.innerHTML = '';
        this.sidebar.appendChild(form);
    }
}

export default Sidebar;