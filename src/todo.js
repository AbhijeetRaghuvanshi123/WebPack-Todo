export const createTodo = (title, dueDate, priority = 'none') => ({
  title,
  dueDate,
  priority,
  id: crypto.randomUUID(),
  completed: false,
  createdOn: new Date().toISOString().slice(0, 10)
});