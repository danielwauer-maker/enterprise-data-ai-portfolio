const fmt = new Intl.NumberFormat('en-US',{maximumFractionDigits:1});
const labels={
  requirements:'Requirements',
  architecture:'Architecture',
  implementation:'Implementation',
  automated_tests:'Automated tests',
  runtime_acceptance:'Runtime acceptance',
  documentation_evidence:'Docs / evidence',
  merge_release_closeout:'Closeout'
};

function metric(label,value,sub=''){
  return `<article class="metric-card"><small>${label}</small><strong>${value}</strong>${sub?`<small>${sub}</small>`:''}</article>`;
}

function pct(v){return `${fmt.format(v||0)}%`}

fetch('program.json')
  .then(r=>{if(!r.ok) throw new Error('program.json unavailable'); return r.json()})
  .then(data=>{
    const p=data.program;
    document.getElementById('program-status').textContent=p.status;
    document.getElementById('metric-grid').innerHTML=[
      metric('Program completion',pct(p.program_completion_pct),'S00–S19 weighted'),
      metric('Planned effort',fmt.format(p.planned_hours)+' h','20 h/week baseline'),
      metric('Actual effort',fmt.format(p.actual_hours)+' h','measured only'),
      metric('Remaining effort',fmt.format(p.remaining_hours)+' h','baseline remaining'),
      metric('Target','30 Jun 2027','BCSentinel Professional Beta')
    ].join('');

    const current=data.sprints.find(s=>s.id===p.current_sprint_id)||data.sprints[0];
    document.getElementById('current-title').textContent=`${current.id} — ${current.title}`;
    document.getElementById('current-readiness').textContent=pct(current.readiness_pct);
    document.getElementById('current-progress').style.width=pct(current.readiness_pct);
    document.getElementById('current-meta').innerHTML=[
      `<span>${current.start} → ${current.end}</span>`,
      `<span>Plan ${fmt.format(current.planned_hours)} h</span>`,
      `<span>Actual ${fmt.format(current.actual_hours)} h</span>`,
      `<span>Track: ${current.track}</span>`
    ].join('');
    document.getElementById('current-objective').textContent=current.objective;

    const breakdown=document.getElementById('current-breakdown');
    Object.entries(current.readiness_breakdown).forEach(([key,value])=>{
      const el=document.createElement('div');
      el.innerHTML=`<small>${labels[key]||key}</small><strong>${pct(value)}</strong>`;
      breakdown.appendChild(el);
    });

    const board=document.getElementById('sprint-board');
    const tpl=document.getElementById('sprint-card-template');
    data.sprints.forEach(s=>{
      const card=tpl.content.firstElementChild.cloneNode(true);
      card.dataset.state=s.status;
      card.querySelector('.sprint-id').textContent=s.id;
      card.querySelector('.status-pill').textContent=s.status;
      card.querySelector('h3').textContent=s.title;
      card.querySelector('.date-range').textContent=`${s.start} → ${s.end}`;
      card.querySelector('.progress span').style.width=pct(s.readiness_pct);
      card.querySelector('.readiness').textContent=`Readiness ${pct(s.readiness_pct)}`;
      card.querySelector('.hours').textContent=`${fmt.format(s.actual_hours)} / ${fmt.format(s.planned_hours)} h`;
      card.querySelector('.track').textContent=`Track: ${s.track}`;
      card.querySelector('.dependencies').textContent=`Depends on: ${s.depends_on.length?s.depends_on.join(', '):'—'}`;
      card.querySelector('.card-objective').textContent=s.objective;
      board.appendChild(card);
    });
  })
  .catch(err=>{
    document.getElementById('program-status').textContent='DATA ERROR';
    document.getElementById('metric-grid').innerHTML=metric('Control Center',err.message);
  });
