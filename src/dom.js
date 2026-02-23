import { createProject } from './project.js';
import { createTodo } from './todo.js';
import { save } from './storage.js';
import { toast } from './tost.js';
import { today, dueBadge, filteredTodos } from './helpers.js';

// ── State ──────────────────────────────────────
let projects = [];
let activeProject = null;
let activeFilter = 'all';

export const setProjects = (data) => { projects = data; };

// ── Modals ─────────────────────────────────────
const openModal  = (id) => document.getElementById(id).classList.add('open');
const closeModal = (id) => document.getElementById(id).classList.remove('open');

let onProjectSave = null;
let onTodoSave = null;
let onConfirmOk = null;

export const showProjectModal = ({ title = '', label = 'New Project', btnLabel = 'Create', onSave } = {}) => {
  document.getElementById('modal-project-title').textContent = label;
  document.getElementById('modal-project-save').textContent = btnLabel;
  document.getElementById('inp-project-name').value = title;
  onProjectSave = onSave;
  openModal('modal-project');
  setTimeout(() => document.getElementById('inp-project-name').focus(), 50);
};

export const showTodoModal = ({ title = '', dueDate = '', priority = 'none', label = 'New Task', btnLabel = 'Add Task', onSave } = {}) => {
  document.getElementById('modal-todo-title').textContent = label;
  document.getElementById('modal-todo-save').textContent = btnLabel;
  document.getElementById('inp-todo-name').value = title;
  document.getElementById('inp-todo-due').value = dueDate;
  document.getElementById('inp-todo-priority').value = priority;
  onTodoSave = onSave;
  openModal('modal-todo');
  setTimeout(() => document.getElementById('inp-todo-name').focus(), 50);
};

export const showConfirm = (text, onOk) => {
  document.getElementById('modal-confirm-text').textContent = text;
  onConfirmOk = onOk;
  openModal('modal-confirm');
};

export const init = () => {
  // Close on overlay click
  ['modal-project', 'modal-todo', 'modal-confirm'].forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal(id);
    });
  });

  // Project modal
  document.getElementById('modal-project-cancel').onclick = () => closeModal('modal-project');
  document.getElementById('inp-project-name').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('modal-project-save').click();
    if (e.key === 'Escape') closeModal('modal-project');
  });
  document.getElementById('modal-project-save').onclick = () => {
    const name = document.getElementById('inp-project-name').value.trim();
    if (!name) { document.getElementById('inp-project-name').focus(); return; }
    onProjectSave?.(name);
    closeModal('modal-project');
  };

  // Todo modal
  document.getElementById('modal-todo-cancel').onclick = () => closeModal('modal-todo');
  document.getElementById('inp-todo-name').addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal('modal-todo');
  });
  document.getElementById('modal-todo-save').onclick = () => {
    const name = document.getElementById('inp-todo-name').value.trim();
    if (!name) { document.getElementById('inp-todo-name').focus(); return; }
    const due = document.getElementById('inp-todo-due').value;
    const priority = document.getElementById('inp-todo-priority').value;
    onTodoSave?.(name, due, priority);
    closeModal('modal-todo');
  };

  // Confirm modal
  document.getElementById('modal-confirm-cancel').onclick = () => closeModal('modal-confirm');
  document.getElementById('modal-confirm-ok').onclick = () => { onConfirmOk?.(); closeModal('modal-confirm'); };
};

// ── Render Projects ────────────────────────────
export const renderProjects = () => {
  const content = document.getElementById('content');
  content.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'projects-grid view';

  projects.forEach(p => {
    const done = p.todos.filter(t => t.completed).length;
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = p.id;
    card.innerHTML = `
      <button class="project-card-del" data-del="${p.id}" title="Delete project">✕</button>
      <div class="project-card-tag">Project</div>
      <div class="project-card-title">${p.title}</div>
      <div class="project-card-footer">
        <span class="project-card-date">${p.createdOn}</span>
        <span class="project-card-count">${done}/${p.todos.length} done</span>
      </div>`;
    grid.appendChild(card);
  });

  const addCard = document.createElement('div');
  addCard.className = 'add-card';
  addCard.id = 'add-project-card';
  addCard.innerHTML = `<div class="add-card-icon">+</div><div class="add-card-label">New Project</div>`;
  grid.appendChild(addCard);
  content.appendChild(grid);

  grid.addEventListener('click', e => {
    const delBtn = e.target.closest('[data-del]');
    if (delBtn) {
      e.stopPropagation();
      const pid = delBtn.dataset.del;
      const proj = projects.find(p => p.id === pid);
      showConfirm(`Delete "${proj.title}" and all its tasks?`, () => {
        projects = projects.filter(p => p.id !== pid);
        save(projects);
        renderProjects();
        toast('Project deleted', 'danger');
      });
      return;
    }
    if (e.target.closest('#add-project-card')) {
      showProjectModal({ onSave: (name) => {
        const p = createProject(name);
        projects.push(p);
        save(projects);
        renderProjects();
        toast(`Project "${name}" created`);
      }});
      return;
    }
    const card = e.target.closest('.project-card');
    if (card) {
      activeProject = projects.find(p => p.id === card.dataset.id);
      activeFilter = 'all';
      renderTodos();
    }
  });
};

// ── Render Todos ───────────────────────────────
export const renderTodos = () => {
  const content = document.getElementById('content');
  content.innerHTML = '';
  const view = document.createElement('div');
  view.className = 'todo-view view';

  const todos = activeProject.todos;
  const done = todos.filter(t => t.completed).length;
  const pct  = todos.length ? Math.round((done / todos.length) * 100) : 0;
  const shown = filteredTodos(todos, activeFilter);

  view.innerHTML = `
    <div class="todo-header">
      <div class="todo-header-left">
        <button class="btn btn-ghost" id="back-btn">← Back</button>
        <div class="todo-project-title">${activeProject.title}</div>
      </div>
      <div class="todo-header-actions">
        <span class="todo-stats">${done}/${todos.length} completed</span>
        <button class="btn btn-primary" id="add-todo-btn">+ Add Task</button>
      </div>
    </div>

    <div class="progress-wrap">
      <div class="progress-label"><span>Progress</span><span>${pct}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div>

    <div class="filter-bar">
      <button class="filter-btn ${activeFilter==='all'?'active':''}" data-filter="all">All (${todos.length})</button>
      <button class="filter-btn ${activeFilter==='pending'?'active':''}" data-filter="pending">Pending (${todos.filter(t=>!t.completed).length})</button>
      <button class="filter-btn ${activeFilter==='completed'?'active':''}" data-filter="completed">Completed (${done})</button>
      <button class="filter-btn ${activeFilter==='overdue'?'active':''}" data-filter="overdue">Overdue (${todos.filter(t=>!t.completed&&t.dueDate&&t.dueDate<today()).length})</button>
    </div>

    <div class="todo-list" id="todo-list">
      ${shown.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">✓</div>
          <div class="empty-text">${activeFilter==='all' ? 'No tasks yet. Add one!' : 'No tasks here.'}</div>
        </div>` : ''}
      ${shown.map(todo => `
        <div class="todo-item ${todo.completed?'completed':''}" data-tid="${todo.id}">
          <div class="todo-check" data-toggle="${todo.id}">
            <span class="todo-check-inner">✓</span>
          </div>
          <div class="todo-body">
            <div class="todo-title">${todo.title}</div>
            <div class="todo-meta">
              ${dueBadge(todo.dueDate)}
              ${todo.priority !== 'none' ? `<span class="todo-priority ${todo.priority}">${todo.priority}</span>` : ''}
            </div>
          </div>
          <div class="todo-actions">
            <button class="todo-action-btn" data-edit="${todo.id}">Edit</button>
            <button class="todo-action-btn" data-del="${todo.id}">Delete</button>
          </div>
        </div>`).join('')}
    </div>`;

  content.appendChild(view);

  view.querySelector('#back-btn').onclick = () => { activeProject = null; renderProjects(); };

  view.querySelector('#add-todo-btn').onclick = () => {
    showTodoModal({ onSave: (name, due, priority) => {
      activeProject.todos.push(createTodo(name, due, priority));
      save(projects);
      renderTodos();
      toast('Task added');
    }});
  };

  view.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => { activeFilter = btn.dataset.filter; renderTodos(); };
  });

  view.querySelector('#todo-list').addEventListener('click', e => {
    const toggleBtn = e.target.closest('[data-toggle]');
    if (toggleBtn) {
      const todo = activeProject.todos.find(t => t.id === toggleBtn.dataset.toggle);
      if (todo) { todo.completed = !todo.completed; save(projects); renderTodos(); }
      return;
    }
    const editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      const todo = activeProject.todos.find(t => t.id === editBtn.dataset.edit);
      if (!todo) return;
      showTodoModal({
        title: todo.title, dueDate: todo.dueDate, priority: todo.priority,
        label: 'Edit Task', btnLabel: 'Save',
        onSave: (name, due, priority) => {
          todo.title = name; todo.dueDate = due; todo.priority = priority;
          save(projects); renderTodos(); toast('Task updated');
        }
      });
      return;
    }
    const delBtn = e.target.closest('[data-del]');
    if (delBtn) {
      const todo = activeProject.todos.find(t => t.id === delBtn.dataset.del);
      showConfirm(`Delete task "${todo?.title}"?`, () => {
        activeProject.todos = activeProject.todos.filter(t => t.id !== delBtn.dataset.del);
        save(projects); renderTodos(); toast('Task deleted', 'danger');
      });
    }
  });
};