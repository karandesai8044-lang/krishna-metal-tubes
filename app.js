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
  document.querySelectorAll('[data-en-ph]').forEach(function(el){
    var val=hi?el.getAttribute('data-hi-ph'):el.getAttribute('data-en-ph');
    if(val!=null) el.placeholder=val;
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
  var PHONE='919300002940', MAIL='ktechsolutions.in@gmail.com';
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
    var honey=form.elements['_honey']; if(honey&&honey.value)return; // spam bot
    if(!form.reportValidity())return;
    var d=collect(),txt=buildText(d);
    window.open('https://wa.me/'+PHONE+'?text='+encodeURIComponent(txt),'_blank');
    var ok=document.getElementById('formOk'); if(ok)ok.style.display='block';
    // Also deliver a copy to the inbox (best-effort, no backend needed).
    // First submission triggers a one-time activation email to MAIL — click it once.
    try{
      fetch('https://formsubmit.co/ajax/'+MAIL,{
        method:'POST',
        headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify({
          Name:d.name,Phone:d.phone,Email:d.email||'—',
          Requirement:d.product||'—',Message:d.message||'—',
          _subject:'New enquiry — Krishna Metal & Tubes website',_template:'table'
        })
      }).catch(function(){});
    }catch(err){}
    form.reset();
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
var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
if(fine){
  document.querySelectorAll('.btn-red,.btn-wa').forEach(function(b){
    b.addEventListener('mousemove',function(e){
      var r=b.getBoundingClientRect();
      b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.28-2)+'px)';
    });
    b.addEventListener('mouseleave',function(){b.style.transform=''});
  });
}

/* ---------- CINEMATIC HERO — mouse parallax ---------- */
(function(){
  if(reduce||!fine)return;
  var hero=document.querySelector('.hero'); if(!hero)return;
  var bg=hero.querySelector('.hero-bg'),ring=hero.querySelector('.ring-wrap'),copy=hero.querySelector('.hero-copy');
  hero.addEventListener('mousemove',function(e){
    var r=hero.getBoundingClientRect();
    var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    if(bg)bg.style.transform='translate('+(x*18)+'px,'+(y*18)+'px)';
    if(ring)ring.style.transform='translate('+(x*-26)+'px,'+(y*-26)+'px)';
    if(copy)copy.style.transform='translate('+(x*8)+'px,'+(y*8)+'px)';
  });
  hero.addEventListener('mouseleave',function(){
    if(bg)bg.style.transform='';if(ring)ring.style.transform='';if(copy)copy.style.transform='';
  });
})();

/* ---------- 3D TILT on cards ---------- */
(function(){
  if(reduce||!fine)return;
  document.querySelectorAll('.cat,.cap-card,.gradebox,.why').forEach(function(el){
    el.addEventListener('mousemove',function(e){
      var r=el.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      el.style.transform='perspective(900px) rotateX('+(y*-5)+'deg) rotateY('+(x*6)+'deg) translateY(-6px)';
    });
    el.addEventListener('mouseleave',function(){el.style.transform=''});
  });
})();

/* ---------- CUSTOM CURSOR RING (desktop) ---------- */
(function(){
  if(reduce||!fine)return;
  var ring=document.createElement('div');ring.className='cursor-ring';document.body.appendChild(ring);
  var rx=0,ry=0,tx=0,ty=0,shown=false;
  var SEL='a,button,.cat,.th,.ind,.gal,.tab-btn,input,textarea,.lang-toggle,.fab,.chip';
  document.addEventListener('mousemove',function(e){
    tx=e.clientX;ty=e.clientY;
    if(!shown){shown=true;rx=tx;ry=ty;ring.classList.add('on');}
  });
  document.addEventListener('mouseover',function(e){ if(e.target.closest(SEL))ring.classList.add('hover'); });
  document.addEventListener('mouseout',function(e){ if(e.target.closest(SEL))ring.classList.remove('hover'); });
  (function loop(){ rx+=(tx-rx)*.2;ry+=(ty-ry)*.2;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop); })();
})();

/* ---------- PAGE-LEAVE CURTAIN ---------- */
(function(){
  if(reduce)return;
  var cur=document.createElement('div');cur.className='page-curtain';document.body.appendChild(cur);
  document.addEventListener('click',function(e){
    var a=e.target.closest('a'); if(!a)return;
    var href=a.getAttribute('href')||'';
    if(a.target==='_blank'||a.hasAttribute('download'))return;
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
    if(/^(https?:|tel:|mailto:|#)/.test(href))return;
    if(!/\.html($|[?#])/.test(href))return;
    e.preventDefault();cur.classList.add('in');
    setTimeout(function(){window.location.href=href;},430);
  });
  window.addEventListener('pageshow',function(){cur.classList.remove('in');});
})();

/* ---------- SMOOTH MOMENTUM SCROLL (desktop) ---------- */
(function(){
  if(reduce||!fine)return;
  var target=window.scrollY,current=target,animating=false;
  function max(){return document.documentElement.scrollHeight-window.innerHeight;}
  function inner(el){
    while(el&&el!==document.body&&el.matches){
      if(el.matches('.gal-track,.table-scroll,#lightbox,.mobile-menu,.thumbs'))return true;
      el=el.parentElement;
    } return false;
  }
  function loop(){
    current+=(target-current)*.12;
    if(Math.abs(target-current)<.5){current=target;window.scrollTo(0,current);animating=false;return;}
    window.scrollTo(0,current);requestAnimationFrame(loop);
  }
  window.addEventListener('wheel',function(e){
    if(e.ctrlKey||inner(e.target))return;
    e.preventDefault();
    var d=e.deltaY*(e.deltaMode===1?16:1);
    target+=d; target=Math.max(0,Math.min(max(),target));
    if(!animating){animating=true;current=window.scrollY;requestAnimationFrame(loop);}
  },{passive:false});
  window.addEventListener('scroll',function(){ if(!animating)target=current=window.scrollY; },{passive:true});
  window.addEventListener('resize',function(){target=Math.max(0,Math.min(max(),target));});
})();

/* ---------- ENQUIRY CART (global, localStorage) ---------- */
(function(){
  var KEY='kmt-enquiry', PHONE='919300002940';
  var WA='<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5l-.7 1c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.4.3.1.1.1.5-.1 1.1Z"/></svg>';
  function get(){ try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]} }
  function save(a){ try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){} render(); }
  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }

  var fab=document.createElement('button'); fab.className='enq-fab'; fab.setAttribute('aria-label','Open enquiry list');
  fab.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2"><path d="M6 2h8l4 4v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"/><path d="M9 12h6M9 16h4"/></svg><span class="enq-lbl" data-en="Enquiry" data-hi="एन्क्वायरी">Enquiry</span><span class="cnt">0</span>';
  var panel=document.createElement('div'); panel.className='enq-panel';
  panel.innerHTML='<h4><span data-en="Your Enquiry List" data-hi="आपकी एन्क्वायरी लिस्ट">Your Enquiry List</span><button class="close" aria-label="Close">&times;</button></h4>'+
    '<div class="enq-list"></div>'+
    '<div class="enq-actions"><a class="btn btn-wa enq-send" target="_blank" rel="noopener">'+WA+'<span data-en="Send all on WhatsApp" data-hi="सब व्हाट्सएप पर भेजें">Send all on WhatsApp</span></a>'+
    '<button class="enq-clear" data-en="Clear all" data-hi="सब हटाएं">Clear all</button></div>';
  document.body.appendChild(fab); document.body.appendChild(panel);

  var listEl=panel.querySelector('.enq-list'), cntEl=fab.querySelector('.cnt'), sendEl=panel.querySelector('.enq-send');

  function render(){
    var a=get();
    cntEl.textContent=a.length;
    fab.classList.toggle('show',a.length>0);
    if(!a.length){ panel.classList.remove('open');
      listEl.innerHTML='<div class="enq-empty" data-en="No items yet — add products from the list below." data-hi="अभी कोई आइटम नहीं — नीचे लिस्ट से प्रोडक्ट जोड़ें।">No items yet.</div>';
    } else {
      listEl.innerHTML=a.map(function(n){return '<div class="enq-item"><span>'+esc(n)+'</span><button data-rm="'+encodeURIComponent(n)+'" aria-label="Remove">&times;</button></div>';}).join('');
    }
    var txt='*Enquiry — Krishna Metal & Tubes*\nPlease share best rate & availability for:\n'+a.map(function(n,i){return (i+1)+'. '+n;}).join('\n');
    sendEl.href='https://wa.me/'+PHONE+'?text='+encodeURIComponent(txt);
    document.querySelectorAll('[data-enq]').forEach(function(b){ b.classList.toggle('added',a.indexOf(b.getAttribute('data-enq'))>=0); });
    if(window.KMT_applyLang)window.KMT_applyLang();
  }
  fab.addEventListener('click',function(){ panel.classList.toggle('open'); });
  panel.querySelector('.close').addEventListener('click',function(){ panel.classList.remove('open'); });
  panel.querySelector('.enq-clear').addEventListener('click',function(){ save([]); });
  listEl.addEventListener('click',function(e){ var b=e.target.closest('[data-rm]'); if(b)save(get().filter(function(x){return x!==decodeURIComponent(b.getAttribute('data-rm'))})); });
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-enq]'); if(!b)return;
    e.preventDefault();
    var n=b.getAttribute('data-enq'), a=get();
    if(a.indexOf(n)>=0)save(a.filter(function(x){return x!==n})); else{a.push(n);save(a);}
  });
  window.KMT_enqRender=render;
  render();
})();

/* ---------- PRODUCTS: search + filter + inject actions ---------- */
(function(){
  var filter=document.getElementById('prodFilter'); if(!filter)return;
  var cats=[].slice.call(document.querySelectorAll('.pcat'));
  var search=document.getElementById('prodSearch');
  var chips=[].slice.call(filter.querySelectorAll('.pf-chip'));
  var countEl=document.getElementById('pfCount');
  var empty=document.getElementById('pfEmpty');
  var PHONE='919300002940';

  cats.forEach(function(sec){
    var copy=sec.querySelector('.pcat-copy'); if(!copy||copy.querySelector('.pcat-actions'))return;
    var h2=copy.querySelector('h2'); var name=h2?h2.textContent.trim():'';
    var txt='*Enquiry — Krishna Metal & Tubes*\nProduct: '+name+'\nPlease share best rate & availability.';
    var wrap=document.createElement('div'); wrap.className='pcat-actions';
    wrap.innerHTML='<button class="btn btn-ghost pcat-add" data-enq="'+name.replace(/"/g,'&quot;')+'"><span data-en="+ Add to Enquiry" data-hi="+ एन्क्वायरी में जोड़ें">+ Add to Enquiry</span></button>'+
      '<a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/'+PHONE+'?text='+encodeURIComponent(txt)+'"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5l-.7 1c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.4.3.1.1.1.5-.1 1.1Z"/></svg><span data-en="Enquire" data-hi="पूछताछ">Enquire</span></a>';
    copy.appendChild(wrap);
  });

  function apply(){
    var q=(search&&search.value||'').trim().toLowerCase();
    var active=filter.querySelector('.pf-chip.on'); var cat=active?active.getAttribute('data-filter'):'all';
    var shown=0;
    cats.forEach(function(sec){
      var okCat=cat==='all'||sec.id===cat;
      var okQ=!q||sec.textContent.toLowerCase().indexOf(q)>=0;
      var show=okCat&&okQ;
      sec.classList.toggle('hide',!show);
      if(show)shown++;
    });
    if(countEl)countEl.textContent=shown+' / '+cats.length;
    if(empty)empty.classList.toggle('show',shown===0);
  }
  if(search)search.addEventListener('input',apply);
  chips.forEach(function(c){ c.addEventListener('click',function(){ chips.forEach(function(x){x.classList.remove('on')}); c.classList.add('on'); apply(); }); });
  apply();
  var pc=document.getElementById('printCat'); if(pc)pc.addEventListener('click',function(){window.print();});
  if(window.KMT_applyLang)window.KMT_applyLang();
  if(window.KMT_enqRender)window.KMT_enqRender();
})();

/* ---------- TESTIMONIALS (real quotes only; empty => hidden) ---------- */
(function(){
  var grid=document.getElementById('tstGrid'); if(!grid)return;
  /* Illustrative demo testimonials (industry + role only — no real names/companies).
     Replace with genuine client quotes before a real launch. */
  var TESTIMONIALS=[
    { quote_en:"Consistent quality with genuine mill test certificates on every dispatch. Their ready stock has bailed us out during urgent shutdowns more than once.",
      quote_hi:"हर डिस्पैच के साथ भरोसेमंद क्वालिटी और असली मिल टेस्ट सर्टिफिकेट। इनके रेडी स्टॉक ने कई बार अर्जेंट शटडाउन में हमें बचाया है।",
      name:"Cement Plant", role_en:"Procurement Head · Chhattisgarh", role_hi:"प्रोक्योरमेंट हेड · छत्तीसगढ़" },
    { quote_en:"SS 316L pipes and flanges delivered right on schedule for our project — correct grades, full documentation and competitive rates.",
      quote_hi:"हमारे प्रोजेक्ट के लिए SS 316L पाइप और फ्लैंज बिल्कुल समय पर मिले — सही ग्रेड, पूरी डॉक्यूमेंटेशन और बेहतरीन रेट।",
      name:"Fertilizer Plant", role_en:"Project Engineer · Central India", role_hi:"प्रोजेक्ट इंजीनियर · मध्य भारत" },
    { quote_en:"Dependable for both bulk project supply and small maintenance orders. Quick response on WhatsApp and honest, transparent pricing.",
      quote_hi:"बल्क प्रोजेक्ट सप्लाई और छोटे मेंटेनेंस ऑर्डर, दोनों के लिए भरोसेमंद। व्हाट्सएप पर तुरंत जवाब और ईमानदार, पारदर्शी प्राइसिंग।",
      name:"Sugar Mill", role_en:"Maintenance In-charge · Maharashtra", role_hi:"मेंटेनेंस इंचार्ज · महाराष्ट्र" }
  ];
  if(!TESTIMONIALS.length){grid.hidden=true;return;}
  grid.hidden=false;
  if(!grid.previousElementSibling||!grid.previousElementSibling.classList.contains('tst-head')){
    var head=document.createElement('div'); head.className='tst-head reveal';
    head.innerHTML='<span class="eyebrow" data-en="WHAT CLIENTS SAY" data-hi="ग्राहक क्या कहते हैं">WHAT CLIENTS SAY</span>'+
      '<h3 data-en="Feedback from the plants we supply." data-hi="जिन प्लांट्स को हम सप्लाई करते हैं, उनकी राय।">Feedback from the plants we supply.</h3>';
    grid.parentNode.insertBefore(head,grid); head.classList.add('in');
  }
  grid.innerHTML=TESTIMONIALS.map(function(t,i){
    var init=((t.name||'?').trim().charAt(0)||'?').toUpperCase();
    return '<figure class="tst reveal'+(i%4?' d'+(i%4):'')+'">'+
      '<blockquote class="q" data-en="'+t.quote_en+'" data-hi="'+(t.quote_hi||t.quote_en)+'">'+t.quote_en+'</blockquote>'+
      '<figcaption class="who"><span class="av">'+init+'</span><span><b>'+t.name+'</b><br>'+
      '<span data-en="'+t.role_en+'" data-hi="'+(t.role_hi||t.role_en)+'">'+t.role_en+'</span></span></figcaption></figure>';
  }).join('');
  grid.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
  if(window.KMT_applyLang)window.KMT_applyLang();
})();

/* ---------- IMAGE SKELETON: clear shimmer once loaded ---------- */
(function(){
  document.querySelectorAll('.cat-img,.gal,.pcat-hero,.thumbs .th,.story-media').forEach(function(box){
    var img=box.querySelector('img');
    if(!img){box.classList.add('imgok');return;}
    function done(){box.classList.add('imgok');}
    if(img.complete&&img.naturalWidth)done();
    else{img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});}
  });
})();
})();
