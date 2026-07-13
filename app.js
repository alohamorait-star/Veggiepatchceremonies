const packages=[
{id:'seed',icon:'🌱',name:'The Seed Packet',tag:'Simple, intimate, meaningful',desc:'Elopements and intimate ceremonies of up to 10 guests. Includes a planning call, a ready-to-personalize script, ceremony performance, and license signing and filing.',price:195,priceLabel:'$150–$195',detail:'Choose our $150 community rate or $195 standard rate on the honor system.'},
{id:'rapid',icon:'⚡',name:'Rapid Plant Food',tag:'Short notice? We get it',desc:'For spur-of-the-moment ceremonies, elopements, and weddings planned fewer than 30 days out.',price:225,priceLabel:'$225',detail:'Includes a quick-turn script, planning call, ceremony performance, and prompt license filing.'},
{id:'greenhouse',icon:'🏡',name:'The Green House',tag:'Our classic package',desc:'A full single-day ceremony package with planning, script development, revisions, and day-of officiating.',price:350,priceLabel:'$350',detail:'A balanced choice for traditional or personalized ceremonies of most sizes.'},
{id:'bloom',icon:'💐',name:'The Full Bloom',tag:'Fully custom',desc:'A custom-written ceremony shaped around your story, with unlimited revisions, vow guidance, and rehearsal attendance.',price:550,priceLabel:'$550',detail:'Ideal for couples who want a ceremony written completely from scratch.'},
{id:'estate',icon:'⛰️',name:'The Estate Garden',tag:'Peak Saturdays & destination venues',desc:'White-glove coverage for peak-season dates and destination venues throughout the High Country.',price:850,priceLabel:'From $850',detail:'Includes custom ceremony, rehearsal, vow coaching, timeline coordination, early arrival, and next-day license delivery.'},
{id:'prison',icon:'🤝',name:'The Unity Ceremony',tag:'Correctional facility weddings',desc:'Compassionate, professional officiant support for couples marrying inside correctional facilities, with extra care for approvals, security procedures, scheduling, and paperwork.',price:350,priceLabel:'$350–$650',note:'Specialized service',detail:'Correctional-facility weddings often require additional coordination, advance approvals, identity verification, restricted scheduling, security processing, and possible on-site waiting time. This package includes an initial consultation, facility-requirement review, coordination with approved contacts, a personalized ceremony, marriage-license signing, and filing guidance. Final pricing depends on the facility, travel, scheduling complexity, and required administrative work.'},
{id:'military',icon:'🎖️',name:'The Honor Ceremony',tag:'Military weddings',desc:'Flexible, meaningful ceremonies for active-duty, Reserve, National Guard, veteran, and military-family couples navigating leave, deployment, or changing schedules.',price:250,priceLabel:'$250–$500',note:'Flexible specialty rate',detail:'Military life can require fast decisions and flexible plans. This service includes a consultation, personalized ceremony, schedule flexibility when possible, military traditions if desired, marriage-license signing, and filing guidance. Final pricing depends on travel, installation access, timing, ceremony customization, and short-notice needs. Active-duty couples may ask about our 10% military courtesy discount.'}
];
const addons=[
{id:'rehearsal',kind:'addon',icon:'📋',name:'Rehearsal Attendance',tag:'Confident and coordinated',price:75,desc:'Help everyone feel prepared before the big day with calm, practical ceremony guidance.',detail:'We attend your rehearsal to guide the wedding party through entrances, positioning, transitions, and the ceremony flow. This gives everyone a chance to ask questions and feel comfortable before the wedding day.',includes:['Up to 60 minutes on site','Processional and recessional guidance','Ceremony positioning and cue review','Coordination with your planner or venue contact']},
{id:'vows',kind:'addon',icon:'🪶',name:'Vow-Writing Session',tag:'Find the perfect words',price:100,desc:'A private writing session to help you create sincere vows that sound naturally like you.',detail:'We help you turn your memories, promises, and personality into heartfelt vows without making them feel stiff or copied. You can write together or receive individual guidance while keeping the final words private.',includes:['One guided writing session','Prompts tailored to your relationship','Tone and length guidance','One follow-up review by email']},
{id:'notary',kind:'addon',icon:'✒️',name:'Notary Services',tag:'Convenient document support',price:25,desc:'Wedding-related notarization handled conveniently by a member of our team.',detail:'Add notary support for eligible wedding-related documents before or after your ceremony. Document requirements vary, so we will confirm eligibility during your consultation.',includes:['One standard notarial act','Identity and document review','Scheduling coordinated with your ceremony','Additional documents quoted separately']},
{id:'reiki',kind:'addon',icon:'🕊️',name:'Reiki Grounding',tag:'Calm before the ceremony',price:90,desc:'A gentle pre-ceremony grounding session to ease nerves and help you feel fully present.',detail:'Our Reiki practitioner provides a quiet, nonreligious grounding session designed to encourage calm, centered breathing, and a peaceful transition into your ceremony.',includes:['Private pre-ceremony session','Approximately 30 minutes','Breathing and grounding guidance','Available for one partner or the couple']},
{id:'license',kind:'addon',icon:'🚗',name:'License Delivery',tag:'We handle the paperwork',price:50,desc:'We personally return your signed marriage license so you can focus on celebrating.',detail:'After the ceremony, we review the completed license and hand-deliver it to the appropriate Register of Deeds office on the next available business day within our normal service area.',includes:['Post-ceremony license review','Secure document handling','Hand-delivery to the proper office','Delivery confirmation by email']}
];
const cart=new Map();let active=null;let checkoutSummary='';
const money=n=>'$'+n.toFixed(2);
serviceList.innerHTML=packages.map(p=>`<article class="service"><div class="svc-icon">${p.icon}</div><div><h3>${p.name} <span class="tag">${p.tag}</span></h3><p>${p.desc}</p></div><div class="price">${p.priceLabel}<small>${p.note || (p.id==='seed'?'Sliding scale':'')}</small></div><div class="svc-actions"><button class="btn" data-add="${p.id}">Book This</button><button class="learn" data-more="${p.id}">Learn more</button></div></article>`).join('');
addonGrid.innerHTML=addons.map(a=>`<article class="addon"><span class="ico" aria-hidden="true">${a.icon}</span><div class="addon-tag">${a.tag}</div><h3>${a.name}</h3><p class="addon-desc">${a.desc}</p><div class="addon-foot"><strong>${money(a.price)}</strong><div class="addon-actions"><button class="addon-more" data-addon-more="${a.id}">Learn More</button><button class="addon-add" data-addon-add="${a.id}">Add to Wheelbarrow</button></div></div></article>`).join('');
function addItem(key,name,price){let x=cart.get(key);if(x)x.qty++;else cart.set(key,{name,price,qty:1});renderCart();openDrawer()}
function renderCart(){let count=0,totalAmt=0;drawerBody.innerHTML=cart.size?[...cart].map(([k,i])=>{count+=i.qty;totalAmt+=i.price*i.qty;return `<div class="cart-item"><div><b>${i.name}</b><br><small>Quantity: ${i.qty}</small></div><div><b>${money(i.price*i.qty)}</b><br><button class="learn" data-remove="${k}">remove</button></div></div>`}).join(''):'<p style="padding:30px 0;color:var(--muted)">Your wheelbarrow is empty. Pick a package or add-on from the patch!</p>';badge.textContent=count;total.textContent=money(totalAmt);checkoutBtn.disabled=cart.size===0;checkoutBtn.style.opacity=cart.size===0?'.55':'1';checkoutBtn.style.cursor=cart.size===0?'not-allowed':'pointer'}
function buildCheckoutSummary(){let subtotal=0;const lines=[...cart.values()].map(i=>{const line=i.price*i.qty;subtotal+=line;return `• ${i.name} — ${i.qty} × ${money(i.price)} = ${money(line)}`});return `Selected services:
${lines.join('\n')}

Estimated subtotal: ${money(subtotal)}

Please confirm availability, final pricing, travel fees, and deposit requirements.`}
function openDrawer(){drawer.classList.add('open');veil.classList.add('open')}function closeCart(){drawer.classList.remove('open');veil.classList.remove('open')}cartFab.onclick=openDrawer;closeDrawer.onclick=closeCart;veil.onclick=closeCart;
drawerBody.onclick=e=>{let k=e.target.dataset.remove;if(k){cart.delete(k);renderCart()}};
checkoutBtn.onclick=()=>{if(!cart.size)return;checkoutSummary=buildCheckoutSummary();message.value=`Hi! We'd like to schedule a consultation for the following:

${checkoutSummary}

Preferred wedding date(s): 
Venue/location: 
Questions or notes: `;closeCart();document.querySelector('#contact').scrollIntoView({behavior:'smooth'});setTimeout(()=>first.focus(),650)};
serviceList.onclick=e=>{const add=e.target.dataset.add,more=e.target.dataset.more;if(add){let p=packages.find(x=>x.id===add);addItem(p.id,p.name,p.price)}if(more){active=packages.find(x=>x.id===more);modalTitle.textContent=active.name;modalBody.innerHTML=`<p><b>${active.tag}</b></p><p>${active.desc}</p><p>${active.detail}</p><p class="price" style="text-align:left">${active.priceLabel}</p>`;modalVeil.classList.add('open')}};
addonGrid.onclick=e=>{const add=e.target.closest('[data-addon-add]'),more=e.target.closest('[data-addon-more]');if(add){const a=addons.find(x=>x.id===add.dataset.addonAdd);addItem('addon:'+a.id,a.name,a.price)}if(more){active=addons.find(x=>x.id===more.dataset.addonMore);modalTitle.textContent=active.name;modalBody.innerHTML=`<p><b>${active.tag}</b></p><p>${active.desc}</p><p>${active.detail}</p><p><b>Includes:</b></p><ul style="margin:0 0 18px 20px;color:#4e5a4b">${active.includes.map(item=>`<li style="margin-bottom:6px">${item}</li>`).join('')}</ul><p class="price" style="text-align:left">${money(active.price)}</p>`;modalVeil.classList.add('open')}};
modalX.onclick=()=>modalVeil.classList.remove('open');modalVeil.onclick=e=>{if(e.target===modalVeil)modalVeil.classList.remove('open')};modalAdd.onclick=()=>{addItem(active.kind==='addon'?'addon:'+active.id:active.id,active.name,active.price);modalVeil.classList.remove('open')};
document.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>{inquiryType.value=b.dataset.book;message.value=`Hi! We'd like to book ${b.dataset.book}. Our preferred dates are: `;document.querySelector('#contact').scrollIntoView({behavior:'smooth'});setTimeout(()=>message.focus(),500)});
let bookingSubmissionPending=false;

function currentWheelbarrowSummary(){
  if(!cart.size)return 'No services selected yet.';
  return [...cart.values()]
    .map(item=>`${item.name} × ${item.qty} — ${money(item.price*item.qty)}`)
    .join('\n');
}

function currentWheelbarrowTotal(){
  let amount=0;
  cart.forEach(item=>amount+=item.price*item.qty);
  return money(amount);
}

contactForm.onsubmit=e=>{
  e.preventDefault();
  if(!contactForm.checkValidity())return contactForm.reportValidity();

  selectedServices.value=currentWheelbarrowSummary();
  estimatedSubtotal.value=currentWheelbarrowTotal();

  const status=document.getElementById('bookingStatus');
  const submitButton=document.getElementById('submitInquiryBtn');

  bookingSubmissionPending=true;
  submitButton.disabled=true;
  submitButton.textContent='Sending…';
  status.className='booking-status sending show';
  status.textContent='Sending your wedding inquiry securely…';

  HTMLFormElement.prototype.submit.call(contactForm);
};

bookingResponseFrame.addEventListener('load',()=>{
  if(!bookingSubmissionPending)return;
  bookingSubmissionPending=false;

  const status=document.getElementById('bookingStatus');
  const submitButton=document.getElementById('submitInquiryBtn');

  status.className='booking-status success show';
  status.innerHTML='<b>Your inquiry has been planted!</b><br>Your details were sent to Veggie Patch Ceremonies. A confirmation should also arrive at the email address you provided.';
  submitButton.disabled=false;
  submitButton.textContent='Send Wedding Inquiry';
  contactForm.reset();
  inquiryType.value='General wedding inquiry';
  checkoutSummary='';
});



const galleryModal=document.getElementById('galleryModal');
const galleryModalCard=galleryModal.querySelector('.gallery-modal-card');
const galleryModalImage=document.getElementById('galleryModalImage');
const galleryModalTitle=document.getElementById('galleryModalTitle');
const galleryModalCaption=document.getElementById('galleryModalCaption');
const galleryGrid=document.getElementById('galleryGrid');
const galleryClose=document.getElementById('galleryClose');
const galleryPrev=document.getElementById('galleryPrev');
const galleryNext=document.getElementById('galleryNext');
const galleryCounter=document.getElementById('galleryCounter');
const galleryThumbs=document.getElementById('galleryThumbs');
const mountainPhotos=['site-image-02.jpg','site-image-04.jpg','site-image-05.jpg'];
const gardenPhotos=['site-image-03.jpg'];
let galleryReturnFocus=null;
let activeGalleryPhotos=[];
let activeGalleryIndex=0;

function renderGallerySlide(){
  if(!activeGalleryPhotos.length)return;
  let img=galleryModalImage.querySelector('img.gallery-expanded-photo');
  if(!img){
    img=document.createElement('img');
    img.className='gallery-expanded-photo';
    galleryModalImage.prepend(img);
  }
  img.src=activeGalleryPhotos[activeGalleryIndex];
  img.alt=`Wedding gallery photo ${activeGalleryIndex+1} of ${activeGalleryPhotos.length}`;
  galleryCounter.textContent=`${activeGalleryIndex+1} / ${activeGalleryPhotos.length}`;
  [...galleryThumbs.children].forEach((thumb,i)=>thumb.classList.toggle('active',i===activeGalleryIndex));
}

function showGalleryControls(show){
  galleryPrev.style.display=show?'block':'none';
  galleryNext.style.display=show?'block':'none';
  galleryCounter.style.display=show?'block':'none';
  galleryThumbs.classList.toggle('show',show);
  galleryModalCard.classList.toggle('has-slideshow',show);
}

function openGallery(card){
  const title=card.querySelector('.gallery-caption h3');
  const caption=card.querySelector('.gallery-caption p');
  galleryReturnFocus=card;
  galleryModalTitle.textContent=title ? title.textContent : 'Wedding Gallery';
  galleryModalCaption.textContent=caption ? caption.textContent : '';

  const existing=galleryModalImage.querySelector('img.gallery-expanded-photo, svg');
  if(existing)existing.remove();
  galleryThumbs.replaceChildren();

  const gallerySets={
    mountain:{
      photos:mountainPhotos,
      label:"mountain elopement at Wiseman's View"
    },
    garden:{
      photos:gardenPhotos,
      label:"garden wedding ceremony"
    }
  };
  const selectedSet=gallerySets[card.dataset.gallerySet];

  if(selectedSet){
    activeGalleryPhotos=selectedSet.photos;
    activeGalleryIndex=0;
    activeGalleryPhotos.forEach((src,i)=>{
      const thumb=document.createElement('button');
      thumb.type='button';
      thumb.className='gallery-thumb'+(i===0?' active':'');
      thumb.setAttribute('aria-label',`View ${selectedSet.label} photo ${i+1}`);
      const image=document.createElement('img');
      image.src=src;
      image.alt='';
      thumb.appendChild(image);
      thumb.addEventListener('click',()=>{activeGalleryIndex=i;renderGallerySlide();});
      galleryThumbs.appendChild(thumb);
    });
    showGalleryControls(activeGalleryPhotos.length > 1);
    renderGallerySlide();
  }else{
    activeGalleryPhotos=[];
    showGalleryControls(false);
    const sourceSvg=card.querySelector('.gallery-image svg');
    if(sourceSvg)galleryModalImage.prepend(sourceSvg.cloneNode(true));
  }

  galleryModal.classList.add('open');
  galleryModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  galleryClose.focus();
}

function changeGallerySlide(direction){
  if(!activeGalleryPhotos.length)return;
  activeGalleryIndex=(activeGalleryIndex+direction+activeGalleryPhotos.length)%activeGalleryPhotos.length;
  renderGallerySlide();
}

function closeGallery(){
  if(!galleryModal.classList.contains('open'))return;
  galleryModal.classList.remove('open');
  galleryModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  if(galleryReturnFocus)galleryReturnFocus.focus();
}

galleryGrid.addEventListener('click',e=>{
  const card=e.target.closest('.gallery-card');
  if(card)openGallery(card);
});
galleryPrev.addEventListener('click',()=>changeGallerySlide(-1));
galleryNext.addEventListener('click',()=>changeGallerySlide(1));
galleryClose.addEventListener('click',closeGallery);
galleryModal.addEventListener('click',e=>{
  if(e.target===galleryModal)closeGallery();
});
document.addEventListener('keydown',e=>{
  if(!galleryModal.classList.contains('open'))return;
  if(e.key==='Escape')closeGallery();
  if(e.key==='ArrowLeft')changeGallerySlide(-1);
  if(e.key==='ArrowRight')changeGallerySlide(1);
});

menu.onclick=()=>navlinks.classList.toggle('open');document.querySelectorAll('.navlinks a').forEach(a=>a.onclick=()=>navlinks.classList.remove('open'));renderCart();
