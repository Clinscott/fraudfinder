import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is required");
}

const options = {};
const clientPromise = new MongoClient(uri, options);

export default clientPromise;
