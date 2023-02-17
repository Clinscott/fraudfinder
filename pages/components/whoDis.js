import whois from "whois-json";
import { testData } from "./data.js";
//must be used server side and not browser side

export default async function whodis(array, dom) {
  const websiteArray = array;
  const whoDisArray = new Array();
  console.log(websiteArray);
  await Promise.all(
    websiteArray.map(async (val, key) => {
      const element = val.domain;
      //   console.log(element);
      try {
        const results = await whois(`${element}${dom}`);
        const websiteObject = new Object();
        websiteObject.domainName = results.domainName;
        websiteObject.registrar = results.registrar;
        websiteObject.registrarWhoisServer = results.registrarWhoisServer;
        websiteObject.registrarUrl = results.registrarUrl;
        websiteObject.updatedDate = results.updatedDate;
        websiteObject.creationDate = results.creationDate;
        websiteObject.registrarAbuseContactEmail =
          results.registrarAbuseContactEmail;
        websiteObject.registrarAbuseContactPhone =
          results.registrarAbuseContactPhone;
        websiteObject.registrantCountry = results.registrantCountry;
        websiteObject.registrantStateProvince = results.registrantStateProvince;
        whoDisArray.push(websiteObject);
      } catch (error) { //need something if whois fails
        console.log(error);
        const err = JSON.stringify(error);
        // console.log(element)
        whoDisArray.push({ domainName: element, error: err });
      }
     

      // console.log(results);
    })
  );

  console.log(whoDisArray);

  //returns an JSON array of objects of whois data
  const data = JSON.stringify(whoDisArray);
  return data;
}

console.log(whodis(testData.registeredAlts, ".org"));
