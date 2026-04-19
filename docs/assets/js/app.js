
async function loadData() {
  const res = await fetch('./assets/data/weekly-progress.json');
  return res.json();
}

function badgeText(status) {
  if (status === 'doing') return '進行中';
  if (status === 'done') return '已完成';
  return '待開始';
}

function badgeClass(status) {
  if (status === 'doing') return 'doing';
  if (status === 'done') return 'done';
  return 'todo';
}

function weekCard(w, hidden=false) {
  const outputs = (w.outputs || []).join('、');
  return `
    <article class="week-card ${hidden ? 'hidden extra-week' : ''}">
      <div class="week-top">
        <div>
          <div class="week-number">Week ${w.week}</div>
          <div class="week-title">${w.title}</div>
        </div>
        <span class="badge ${badgeClass(w.status)}">${badgeText(w.status)}</span>
      </div>
      <div class="week-goal">${w.goal}</div>
      <div class="week-output">輸出：${outputs}</div>
    </article>
  `;
}

function taskCard(w) {
  return `
    <div class="task-card">
      <div class="task-head">
        <div class="task-week">Week ${w.week}</div>
        <span class="badge ${badgeClass(w.status)}">${badgeText(w.status)}</span>
      </div>
      <div class="task-title">${w.title}</div>
      <div class="task-desc">${w.goal}</div>
    </div>
  `;
}

async function renderHome() {
  const data = await loadData();
  const doing = data.weeks.find(w => w.status === 'doing') || data.weeks.find(w => w.status === 'todo');
  const next = data.weeks.find(w => w.week === (doing ? doing.week + 1 : 2)) || data.weeks.find(w => w.status === 'todo');

  document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
  document.getElementById('hero-focus').textContent = doing ? `Week ${doing.week}｜${doing.title}` : '尚未設定';
  document.getElementById('hero-next').textContent = next ? `Week ${next.week}｜${next.title}` : '待定';

  const currentPanel = document.getElementById('current-week-panel');
  currentPanel.innerHTML = doing ? `
    <h3>本週主題</h3>
    <p class="muted">${doing.title}</p>
    <div style="height:10px"></div>
    <h3>本週目標</h3>
    <p class="muted">${doing.goal}</p>
  ` : `<p class="muted">目前尚無進行中的週次。</p>`;

  const highlights = document.getElementById('method-highlights');
  highlights.innerHTML = (data.method_highlights || []).map(t => `<li>${t}</li>`).join('');

  const outputs = document.getElementById('current-outputs');
  outputs.innerHTML = doing && doing.outputs ? doing.outputs.map(t => `<li>${t}</li>`).join('') : '<li>目前無預計產出。</li>';

  const checklist = document.getElementById('report-checklist');
  checklist.innerHTML = (data.report_checklist || []).map(t => `<li>${t}</li>`).join('');

  const grid = document.getElementById('weeks-grid');
  grid.innerHTML = data.weeks.map((w, idx) => weekCard(w, idx >= 3)).join('');

  const toggleBtn = document.getElementById('toggle-weeks');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const hidden = document.querySelectorAll('.extra-week.hidden');
      if (hidden.length) {
        document.querySelectorAll('.extra-week').forEach(el => el.classList.remove('hidden'));
        toggleBtn.textContent = '收合顯示';
      } else {
        document.querySelectorAll('.extra-week').forEach(el => el.classList.add('hidden'));
        toggleBtn.textContent = '查看更多';
        window.scrollTo({ top: grid.parentElement.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }

  const boardDoing = document.getElementById('board-doing');
  const boardTodo = document.getElementById('board-todo');
  boardDoing.innerHTML = data.weeks.filter(w => w.status === 'doing').map(taskCard).join('') || '<p class="muted">目前無進行中項目。</p>';
  boardTodo.innerHTML = data.weeks.filter(w => w.status === 'todo').map(taskCard).join('') || '<p class="muted">目前無待開始項目。</p>';
}

async function renderWeekly() {
  const data = await loadData();
  const table = document.getElementById('weekly-table');
  if (!table) return;
  table.innerHTML = data.weeks.map(w => `
    <div class="weekly-row">
      <div><strong>Week ${w.week}</strong></div>
      <div><strong>${w.title}</strong></div>
      <div>${w.goal}</div>
      <div><span class="badge ${badgeClass(w.status)}">${badgeText(w.status)}</span></div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'home') renderHome();
  if (page === 'weekly') renderWeekly();
});
