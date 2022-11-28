import clientPromise from "../../lib/mongodb.js";

export default async function hashDBSearch(website, hash) {
  const dataBaseIndex = website[0].toUpperCase();
  const c = await clientPromise;
  if (!c) {
    console.log("Not Connected in newItem.js");
  } else {
    // console.log(`Connected to Database`);
  }
  try {
    return await findWebsiteID(c, dataBaseIndex, {
      website: website,
    },'org');
  } catch (err) {
    console.error(err);
  }
}

async function findWebsiteID(c, index, website, zone) {
  const result = await c
    .db(`fraudFinder${zone}`)
    .collection(`websiteHash${index}${zone}`)
    .findOne(website);
  // console.log(`Hash: ${hash} Found with correct hash: ${result.hash}`);
  if (!result) {
    console.log(`${website.website} not found in ZoneFile Database.`);
    return null;
  } else {
    const websiteReturnID = {
      domain: result.website,
      id: result._id,
    };
    return websiteReturnID;
  }
}

