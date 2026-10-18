import {nodeDirectory} from '../node-library.mjs';
import {referenceCopy} from './reference-copy.mjs';
import {implementedCopy} from './implemented-copy.mjs';
export const editorialCopy=t=>referenceCopy[`${t.id}@${t.operation_version}`]??implementedCopy[`${t.id}@${t.operation_version}`];
export const referenceName=t=>nodeDirectory.nodes.find(n=>n.id===t.id)?.name??t.id;
export const explanationsComplete=t=>{
 const c=editorialCopy(t);
 return Boolean(c&&t.contract.parameters.every(p=>c.parameters[p.key]?.en&&c.parameters[p.key]?.zh));
};
