/* ===== EDITABLE CONTENT: update these figures with verified data ===== */
const pitchData={
 funding:"GH₵20,000",
 t_farmers:"100+",t_customers:"500+",t_business:"15+",t_products:"300+",t_waste:"150+",t_collectors:"20+",t_upcyclers:"15+",t_tx:"1200+",
 email:"skylynqdigital@gmail.com",phone:"+233 59 686 5714",social:"Facebook · Instagram · WhatsApp"
};
/* ===== END EDITABLE CONTENT ===== */
const $=(s,r=document)=>[...r.querySelectorAll(s)];
const bg=(local,remote)=>{
  const a=local?`url('${local}')`:"";
  const b=remote?`url('${remote}')`:"";
  return [a,b].filter(Boolean).join(",");
};
$('[data-c]').forEach(e=>e.innerHTML=e.dataset.c.split(';').map(x=>{
  const[a,b,img,fallback]=x.split('|');
  const photo=img?`<div class="card-photo" style="background-image:${bg(img,fallback)}"></div>`:"";
  return `<div class="card">${photo}<div class="card-body"><h3>${a}</h3>${b?`<p>${b}</p>`:""}</div></div>`;
}).join(''));
$('[data-s]').forEach(e=>e.innerHTML=e.dataset.s.split(';').map(x=>{
  const[kl,img]=x.split('|');
  const[k,l]=kl.split(':');
  const photo=img?`<div class="card-photo" style="background-image:url('${img}')"></div>`:"";
  return `<div class="card stat">${photo}<strong data-k="${k}"></strong><p>${l}</p></div>`;
}).join(''));
$('[data-flow]').forEach(e=>e.innerHTML=e.dataset.flow.split('>').map(x=>`<span class="node">${x}</span>`).join('<i class="arr">→</i>'));
$('[data-chips]').forEach(e=>{
  const l=e.dataset.chips.split(',');
  if(e.id==='eco') e.insertAdjacentHTML('beforeend',l.map((x,i)=>{const a=i/l.length*6.283-1.57;return `<span class="chip" style="left:${50+44*Math.cos(a)}%;top:${50+44*Math.sin(a)}%">${x}</span>`}).join(''));
  else e.innerHTML=l.map(x=>`<span class="chip">${x}</span>`).join('');
});
$('[data-k]').forEach(e=>e.textContent=pitchData[e.dataset.k]);

const S=$('.slide'),n=S.length,menu=$('#menu')[0];let i=0;
const pad=x=>String(x).padStart(2,'0');
function go(k){
  i=Math.max(0,Math.min(n-1,k));
  S.forEach((s,j)=>s.classList.toggle('active',j===i));
  $('#ctr')[0].textContent=`${pad(i+1)} / ${pad(n)}`;
  $('#pb').style.width=((i+1)/n*100)+'%';
  document.body.classList.toggle('on-dark',S[i].classList.contains('dark')||S[i].classList.contains('photo-bg'));
  menu.hidden=true;
}
const fs=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
menu.innerHTML=S.map((s,j)=>`<button data-j="${j}">${pad(j+1)} ${s.dataset.t}</button>`).join('');
menu.onclick=e=>{const j=e.target.dataset.j;if(j!==undefined)go(+j)};
$('#prev')[0].onclick=()=>go(i-1);
$('#next')[0].onclick=()=>go(i+1);
$('#fs')[0].onclick=fs;
$('#ov')[0].onclick=()=>menu.hidden=!menu.hidden;
addEventListener('keydown',e=>{
  const k=e.key;
  if(k==='ArrowRight'||k===' '){e.preventDefault();go(i+1)}
  else if(k==='ArrowLeft')go(i-1);
  else if(k==='Home')go(0);
  else if(k==='End')go(n-1);
  else if(k==='f'||k==='F')fs();
  else if(k==='Escape')menu.hidden=true;
});
let x0;addEventListener('touchstart',e=>x0=e.touches[0].clientX);
addEventListener('touchend',e=>{if(innerWidth>850&&x0!=null){const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>60)go(i+(d<0?1:-1))}});
go(0);
