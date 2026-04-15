async function loadData() {
  const res = await fetch('./assets/data/weekly-progress.json');
  return res.json();
}

function badgeClass(status) {
  if (status === 'doing') return 'doing';
  if (status === 'done') return 'done';
  return 'todo';
}

function badgeText(status) {
  if (status === 'doing') return '進行中';
  if (status === 'done') return '已完成';
  return '待開始';
}

async function renderHome() {
  const data = await loadData();
  const heroTitle = document.getElementById('hero-title');
  const heroSub = document.getElementById('hero-subtitle');
  const heroFocus = document.getElementById('hero-focus');
  const weekList = document.getElementById('week-list');
  const rituals = document.getElementById('rituals');
  const boardTodo = document.getElementById('board-todo');
  const boardDoing = document.getElementById('board-doing');
  const boardDone = document.getElementById('board-done');

  if (heroTitle) heroTitle.textContent = data.hero.title;
  if (heroSub) heroSub.textContent = data.hero.subtitle;
  if (heroFocus) heroFocus.textContent = data.hero.current_focus;

  if (weekList) {
    weekList.innerHTML = data.weeks.map(w => `
      <div class="task">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;">
          <strong>Week ${w.week}｜${w.title}</strong>
          <span class="badge ${badgeClass(w.status)}">${badgeText(w.status)}</span>
        </div>
        <div class="hint" style="margin-top:8px;">${w.goal}</div>
        <ul class="clean">
          ${w.outputs.map(o => `<li>${o}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  if (rituals) {
    rituals.innerHTML = data.rituals.map(r => `<li>${r}</li>`).join('');
  }

  if (boardTodo && boardDoing && boardDone) {
    boardTodo.innerHTML = '';
    boardDoing.innerHTML = '';
    boardDone.innerHTML = '';
    data.weeks.forEach(w => {
      const el = document.createElement('div');
      el.className = 'task';
      el.innerHTML = `<strong>Week ${w.week}</strong><div class="hint" style="margin-top:6px;">${w.title}</div>`;
      if (w.status === 'doing') boardDoing.appendChild(el);
      else if (w.status === 'done') boardDone.appendChild(el);
      else boardTodo.appendChild(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', renderHome);
