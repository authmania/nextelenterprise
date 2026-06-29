const navToggle=document.querySelector('.nav-toggle');const navLinks=document.querySelector('.nav-links');if(navToggle){navToggle.addEventListener('click',()=>navLinks.classList.toggle('open'))}function showToast(message){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3500)}
function startPayment(courseSlug, courseTitle, amount, publicKey){const name=document.getElementById('buyer_name')?.value?.trim();const email=document.getElementById('buyer_email')?.value?.trim();if(!name||!email){showToast('Please enter your name and email first.');return}window.location.href='https://checkout.korapay.com/pay/MPcARPg1fNzLMbG';}
(function(){
  const images=document.querySelectorAll('.js-lightbox');
  if(!images.length)return;
  const modal=document.createElement('div');
  modal.className='lightbox-modal';
  modal.innerHTML='<button class="lightbox-close" type="button" aria-label="Close image">&times;</button><img alt=""><div class="lightbox-caption"></div>';
  document.body.appendChild(modal);
  const modalImg=modal.querySelector('img');
  const caption=modal.querySelector('.lightbox-caption');
  function close(){modal.classList.remove('open');document.body.style.overflow='';}
  images.forEach(img=>{
    img.addEventListener('click',()=>{
      modalImg.src=img.currentSrc||img.src;
      modalImg.alt=img.alt||'Preview image';
      caption.textContent=img.alt||'';
      modal.classList.add('open');
      document.body.style.overflow='hidden';
    });
  });
  modal.querySelector('.lightbox-close').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();
(function(){
  const track=document.getElementById('testimonialTrack');
  if(!track)return;
  const slides=Array.from(track.children);
  const dotsWrap=document.getElementById('tDots');
  const prevBtn=document.getElementById('tPrev');
  const nextBtn=document.getElementById('tNext');
  let perView=3;
  let index=0;
  let timer;
  function getPerView(){
    if(window.innerWidth<=560)return 1;
    if(window.innerWidth<=900)return 2;
    return 3;
  }
  function maxIndex(){return Math.max(0,slides.length-perView)}
  function renderDots(){
    dotsWrap.innerHTML='';
    const count=maxIndex()+1;
    for(let i=0;i<count;i++){
      const dot=document.createElement('button');
      dot.className='t-dot'+(i===index?' active':'');
      dot.setAttribute('aria-label','Go to slide '+(i+1));
      dot.addEventListener('click',()=>{index=i;update()});
      dotsWrap.appendChild(dot);
    }
  }
  function update(){
    index=Math.max(0,Math.min(index,maxIndex()));
    const slideWidth=slides[0].getBoundingClientRect().width;
    track.style.transform='translateX(-'+(index*slideWidth)+'px)';
    Array.from(dotsWrap.children).forEach((d,i)=>d.classList.toggle('active',i===index));
  }
  function next(){index=index>=maxIndex()?0:index+1;update()}
  function prev(){index=index<=0?maxIndex():index-1;update()}
  function restartAutoplay(){clearInterval(timer);timer=setInterval(next,4500)}
  nextBtn.addEventListener('click',()=>{next();restartAutoplay()});
  prevBtn.addEventListener('click',()=>{prev();restartAutoplay()});
  window.addEventListener('resize',()=>{
    const newPerView=getPerView();
    if(newPerView!==perView){perView=newPerView;index=0;renderDots()}
    update();
  });
  perView=getPerView();
  renderDots();
  update();
  restartAutoplay();
})();
