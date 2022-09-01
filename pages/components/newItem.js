import clientPromise from "../../lib/mongodb";

export default async function dataBaseConnect(newItem) {
    const c = await clientPromise;
    if (!c) {
        console.log("Not Connected in newItem.js");
      }else{
        console.log(`Connected to Database`)
      }
  try {
      await createItem(c, {
        website: newItem
    });
  } finally {
    //await c.close();
    console.log("Disconnected in newItem.js");
  }
}

async function createItem(c, newItem) {
  const result = await c
    .db("fraudFinder")
    .collection("websiteSearched")
    .insertOne(newItem);
  console.log(
    `New inventory created with the following id: ${result.insertedId}`
  );
}