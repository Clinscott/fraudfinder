import clientPromise from "../../lib/mongodb";

export default async function dataBaseFind(hash){
    const c = await clientPromise;

    if(!c){
        console.log('No Connection to DB');
    }else{
        console.log('Connected to DB');
    }
    try{
        findhash(c, hash);
    }finally{
       // await c.close();
    }
}

async function findhash(c, hash){
    const result = await c
    .db("fraudFinder")
    .collection("websiteSearched")
    .find({
        hash: hash
    })
    return await result;
}