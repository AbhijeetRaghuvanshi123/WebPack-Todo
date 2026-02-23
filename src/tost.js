export const toast = (msg, type = 'success') => {
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3000);
};