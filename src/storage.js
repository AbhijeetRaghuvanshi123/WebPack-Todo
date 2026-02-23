import { createProject } from './project.js';
import { createTodo } from './todo.js';

export const save = (data) => {
  localStorage.setItem('pf_projects', JSON.stringify(data));
};

export const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem('pf_projects')) || [];
    return raw.map(p => {
      const project = createProject(p.title);
      project.id = p.id;
      project.createdOn = p.createdOn || project.createdOn;
      project.todos = (p.todos || []).map(t => {
        const todo = createTodo(t.title, t.dueDate, t.priority);
        todo.id = t.id;
        todo.completed = t.completed;
        todo.createdOn = t.createdOn || todo.createdOn;
        return todo;
      });
      return project;
    });
  } catch { return []; }
};