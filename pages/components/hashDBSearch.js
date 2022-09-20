import clientPromise from "../../lib/mongodb";

export default async function hashDBSearch(website, hash) {
    const c = await clientPromise;
    if (!c) {
        console.log("Not Connected in newItem.js");
      }else{
        console.log(`Connected to Database`)
      }
  try {
      await findWebsiteID(c, {
        [website]: hash
    });
  } finally {
    //await c.close();
    //console.log("Disconnected in newItem.js");
  }
}

async function findWebsiteID(c, website) {
  const result = await c
    .db("fraudFinder")
    .collection("websiteSearched")
    .find(website);
  console.log(
    `Website: ${website.website} found with correct hash: ${result.hash}`
  );
  if(!result){
    return console.log`${website.website} not found in zonefileDB.`
  }else{
    const websiteReturnID = {
        domain: result.website,
        id: result._id
    }
    return websiteReturnID
  } 
}