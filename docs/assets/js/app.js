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

function renderOutputs(outputs = []) {
  if (!outputs.length) return '<p class="hint">本週尚未填寫輸出項。</p>';
  return `<ul class="clean">${outputs.map(o => `<li>${o}</li>`).join('')}</ul>`;
}

function renderBlockers(blockers = []) {
  if (!blockers.length) return '<p class="hint">目前無阻塞項。</p>';
  return `<ul class="clean">${blockers.map(b => `<li>${b}</li>`).join('')}</ul>`;
}

function taskCard(w) {
  return `
    <div class="task">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
        <strong>Week ${w.week}</strong>
        <span class="badge ${badgeClass(w.status)}">${badgeText(w.status)}</span>
      </div>
      <div style="margin-top:8px;font-weight:700;">${w.title}</div>
      <p class="hint" style="margin:8px 0 0;">${w.goal}</p>
    </div>
  `;
}

async function renderHome() {
  const data = await loadData();
  const currentWeek = data.weeks.find(w => w.status === 'doing') || data.weeks.find(w => w.status === 'todo') || data.weeks[0];

  document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
  document.getElementById('hero-focus').textContent = data.hero.current_focus;

  const currentWeekCard = document.getElementById('current-week-card');
  currentWeekCard.innerHTML = `
    <div class="task">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
        <strong>Week ${currentWeek.week}｜${currentWeek.title}</strong>
        <span class="badge ${badgeClass(currentWeek.status)}">${badgeText(currentWeek.status)}</span>
      </div>
      <p style="margin:10px 0 6px;"><strong>本週目標：</strong>${currentWeek.goal}</p>
      <div><strong>預計輸出</strong>${renderOutputs(currentWeek.outputs)}</div>
      <div style="margin-top:10px;"><strong>目前卡點</strong>${renderBlockers(currentWeek.blockers)}</div>
    </div>
  `;

  const rituals = document.getElementById('rituals');
  rituals.innerHTML = data.rituals.map(r => `<li>${r}</li>`).join('');

  const weekCards = document.getElementById('week-cards');
  weekCards.innerHTML = data.weeks.map(w => `
    <div class="card" style="padding:16px;">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
        <strong>Week ${w.week}</strong>
        <span class="badge ${badgeClass(w.status)}">${badgeText(w.status)}</span>
      </div>
      <div style="margin-top:8px;font-weight:700;">${w.title}</div>
      <p class="hint" style="margin:8px 0 10px;">${w.goal}</p>
      <div class="hint">輸出：${(w.outputs || []).join('、') || '未填寫'}</div>
    </div>
  `).join('');

  const boardTodo = document.getElementById('board-todo');
  const boardDoing = document.getElementById('board-doing');
  const boardDone = document.getElementById('board-done');
  boardTodo.innerHTML = '';
  boardDoing.innerHTML = '';
  boardDone.innerHTML = '';

  data.weeks.forEach(w => {
    if (w.status === 'doing') boardDoing.innerHTML += taskCard(w);
    else if (w.status === 'done') boardDone.innerHTML += taskCard(w);
    else boardTodo.innerHTML += taskCard(w);
  });
}

document.addEventListener('DOMContentLoaded', renderHome);
