import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root=new URL('..',import.meta.url).pathname;
const readJson=async path=>JSON.parse(await readFile(join(root,path),'utf8'));
const errors=[];
const ids=new Set();

const registry=await readJson('registry.json');
const version=(await readFile(join(root,'VERSION'),'utf8')).trim();
if(registry.version!==version)errors.push(`registry.json: version ${registry.version} no coincide con VERSION ${version}`);
if(!Array.isArray(registry.corpora))errors.push('registry.json: corpora debe ser un array');

const inventory=await readJson('sources/inventory.json');
if(inventory.logicalSourceCount!==inventory.sources?.length)errors.push('sources/inventory.json: logicalSourceCount no coincide con sources');
const sourceIds=new Set();
const sourceByHash=new Map();
let sourceFileCount=0;
for(const source of inventory.sources||[]){
  if(!source.id)errors.push('sources/inventory.json: fuente sin id');
  if(sourceIds.has(source.id))errors.push(`sources/inventory.json: id duplicado ${source.id}`);
  sourceIds.add(source.id);
  if(!source.title||!source.publisher||!source.officialUrl)errors.push(`${source.id}: metadatos de fuente incompletos`);
  if(!String(source.officialUrl).startsWith('https://'))errors.push(`${source.id}: officialUrl no usa HTTPS`);
  if(!Array.isArray(source.files)||!source.files.length)errors.push(`${source.id}: no conserva huellas de los PDF inventariados`);
  for(const file of source.files||[]){
    sourceFileCount+=1;
    if(!/^[a-f0-9]{64}$/.test(file.sha256||''))errors.push(`${source.id}: SHA-256 no válida`);
    const previous=sourceByHash.get(file.sha256);
    if(previous&&previous!==source.id)errors.push(`${source.id}: PDF idéntico registrado también como ${previous}`);
    sourceByHash.set(file.sha256,source.id);
  }
}
if(inventory.sourceFileCount!==sourceFileCount)errors.push('sources/inventory.json: sourceFileCount no coincide con los archivos registrados');

for(const entry of registry.corpora||[]){
  if(!entry.id)errors.push('registry.json: corpus sin id');
  if(ids.has(entry.id))errors.push(`registry.json: id duplicado ${entry.id}`);
  ids.add(entry.id);
  if(entry.status==='planned')continue;
  if(!entry.path){errors.push(`${entry.id}: falta path`);continue}
  const articlePath=join(entry.path,'articulado.json');
  const metadataPath=join(entry.path,'metadata.json');
  try{await access(join(root,articlePath));await access(join(root,metadataPath))}catch{errors.push(`${entry.id}: faltan metadata.json o articulado.json`);continue}
  const corpus=await readJson(articlePath);
  const metadata=await readJson(metadataPath);
  if(corpus.id!==entry.id)errors.push(`${entry.id}: id de articulado.json no coincide`);
  if(metadata.id!==entry.id)errors.push(`${entry.id}: id de metadata.json no coincide`);
  if(!corpus.source?.publisher||!corpus.source?.url)errors.push(`${entry.id}: fuente incompleta`);
  const articleIds=new Set();
  const unitIds=new Set();
  for(const article of corpus.articles||[]){
    if(articleIds.has(article.id))errors.push(`${entry.id}: artículo duplicado ${article.id}`);
    articleIds.add(article.id);
    if(!article.title)errors.push(`${entry.id}/${article.id}: falta title`);
    for(const unit of article.units||[]){
      if(unitIds.has(unit.id))errors.push(`${entry.id}: unidad duplicada ${unit.id}`);
      unitIds.add(unit.id);
      if(!unit.legal?.trim())errors.push(`${entry.id}/${unit.id}: falta texto legal`);
      if(unit.plain!==undefined&&unit.plain!==null&&!String(unit.plain).trim())errors.push(`${entry.id}/${unit.id}: plain vacío`);
    }
  }
}

if(errors.length){
  console.error(`Validación fallida (${errors.length}):`);
  errors.forEach(error=>console.error(`- ${error}`));
  process.exit(1);
}
console.log(`OK: ${registry.corpora.length} corpus registrados; estructura v${registry.version}.`);
