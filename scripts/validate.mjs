import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const seen=new Set();
function validateAsset(relative){
  if(/^(?:https?:|data:|#|mailto:|tel:)/i.test(relative))return;
  relative=relative.split(/[?#]/)[0];
  if(seen.has(relative))return;
  seen.add(relative);
  const file=path.resolve(dist,relative);
  if(!file.startsWith(dist+path.sep))throw Error('Asset outside dist: '+relative);
  const bytes=fs.readFileSync(file);
  if(bytes.length===0)throw Error('Empty asset: '+relative);
  if(relative.endsWith('.webp')){
    if(bytes.length<12||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP'||bytes.readUInt32LE(4)+8!==bytes.length)throw Error('Invalid WebP container: '+relative);
  }
}
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g))validateAsset(match[1]);
for(const name of ['app.js','catalog.js'])new vm.Script(fs.readFileSync(path.join(dist,name),'utf8'),{filename:name});
const catalog=vm.runInNewContext(fs.readFileSync(path.join(dist,'catalog.js'),'utf8')+';CATALOG',{}, {timeout:1000});
let count=0;
for(const category of Object.values(catalog))for(const group of category.groups)for(const variant of group.variants){
  validateAsset(variant.photo||`assets/products/${variant.image}.webp`);
  if(variant.thumbnail)validateAsset(variant.thumbnail);
  count++;
}
console.log(`Validated JavaScript, ${count} products and ${seen.size} referenced assets.`);
