export const today = () => new Date().toISOString().slice(0, 10);

export const dueBadge = (dueDate) => {
  if (!dueDate) return '';
  const t = today();
  const cls = dueDate < t ? 'overdue' : dueDate === t ? 'today' : '';
  const label = dueDate < t ? `Overdue · ${dueDate}` : dueDate === t ? `Due today` : `Due ${dueDate}`;
  return `<span class="todo-due ${cls}">${label}</span>`;
};

export const filteredTodos = (todos, activeFilter) => {
  const t = today();
  if (activeFilter === 'pending')   return todos.filter(x => !x.completed);
  if (activeFilter === 'completed') return todos.filter(x => x.completed);
  if (activeFilter === 'overdue')   return todos.filter(x => !x.completed && x.dueDate && x.dueDate < t);
  return todos;
};