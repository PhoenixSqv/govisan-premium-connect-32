document.addEventListener('DOMContentLoaded',function(){
  const buttons=document.querySelectorAll('.filter-btn');
  const items=document.querySelectorAll('.story-item');
  buttons.forEach(btn=>{
    btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.getAttribute('data-filter');
      items.forEach(it=>{
        if(f==='all'||it.classList.contains(f)){ it.style.display=''; }
        else{ it.style.display='none'; }
      });
    });
  });
});
