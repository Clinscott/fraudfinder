import { mainModule } from "process";
import clientPromise from "../../lib/mongodb.ts";
import dataBaseConnect from "../components/dataBaseConnect";
import websiteLinter from "../components/websiteLinter";
import toHash from "../components/toHash";
import hashDBSearch from "../components/hashDBSearch";
import pullFoundWebsiteID from "../components/pullFoundWebsiteID";


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
    res.status(200).json({ data: `${body.website}` });
    // lints website removing http... and zone for searching
    const website = websiteLinter(body.website);
    // hashes searched website to match against parsed data. Searching for hashes which point to
    // the location of the searched website. Why. Because I wanted to learn how to.
    const hashedWebsite = await toHash(website.site);
    //searched Database for associated website and hash. This will be created from a function that
    //iterates through the zonefiles assigning domain, hash and ID of domain to be pulled.
    //returns ID of domain to be pulled from associated DB.
    const hashCheck = await hashDBSearch(website.site, hashedWebsite);
    //after finding ID we want to find the zoneFile for the webite with the associated ID.
    const domainFound = await pullFoundWebsiteID(hashCheck);
    return domainFound

    //dataBaseConnect(website.site, hashedWebsite);

}
