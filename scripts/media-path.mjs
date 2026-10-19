// Media edition identity is independent of the logical reference version.
export function mediaAssetDirectory(media){
 const valid=s=>typeof s==='string'&&/^[a-z0-9]+(?:[-.][a-z0-9]+)*$/.test(s)&&!/gaea|houdini/i.test(s);
 if(!valid(media.slug)||(media.snapshot!==undefined&&!valid(media.snapshot)))throw Error('Invalid neutral media namespace');
 return media.slug+(media.snapshot===undefined?'':'/'+media.snapshot);
}
