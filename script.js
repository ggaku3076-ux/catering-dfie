const CONFIG={whatsappNumber:'628819636431'};
const wa=(msg)=>`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
document.querySelectorAll('.js-wa').forEach(a=>{a.href=wa(a.dataset.message||"halo kak, saya mau tanya D'fie Catering");a.target='_blank';a.rel='noopener noreferrer'});
const toggle=document.querySelector('[data-nav-toggle]');const menu=document.querySelector('[data-nav-menu]');if(toggle&&menu){toggle.addEventListener('click',()=>{menu.classList.toggle('open')});menu.addEventListener('click',e=>{if(e.target.closest('a'))menu.classList.remove('open')})}
document.querySelectorAll('.faq-item').forEach(item=>{const btn=item.querySelector('.faq-q');if(btn)btn.addEventListener('click',()=>item.classList.toggle('active'))});
const form=document.querySelector('[data-order-form]');if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`halo kak, saya ${d.get('nama')||'customer'}. saya mau tanya ${d.get('kebutuhan')||'catering'} D'fie. catatan: ${d.get('catatan')||'-'}`;window.open(wa(msg),'_blank','noopener,noreferrer')})}
