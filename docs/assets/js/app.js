
async function loadData() {
  const res = await fetch('./assets/data/weekly-progress.json');
  return res.json();
}

function badgeText(status){
  if(status==='doing') return '進行中';
  if(status==='done') return '已完成';
  return '待開始';
}
function badgeClass(status){
  if(status==='doing') return 'doing';
  if(status==='done') return 'done';
  return 'todo';
}

function weekCard(week){
  return `
    <article class="week-card">
      <div class="week-top">
        <div class="week-name">Week ${week.week}<br>${week.title}</div>
        <span class="badge ${badgeClass(week.status)}">${badgeText(week.status)}</span>
      </div>
      <div class="week-goal">${week.goal}</div>
      <div class="week-section-title">預計輸出</div>
      <ul class="mini-list">${(week.outputs||[]).map(o=>`<li>${o}</li>`).join('')}</ul>
      ${(week.blockers&&week.blockers.length)?`<div class="week-section-title" style="margin-top:10px">目前卡點</div><ul class="mini-list">${week.blockers.map(b=>`<li>${b}</li>`).join('')}</ul>`:''}
    </article>
  `;
}

function taskCard(week){
  return `
    <div class="task">
      <div class="task-head">
        <div class="task-title">Week ${week.week}</div>
        <span class="badge ${badgeClass(week.status)}">${badgeText(week.status)}</span>
      </div>
      <div class="task-title">${week.title}</div>
      <div class="task-sub">${week.goal}</div>
    </div>
  `;
}

function renderEmpty(el, text){
  el.innerHTML = `<div class="empty-state">${text}</div>`;
}

function buildCurrentWeekDetail(week){
  return `
    <div class="detail-box">
      <div class="detail-title">Week ${week.week}｜${week.title}</div>
      <div class="detail-row">本週目標：${week.goal}</div>
      <div class="detail-row">預計輸出</div>
      <ul class="mini-list">${(week.outputs||[]).map(o=>`<li>${o}</li>`).join('')}</ul>
      ${(week.blockers&&week.blockers.length)?`<div class="detail-row" style="margin-top:10px">目前卡點</div><ul class="mini-list">${week.blockers.map(b=>`<li>${b}</li>`).join('')}</ul>`:''}
    </div>`;
}

let expanded = false;
let cachedData = null;

function renderWeeks(weeks){
  const weekCards=document.getElementById('week-cards');
  if(!weekCards) return;
  const visibleWeeks = expanded ? weeks : weeks.slice(0, 3);
  weekCards.innerHTML = visibleWeeks.map(weekCard).join('');
  const toggleBtn=document.getElementById('toggle-weeks');
  if(toggleBtn){
    toggleBtn.textContent = expanded ? '收合顯示' : '查看更多';
  }
}

async function renderHome(){
  const data = await loadData();
  cachedData = data;
  const weeks = data.weeks || [];
  const doing = weeks.find(w=>w.status==='doing') || weeks.find(w=>w.status==='todo') || weeks[0];
  const doneCount = weeks.filter(w=>w.status==='done').length;
  const nextWeek = weeks.find(w=>w.week>(doing?.week||0) && w.status!=='done');

  const heroTitle=document.getElementById('hero-title');
  const heroSub=document.getElementById('hero-subtitle');
  const heroFocus=document.getElementById('hero-focus');
  const heroProgress=document.getElementById('hero-progress');
  const heroNext=document.getElementById('hero-next');
  if(heroTitle) heroTitle.textContent=data.hero?.title || 'SA Learning Hub';
  if(heroSub) heroSub.textContent=data.hero?.subtitle || '';
  if(heroFocus) heroFocus.textContent=doing ? `Week ${doing.week}｜${doing.title}` : (data.hero?.current_focus || '');
  if(heroProgress) heroProgress.textContent=`已完成 ${doneCount} / ${weeks.length} 週`;
  if(heroNext) heroNext.textContent=nextWeek ? `Week ${nextWeek.week}｜${nextWeek.title}` : '持續深化目前主題';

  const currentDetail=document.getElementById('current-week-detail');
  if(currentDetail && doing) currentDetail.innerHTML = buildCurrentWeekDetail(doing);

  const rituals=document.getElementById('rituals');
  if(rituals) rituals.innerHTML=(data.rituals||[]).map(r=>`<li>${r}</li>`).join('');

  renderWeeks(weeks);

  const weeksSummary=document.getElementById('weeks-summary');
  if(weeksSummary){
    weeksSummary.textContent=`已完成 ${doneCount}｜進行中 ${weeks.filter(w=>w.status==='doing').length}｜待開始 ${weeks.filter(w=>w.status==='todo').length}`;
  }

  const toggleBtn=document.getElementById('toggle-weeks');
  if(toggleBtn){
    toggleBtn.onclick = () => {
      expanded = !expanded;
      renderWeeks(weeks);
    };
  }

  const doingCol=document.getElementById('board-doing');
  const todo=document.getElementById('board-todo');
  if(doingCol){
    const doingWeeks = weeks.filter(w=>w.status==='doing');
    doingCol.innerHTML = doingWeeks.length ? doingWeeks.map(taskCard).join('') : '';
    if(!doingWeeks.length) renderEmpty(doingCol, '目前沒有進行中的週次。');
  }
  if(todo){
    const todoWeeks = weeks.filter(w=>w.status==='todo');
    todo.innerHTML = todoWeeks.length ? todoWeeks.map(taskCard).join('') : '';
    if(!todoWeeks.length) renderEmpty(todo, '目前沒有待開始的週次。');
  }

  const checklist=document.getElementById('checklist');
  if(checklist) checklist.innerHTML=(data.checklist||[]).map(i=>`<li>${i}</li>`).join('');

  const methodHighlights=document.getElementById('method-highlights');
  if(methodHighlights){
    methodHighlights.innerHTML=(data.method_highlights||[]).map(m=>`
      <div class="method-box">
        <div class="detail-title">${m.title}</div>
        <div class="detail-row">${m.desc}</div>
      </div>`).join('');
  }

  const currentOutputs=document.getElementById('current-output-goals');
  if(currentOutputs && doing){
    currentOutputs.innerHTML = `
      <div class="output-box">
        <div class="detail-title">本週預計輸出</div>
        <ul class="mini-list">${(doing.outputs||[]).map(o=>`<li>${o}</li>`).join('')}</ul>
      </div>`;
  }
}

async function renderWeeklyPage(){
  const allWeeks=document.getElementById('all-weeks');
  if(!allWeeks) return;
  const data = cachedData || await loadData();
  const weeks = data.weeks || [];
  allWeeks.innerHTML = weeks.map(weekCard).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  await renderHome();
  await renderWeeklyPage();
});
