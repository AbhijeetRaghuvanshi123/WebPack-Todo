export const createProject = (title) => ({
  title,
  id: crypto.randomUUID(),
  createdOn: new Date().toISOString().slice(0, 10),
  todos: []
});