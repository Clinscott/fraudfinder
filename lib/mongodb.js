import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://Morderith:QxEz5JkqUGa14ho6@websitefraudfinder.m1ztc9k.mongodb.net/?retryWrites=true&w=majority";
const options = {};

let client;
let clientPromise;

clientPromise = new MongoClient(uri, options);

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
