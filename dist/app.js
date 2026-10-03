'use strict';
const business={phone:'50664402122'};
const whatsapp=message=>`https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const navToggle=document.querySelector('.nav-toggle');
const mobileNav=document.getElementById('mobile-nav');
function closeNav(){navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','Abrir menú');mobileNav.hidden=true;}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeNav));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeNav();navToggle.focus();}});
window.matchMedia('(min-width: 761px)').addEventListener('change',event=>{if(event.matches)closeNav();});
const consultations={
 "Nutrición": {
  "label": "Nutrición y proteína",
  "title": "Tu nutrición, a tu manera.",
  "description": "Explorá batidos nutricionales, bebidas y complementos de proteína en polvo, mezclas para bebidas y muffins. Consultá sabores, presentaciones e información de etiqueta.",
  "message": "Hola Kattia, me interesan los productos de nutrición y proteína para preparar en casa. ¿Podés compartir las opciones, sabores, presentaciones y disponibilidad?",
  "note": "Confirmá disponibilidad, ingredientes y condiciones de compra del producto elegido."
 },
 "Tés y bebidas": {
  "label": "Tés y bebidas",
  "title": "Descubrí nuevas opciones para tu rutina.",
  "description": "Conocé tés concentrados de hierbas, opciones para la relajación y concentrados de sábila. Preguntá por sabores como original, limón, frambuesa, chai, mango y mandarina, según el producto.",
  "message": "Hola Kattia, me interesan los tés y bebidas, incluidas las opciones con sábila. ¿Qué sabores y presentaciones están disponibles, y cuáles contienen cafeína?",
  "note": "Los ingredientes y la cafeína varían por producto. Revisá su etiqueta."
 },
 "Suplementos": {
  "label": "Vitaminas y suplementos",
  "title": "Conocé los complementos disponibles.",
  "description": "El catálogo incluye multivitamínicos, fibra, colágeno, calcio, omega-3 y otros complementos de nutrición específica. Consultá composición, presentación e instrucciones de etiqueta.",
  "message": "Hola Kattia, quisiera conocer las vitaminas y suplementos disponibles, como multivitamínicos, fibra, colágeno, calcio u omega-3. ¿Podés compartir el catálogo y las etiquetas?",
  "note": "La elección depende del producto y tus necesidades. No son tratamientos para enfermedades."
 },
 "Vida activa": {
  "label": "Deporte y vida activa",
  "title": "Opciones que acompañan tu movimiento.",
  "description": "Explorá bebidas para hidratación y energía, mezclas de proteína para después del ejercicio y barras proteicas. Consultá los ingredientes y la presentación de cada opción.",
  "message": "Hola Kattia, me interesan los productos para deporte y vida activa: hidratación, energía, proteína para después del ejercicio y barras proteicas. ¿Qué opciones tenés disponibles?",
  "note": "Revisá porción, ingredientes, cafeína e instrucciones de cada producto."
 },
 "Cuidado personal": {
  "label": "Cuidado personal",
  "title": "Una rutina de cuidado para vos.",
  "description": "Conocé limpiador facial, tónico, sérum, exfoliante, mascarilla y crema de día con FPS 30, además de gel corporal y crema para manos y cuerpo con sábila.",
  "message": "Hola Kattia, me interesa la línea de cuidado personal para piel y cuerpo. ¿Podés compartir las opciones disponibles, presentaciones e indicaciones de uso?",
  "note": "Confirmá el producto adecuado para tu rutina y sus instrucciones de uso."
 },
 "Emprender": {
  "label": "Emprender",
  "title": "Explorá una nueva posibilidad.",
  "description": "Conocé cómo funciona la distribución independiente de estas líneas: primeros pasos, costos, requisitos, formación y condiciones antes de tomar una decisión.",
  "message": "Hola Kattia, me interesa conocer el emprendimiento de distribución independiente. Quisiera información sobre costos, requisitos, formación, condiciones y resultados típicos antes de decidir.",
  "note": "Emprender implica costos y dedicación. Los ingresos varían y no están garantizados."
 }
};
document.querySelectorAll('.choice').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('.choice').forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',String(active));});
 const item=consultations[button.dataset.choice];
 document.getElementById('consultation-title').textContent=item.title;document.getElementById('consultation-description').textContent=item.description;document.getElementById('consultation-note').textContent=item.note;
 document.getElementById('order-message').textContent=`“${item.message}”`;document.getElementById('order-link').href=`https://wa.me/50689907897?text=${encodeURIComponent(item.message)}`;
}));
document.getElementById('year').textContent=new Date().getFullYear();
if(!reduced.matches&&'IntersectionObserver' in window){
 document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
 reduced.addEventListener('change',event=>{if(event.matches){document.body.classList.remove('motion-ready');observer.disconnect();}});
}
let framePending=false;const progress=document.querySelector('.scroll-progress');const photo=document.querySelector('.hero-image');
function updateScroll(){const maximum=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${maximum>0?window.scrollY/maximum*100:0}%`;if(!reduced.matches&&window.scrollY<1000)photo.style.transform=`translateY(${Math.min(window.scrollY*.07,55)}px)`;framePending=false;}
window.addEventListener('scroll',()=>{if(!framePending){framePending=true;requestAnimationFrame(updateScroll);}},{passive:true});updateScroll();

// Native dialog owns focus containment, Escape handling and focus restoration.
const productDialog=document.getElementById('product-dialog');
const state={category:'batidos',group:0,variant:0,options:[]};
const formatNumber=value=>new Intl.NumberFormat('es-CR',{maximumFractionDigits:1}).format(value);
const el=id=>document.getElementById(id);
const asset=variant=>variant.photo||`assets/products/${variant.image}.webp`;
const selected=()=>{const category=CATALOG[state.category];const group=category.groups[state.group];return {category,group,variant:group.variants[state.variant]};};
let dialogClosing;
function openCollection(key){
 clearTimeout(dialogClosing);productDialog.classList.remove('closing');
 state.category=key;state.group=0;state.variant=key==='bowls'?2:0;state.options=[];
 renderCatalog();if(!productDialog.open){productDialog.showModal();document.body.classList.add('catalog-open');productDialog.querySelector('.dialog-close').focus({preventScroll:true});}
 productDialog.querySelector('.dialog-scroll').scrollTop=0;
}
function closeCollection(){
 if(reduced.matches){productDialog.close();return;}
 productDialog.classList.add('closing');dialogClosing=setTimeout(()=>productDialog.close(),180);
}
productDialog.querySelector('.dialog-close').addEventListener('click',closeCollection);
productDialog.querySelector('.dialog-brand').addEventListener('click',event=>{event.preventDefault();closeCollection();});
productDialog.addEventListener('cancel',event=>{event.preventDefault();closeCollection();});
productDialog.addEventListener('close',()=>{document.body.classList.remove('catalog-open');productDialog.classList.remove('closing');});
productDialog.addEventListener('click',event=>{if(event.target===productDialog){const rect=productDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeCollection();}});
document.querySelectorAll('[data-collection]').forEach(button=>button.addEventListener('click',()=>openCollection(button.dataset.collection)));
document.querySelectorAll('[data-dialog-category]').forEach(button=>button.addEventListener('click',()=>openCollection(button.dataset.dialogCategory)));
function renderCatalog(){
 const {category,group}=selected();
 el('catalog-eyebrow').textContent=category.eyebrow;el('product-dialog-title').textContent=category.name;el('catalog-intro').textContent=category.intro;
 document.querySelectorAll('[data-dialog-category]').forEach(button=>{const active=button.dataset.dialogCategory===state.category;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));});
 const series=el('product-series');series.replaceChildren();
 category.groups.forEach((item,index)=>{const button=document.createElement('button');button.textContent=item.name;button.className=index===state.group?'selected':'';button.setAttribute('aria-pressed',String(index===state.group));button.addEventListener('click',()=>{state.group=index;state.variant=0;state.options=[];renderCatalog();series.querySelectorAll('button')[index]?.focus({preventScroll:true});});series.append(button);});
 renderProduct();
}
function renderProduct(){
 const {category,group,variant}=selected();
 el('product-line-name').textContent=group.name;el('selected-product-name').textContent=variant.name;
 el('product-description').textContent=`${variant.description} ${group.description}`;
 const tags=el('product-tags');tags.replaceChildren();[...(group.tags||[]),...(variant.tags||[])].forEach(tag=>{const label=document.createElement('span');label.textContent=tag;tags.append(label);});
 const values={...group,...variant};const macros=el('product-macros');macros.replaceChildren();
 const metrics=[['Proteína',values.protein,'g'],['Energía',values.calories,'kcal'],['Carbohidratos',values.carbs,'g'],['Fibra',values.fiber,'g']];
 metrics.forEach(([label,value,unit])=>{if(value!==undefined){const wrapper=document.createElement('div');const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');const number=document.createElement('strong');number.textContent=formatNumber(value);const suffix=document.createElement('span');suffix.textContent=unit;dd.append(number,suffix);wrapper.append(dt,dd);macros.append(wrapper);}});
 if(state.category!=='bowls'){const size=document.createElement('div');const dt=document.createElement('dt');dt.textContent='Tamaño';const dd=document.createElement('dd');dd.className='size-value';dd.textContent=values.size||'Consultá la porción';size.append(dt,dd);macros.append(size);}
 const nutrition=group.note||(metrics.some(([,value])=>value!==undefined)?'Valores publicados en nuestro menú. Los extras pueden modificar los valores.':'Consultanos la información nutricional de esta variante.');
 el('nutrition-note').textContent=`${nutrition} Preparación: ${category.prep}.`;
 const choices=el('product-variants');choices.replaceChildren();el('variant-count').textContent=`${group.variants.length} ${group.variants.length===1?'opción':'opciones'}`;
 group.variants.forEach((item,index)=>{const button=document.createElement('button');button.className=`variant-chip${index===state.variant?' selected':''}`;button.setAttribute('aria-pressed',String(index===state.variant));const image=document.createElement('img');image.src=item.thumbnail||asset(item);image.alt='';image.loading='lazy';image.decoding='async';const name=document.createElement('span');name.textContent=item.name;button.append(image,name);button.addEventListener('click',()=>{state.variant=index;renderProduct();const active=choices.querySelectorAll('button')[index];if(active)active.focus({preventScroll:true});});choices.append(button);});
 renderMedia();renderOptions();updateProductOrder();
}
function renderMedia(){
 const {group,variant}=selected();const media=el('product-media');media.replaceChildren();media.className=variant.photo?'real-photo':'menu-photo';
 const image=document.createElement('img');image.src=asset(variant);image.alt=variant.generated?`Imagen ilustrativa de ${variant.name} de Bindú`:variant.reference?`Presentación de referencia de ${group.name}`:`${variant.name} de Bindú`;image.decoding='async';image.className='product-main-image';media.append(image);
 el('media-note').textContent=variant.generated?'Imagen ilustrativa creada a partir del menú. La presentación real puede variar.':variant.photo?'Fotografía real de Bindú.':variant.reference?'Presentación de referencia de la línea. La combinación final depende de tu elección.':'Fotografía de nuestro menú.';
}
function renderOptions(){
 const {group,variant}=selected();const root=el('product-options');root.replaceChildren();
 if(variant.extraNote){const p=document.createElement('p');p.className='extra-note';p.textContent=variant.extraNote;root.append(p);}
 if(!group.options)return;
 const types={toppings:{heading:'Tu selección de toppings',note:'Incluye 3. Elegí hasta tres de la lista.',items:TOPPINGS,max:3},syrups:{heading:'Tu sirope',note:'Elegí 1 sirope incluido.',items:SYRUPS,max:1},boosts:{heading:'Potenciá tu batido',note:'Extras opcionales. Cada aporte se suma a la base.',items:BOOSTS.map(item=>item.name),max:4}};
 const config=types[group.options];const section=document.createElement('section');section.className='customization';const heading=document.createElement('h4');heading.textContent=config.heading;const note=document.createElement('p');note.className='options-note';note.textContent=config.note;const choices=document.createElement('div');choices.className=group.options==='boosts'?'option-choices boost-choices':'option-choices';
 config.items.forEach((item,index)=>{const button=document.createElement('button');button.className=state.options.includes(item)?'selected':'';button.setAttribute('aria-pressed',String(state.options.includes(item)));const name=document.createElement('span');name.textContent=item;button.append(name);if(group.options==='boosts'){const value=document.createElement('small');value.textContent=BOOSTS[index].note;button.append(value);}button.addEventListener('click',()=>{
  if(state.options.includes(item))state.options=state.options.filter(value=>value!==item);
  else if(config.max===1)state.options=[item];
  else if(state.options.length<config.max)state.options.push(item);
  else{el('options-status').textContent='Ya elegiste tres toppings. Quitá uno para elegir otro.';return;}
  renderOptions();updateProductOrder();root.querySelectorAll('.option-choices button')[index]?.focus({preventScroll:true});
 });choices.append(button);});
 const status=document.createElement('p');status.id='options-status';status.className='options-status';status.setAttribute('role','status');status.textContent=group.options==='toppings'?`${state.options.length} de 3 toppings elegidos`:state.options.length?`Tu selección: ${state.options.join(', ')}`:'Podés dejar esta elección para la consulta.';
 section.append(heading,note,choices,status);root.append(section);
}
function updateProductOrder(){
 const {category,group,variant}=selected();let message=`¡Hola Bindú! Me gustaría pedir ${group.name}: ${variant.name}.`;
 const size=variant.size||group.size;if(size&&state.category!=='bowls')message+=` Tamaño: ${size}.`;
 if(state.options.length){const label=group.options==='toppings'?'Toppings':group.options==='syrups'?'Sirope':'Extras';message+=` ${label}: ${state.options.join(', ')}.`;}
 message+=' ¿Me confirman la disponibilidad y cómo coordinar mi pedido?';el('product-order-link').href=whatsapp(message);
}
