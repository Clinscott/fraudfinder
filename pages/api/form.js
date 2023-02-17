import websiteLinter from "../components/websiteLinter.js";
import websiteNameSearcher from "../components/websiteNameSearcher.js";
import whoDis from "../components/whoDis.js";
import testData from "../components/data.js";

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.website) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "Website not found" });
  }
  // Found the website.
  // Sends a HTTP success code

  // lints website removing http... and zone for searching
  const website = websiteLinter(body.website);

  // hashes searched website to match against parsed data. Searching for hashes which point to
  // the location of the searched website. Why. Because I wanted to learn how to.
  //searched Database for associated website and hash. This will be created from a function that
  //iterates through the zonefiles assigning domain, hash and ID of domain to be pulled.
  //returns ID of domain to be pulled from associated DB.

  //generates alternates of website and searches DB for any that match.
  //returns object containing array of unreg and reg alts as well as OG search site.
  body.generateWebsites = await websiteNameSearcher(website.site);
  // body.generateWebsites.whoDis = await whoDis(testData.registeredAlts, '.org'); //need to have dom as well as name
  console.log("api FORM WebsitePreJSON");
  console.log(body.generateWebsites);
  res.status(200).json({data: body.generateWebsites});
}
