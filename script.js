const SHARE_URL = "https://share.google/CxJR0KYYtNoNKd8Xs"; // رابطك النهائي
const endWrap = document.getElementById('end');
const visitorsEl = document.getElementById('visitors');
const shareOnlyBtn = document.getElementById('shareOnly');

async function showEnd(){
  // أخفِ الصفحة الرئيسية
  document.getElementById('app').style.display = 'none';

  // أظهر صفحة النهاية بوضوح
  endWrap.style.display = 'block';
  endWrap.classList.add('visible');

  // عداد زوار ثابت + بديل محلي عند الفشل
  const NS="tasbih-app", KEY="main-page-visitors";
  try{
    const r = await fetch(`https://api.countapi.xyz/hit/${NS}/${KEY}`, {cache:'no-store'});
    const d = await r.json();
    if(typeof d.value === 'number'){ visitorsEl.textContent = d.value.toLocaleString('ar-EG'); return; }
    throw 0;
  }catch(e){
    try{
      const k="local_visitors_once"; let v=+localStorage.getItem(k)||0;
      if(!localStorage.getItem('visited_once_flag')){ v++; localStorage.setItem(k,v); localStorage.setItem('visited_once_flag','1'); }
      visitorsEl.textContent = "≈ " + v.toLocaleString('ar-EG');
    }catch{ visitorsEl.textContent = "—"; }
  }
}

// مشاركة واتساب بالرابط فقط
function shareWhatsApp(){
  window.open("https://wa.me/?text=" + encodeURIComponent(SHARE_URL), "_blank", "noopener");
}
shareOnlyBtn.addEventListener('click', shareWhatsApp);
