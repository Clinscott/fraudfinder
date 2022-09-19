import clientPromise from "../../lib/mongodb";

export default async function pullFoundWebsiteID(ID) {
  const c = await clientPromise;
  if (!c) {
    console.log("Not Connected in newItem.js");
  } else {
    console.log(`Connected to Database`);
  }
  try {
    await pullWebsiteID(c, {
      _id: ID,
    });
  } finally {
    //await c.close();
    //console.log("Disconnected in newItem.js");
  }
}

async function pullWebsiteID(c, id) {
  const result = await c
    .db("fraudFinder")
    .collection("websiteSearched") //to be different collection
    .find(id);
  console.log(`New inventory created with the following id: ${result.id}`);
  if (!result) {
    return console.log(`No find ${id}`);
  } else {
    return result.toArray();
  }
}
