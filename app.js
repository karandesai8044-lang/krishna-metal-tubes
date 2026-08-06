/* ============================================================
   KRISHNA METAL & TUBES — Shared JS
============================================================ */
(function(){
'use strict';
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- PRELOADER ---------- */
(function(){
  var pl=document.getElementById('preloader'); if(!pl)return;
  var bar=document.getElementById('plBar'),pct=document.getElementById('plPct'),arc=document.getElementById('plArc');
  var p=0,start=Date.now();
  var t=setInterval(function(){
    p+=Math.random()*12+4; if(p>100)p=100;
    var v=Math.floor(p);
    if(pct)pct.textContent=v; if(bar)bar.style.width=v+'%';
    if(arc)arc.style.strokeDashoffset=(276-276*v/100);
    if(p>=100){
      clearInterval(t);
      var wait=Math.max(0,(reduce?300:1200)-(Date.now()-start));
      setTimeout(function(){ pl.classList.add('done');
        setTimeout(function(){pl.style.display='none'},900); }, wait);
    }
  }, reduce?60:130);
})();

/* ---------- HEADER + PROGRESS + BACK TO TOP ---------- */
var header=document.getElementById('header'),prog=document.getElementById('progress'),toTop=document.getElementById('toTop');
function onScroll(){
  var y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
  if(header)header.classList.toggle('solid',y>20);
  if(prog)prog.style.width=(h>0?(y/h*100):0)+'%';
  if(toTop)toTop.classList.toggle('show',y>600);
}
window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
if(toTop)toTop.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};

/* ---------- MOBILE MENU ---------- */
var ham=document.getElementById('ham'),mm=document.getElementById('mobileMenu');
if(ham&&mm){
  ham.onclick=function(){ham.classList.toggle('open');mm.classList.toggle('open');
    document.body.style.overflow=mm.classList.contains('open')?'hidden':''};
  mm.querySelectorAll('a').forEach(function(a){a.onclick=function(){
    ham.classList.remove('open');mm.classList.remove('open');document.body.style.overflow=''}});
}

/* ---------- REVEAL (shared observer) ---------- */
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.14,rootMargin:'0px 0px -8% 0px'});
function observeReveals(root){(root||document).querySelectorAll('.reveal:not(.in)').forEach(function(el){io.observe(el)});}
observeReveals();

/* ---------- LANGUAGE TOGGLE ---------- */
var enBtn=document.getElementById('enBtn'),hiBtn=document.getElementById('hiBtn');
function applyLang(hi){
  document.querySelectorAll('[data-en]').forEach(function(el){
    var val=hi?el.getAttribute('data-hi'):el.getAttribute('data-en');
    if(val!=null) el.innerHTML=val;
  });
}
function setLang(lang){
  var hi=lang==='hi';
  document.body.classList.toggle('hi',hi);
  document.documentElement.lang=hi?'hi':'en';
  if(enBtn)enBtn.classList.toggle('on',!hi);
  if(hiBtn)hiBtn.classList.toggle('on',hi);
  applyLang(hi);
  try{localStorage.setItem('kmt-lang',lang)}catch(e){}
}
window.KMT_applyLang=function(){applyLang(document.body.classList.contains('hi'))};
if(enBtn)enBtn.onclick=function(){setLang('en')};
if(hiBtn)hiBtn.onclick=function(){setLang('hi')};
try{if(localStorage.getItem('kmt-lang')==='hi')setLang('hi');}catch(e){}

/* ---------- COUNTERS ---------- */
var cio=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting&&!e.target._done){
      e.target._done=true;
      var end=+e.target.getAttribute('data-count'),d=1600,s=null;
      function step(ts){ if(!s)s=ts; var p=Math.min((ts-s)/d,1);
        e.target.textContent=Math.floor((1-Math.pow(1-p,3))*end);
        if(p<1)requestAnimationFrame(step); else e.target.textContent=end; }
      requestAnimationFrame(step);
    }
  });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(function(c){cio.observe(c)});

/* ---------- HERO PIPE DOTS ---------- */
(function(){
  var wrap=document.getElementById('pipeDots'); if(!wrap)return;
  var n=8;
  for(var i=0;i<n;i++){
    var a=(i/n)*Math.PI*2, r=44;
    var x=50+Math.cos(a)*r, y=50+Math.sin(a)*r;
    var s=document.createElement('span');
    s.style.left='calc('+x+'% - 13px)'; s.style.top='calc('+y+'% - 13px)';
    wrap.appendChild(s);
  }
})();

/* ---------- GRADES MARQUEE ---------- */
(function(){
  var track=document.getElementById('gradeTrack'); if(!track)return;
  var grades=['SS 304','SS 316','SS 316L','SS 321','SS 310','SS 904L','Duplex 2205','Super Duplex 2507',
    'SS 202','SS 410','SS 430','IBR','A106 Gr B','API-5L','A333','SA179','Hardox 400','Hardox 500','Hardox 600',
    'A234 WPB','A182 F304','Copper','Brass','Aluminium'];
  var html='';
  grades.forEach(function(g){ var parts=g.split(' '); html+='<span class="grade"><b>'+parts[0]+'</b> '+(parts.slice(1).join(' '))+'</span>'; });
  track.innerHTML=html+html;
})();

/* ---------- INDUSTRIES ---------- */
(function(){
  var grid=document.getElementById('indGrid'); if(!grid)return;
  var inds=[
    ['Iron & Steel','लोहा व इस्पात'],['Cement','सीमेंट'],['Fertilizer','उर्वरक'],['Chemical','केमिकल'],
    ['Petrochemical','पेट्रोकेमिकल'],['Power Plant','पावर प्लांट'],['Refinery','रिफाइनरी'],['Oil & Gas','ऑयल व गैस'],
    ['Paper','पेपर'],['Textile','टेक्सटाइल'],['Sugar','शुगर'],['Dairy','डेयरी'],['Food','फूड'],['Beverage','बेवरेज'],
    ['Distilleries','डिस्टिलरी'],['Pharmacy','फार्मा'],['Solar Energy','सोलर एनर्जी'],['Automobile','ऑटोमोबाइल']
  ];
  var ico='<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V8l5-3v4l5-3v5l4-2v12"/></svg>';
  var h='';
  inds.forEach(function(it,i){
    h+='<div class="ind reveal'+(i%5?' d'+(i%5):'')+'">'+ico+'<span data-en="'+it[0]+'" data-hi="'+it[1]+'">'+it[0]+'</span></div>';
  });
  grid.innerHTML=h;
  observeReveals(grid);
  window.KMT_applyLang();
})();

/* ---------- DATA TABS (products) ---------- */
document.querySelectorAll('[data-tabs]').forEach(function(group){
  var btns=group.querySelectorAll('.tab-btn'),panels=group.querySelectorAll('.tab-panel');
  btns.forEach(function(b,i){
    b.onclick=function(){
      btns.forEach(function(x){x.classList.remove('on')});
      panels.forEach(function(x){x.classList.remove('on')});
      b.classList.add('on');
      var tgt=group.querySelector('#'+b.getAttribute('data-tab'));
      if(tgt)tgt.classList.add('on');
    };
  });
});

/* ---------- LIGHTBOX ---------- */
(function(){
  var lb=document.getElementById('lightbox'); if(!lb)return;
  var img=lb.querySelector('img'),cap=lb.querySelector('.lb-cap');
  function open(src,alt){img.src=src;cap.textContent=alt||'';lb.classList.add('open');document.body.style.overflow='hidden';}
  function close(){lb.classList.remove('open');document.body.style.overflow='';img.src='';}
  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-lightbox]');
    if(t){var im=t.querySelector('img')||t; open(im.getAttribute('src'),im.getAttribute('alt'));}
  });
  lb.addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
})();

/* ---------- INQUIRY FORM → WhatsApp / Email ---------- */
(function(){
  var form=document.getElementById('inquiryForm'); if(!form)return;
  var PHONE='919300002940', MAIL='bharatmetal2013@gmail.com';
  function val(n){var el=form.elements[n];return el?(el.value||'').trim():'';}
  function collect(){
    return {
      name:val('name'), phone:val('phone'), email:val('email'),
      product:val('product'), message:val('message')
    };
  }
  function buildText(d){
    var L=[];
    L.push('*New Enquiry — Krishna Metal & Tubes*');
    L.push('Name: '+d.name);
    L.push('Phone: '+d.phone);
    if(d.email)L.push('Email: '+d.email);
    if(d.product)L.push('Requirement: '+d.product);
    if(d.message)L.push('Message: '+d.message);
    return L.join('\n');
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.reportValidity())return;
    var d=collect(),txt=buildText(d);
    window.open('https://wa.me/'+PHONE+'?text='+encodeURIComponent(txt),'_blank');
    var ok=document.getElementById('formOk'); if(ok)ok.style.display='block';
  });
  var mailBtn=document.getElementById('emailInstead');
  if(mailBtn)mailBtn.addEventListener('click',function(){
    if(!form.reportValidity())return;
    var d=collect();
    var body=buildText(d).replace(/\*/g,'');
    window.location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Enquiry from '+(d.name||'website'))+'&body='+encodeURIComponent(body);
  });
})();

/* ---------- MAGNETIC BUTTONS (desktop) ---------- */
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.querySelectorAll('.btn-red').forEach(function(b){
    b.addEventListener('mousemove',function(e){
      var r=b.getBoundingClientRect();
      b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.28-2)+'px)';
    });
    b.addEventListener('mouseleave',function(){b.style.transform=''});
  });
}
})();
