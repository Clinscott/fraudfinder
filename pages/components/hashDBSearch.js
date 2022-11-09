import clientPromise from "../../lib/mongodb";

export default async function hashDBSearch(website, hash) {
  const dataBaseIndex = website[0].toUpperCase();
  const c = await clientPromise;
  if (!c) {
    console.log("Not Connected in newItem.js");
  } else {
    console.log(`Connected to Database`);
  }
  try {
    await findWebsiteID(c, dataBaseIndex, {
      hash: hash,
    });
  } catch (err) {
    console.error(err);
  }
}

async function findWebsiteID(c, index, hash, zone) {
  const result = await c
    .db(`fraudFinder${zone}`)
    .collection(`websiteHash${index}`)
    .find(hash);
  console.log(`Hash: ${hash} Found with correct hash: ${result.hash}`);
  if (!result) {
    console.log`${hash} not found in ZoneFile Database.`;
  } else {
    const websiteReturnID = {
      domain: result.website,
      id: result._id,
    };
    return websiteReturnID;
  }
}
