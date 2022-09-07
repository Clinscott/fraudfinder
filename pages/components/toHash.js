export default async function toHash(str){
const {createHash} = await import('node:crypto');

const hash = createHash('sha256');


   hash.update(str);
   return hash.digest('hex')
}

//console.log(toHash('someString'));