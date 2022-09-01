import { mainModule } from "process";
import clientPromise from "../../lib/mongodb.ts";
import dataBaseConnect from "../components/newItem";
import websiteLinter from "../components/websiteLinter";

export default async function handler(req, res){
  // Get data submitted in request's body.
  const body = req.body
  
  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.website) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Website not found' })

  }
    // Found the website.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.website}` })
    const website = websiteLinter(body.website)
    dataBaseConnect(website)
}
