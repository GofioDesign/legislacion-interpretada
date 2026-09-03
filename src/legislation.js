const esc=value=>String(value??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=value=>String(value??'').toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu,'');

export async function loadRegistry(baseUrl='.'){
  const response=await fetch(new URL('registry.json',new URL(baseUrl,location.href)));
  if(!response.ok)throw new Error('No se pudo cargar registry.json');
  return response.json();
}

export async function loadCorpus(entry,baseUrl='.'){
  if(!entry.path)throw new Error(`El corpus ${entry.id} no tiene path local`);
  const root=new URL(`${entry.path.replace(/\/$/,'')}/`,new URL(baseUrl,location.href));
  const [metadataResponse,articlesResponse]=await Promise.all([
    fetch(new URL('metadata.json',root)),
    fetch(new URL('articulado.json',root))
  ]);
  if(!metadataResponse.ok||!articlesResponse.ok)throw new Error(`No se pudo cargar ${entry.id}`);
  return {metadata:await metadataResponse.json(),corpus:await articlesResponse.json()};
}

export function flattenCorpus(corpus){
  return (corpus.articles||[]).flatMap(article=>(article.units||[]).map(unit=>({article,unit,search:norm([article.title,unit.legal,unit.plain,(unit.topics||[]).join(' ')].join(' '))})));
}

export function searchCorpus(corpus,query){
  const terms=norm(query).trim().split(/\s+/).filter(Boolean);
  const rows=flattenCorpus(corpus);
  return terms.length?rows.filter(row=>terms.every(term=>row.search.includes(term))):rows;
}

function relationHtml(relation,corpus){
  if(typeof relation==='string'){
    const local=relation.startsWith('articulo-');
    return local?`<button type="button" class="li-related" data-li-open="${esc(relation)}">${esc(relation.replace('articulo-','Artículo '))}</button>`:`<span class="li-related">${esc(relation)}</span>`;
  }
  if(relation?.href)return `<a class="li-related" href="${esc(relation.href)}" target="_blank" rel="external noopener">${esc(relation.label||relation.href)}</a>`;
  if(relation?.id)return `<button type="button" class="li-related" data-li-open="${esc(relation.id)}">${esc(relation.label||relation.id)}</button>`;
  return '';
}

export function renderUnit({article,unit,corpus}){
  const related=(unit.related||[]).map(item=>relationHtml(item,corpus)).join('');
  return `<article class="li-unit" id="${esc(unit.id)}" data-li-unit><p class="li-article-label">${esc(article.title)}</p><div class="li-legal"><span class="li-label">Texto legal</span><p>${esc(unit.legal)}</p></div>${unit.plain?`<aside class="li-plain"><span class="li-label">En palabras sencillas</span><p>${esc(unit.plain)}</p></aside>`:''}${unit.editorialNote?`<aside class="li-note"><span class="li-label">Nota de edición</span><p>${esc(unit.editorialNote)}</p></aside>`:''}${related?`<nav class="li-relations" aria-label="Contenido relacionado">${related}</nav>`:''}</article>`;
}

export async function mountLegislation(target,{baseUrl='.',corpusId}={}){
  if(!target)throw new Error('Falta el elemento contenedor');
  const registry=await loadRegistry(baseUrl);
  const available=registry.corpora.filter(item=>item.path&&item.status!=='planned');
  const selected=available.find(item=>item.id===corpusId)||available[0];
  if(!selected){target.textContent='No hay corpus disponibles.';return}
  const {metadata,corpus}=await loadCorpus(selected,baseUrl);
  target.classList.add('li-app');
  target.innerHTML=`<header class="li-header"><p class="li-eyebrow">Legislación Interpretada · v${esc(registry.version)}</p><h1>${esc(corpus.title)}</h1><p>${esc(metadata.territory||'')}</p><div class="li-meta"><span>${esc(corpus.status)}</span><a href="${esc(corpus.source.url)}" target="_blank" rel="external noopener">Fuente: ${esc(corpus.source.publisher)}</a></div><label class="li-search-label" for="li-search">Buscar en este corpus</label><input id="li-search" class="li-search" type="search" placeholder="Ej. vacaciones, reparto, ámbito territorial"></header><main class="li-results" aria-live="polite"></main>`;
  const search=target.querySelector('#li-search');
  const results=target.querySelector('.li-results');
  const draw=()=>{
    const rows=searchCorpus(corpus,search.value);
    results.innerHTML=`<p class="li-count">${rows.length} unidades encontradas</p>${rows.map(row=>renderUnit({...row,corpus})).join('')}`;
  };
  search.addEventListener('input',draw);
  target.addEventListener('click',event=>{
    const button=event.target.closest('[data-li-open]');
    if(!button)return;
    const article=corpus.articles.find(item=>item.id===button.dataset.liOpen);
    const unit=article?.units?.[0];
    if(unit){location.hash=unit.id;document.getElementById(unit.id)?.scrollIntoView({behavior:'smooth',block:'center'});}
  });
  draw();
  const hash=decodeURIComponent(location.hash.slice(1));
  if(hash)requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView({block:'center'}));
}
