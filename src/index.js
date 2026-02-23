import './styles.css';
import { load } from './storage.js';
import { init, setProjects, renderProjects } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
  init();
  const projects = load();
  setProjects(projects);
  renderProjects();
});