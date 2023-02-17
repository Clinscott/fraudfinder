import hashDBSearch from "./hashDBSearch.js";
import toHash from "./toHash.js";
//domain name can include:
//1 - 63 characters long
//a-z, 0-9
//can include -
//index[0] cannot be -
//lastIndex cannot be -
//no consecutive -'s
//not case sensitive

const websiteArray = new Array();
let websiteArrayCount = 0;

export default async function websiteNameSearcher(str) {
  //check if str has been searched before. if not then go nuts.
  //otherwise return already created variables and perform WHOIS.
  //once collected store all found variations in new database associated with search str.

  //registered alt array
  const regAltArray = new Array();
  let regAltArrayCount = 0;
  //unregistered alt array
  const unregAltArray = new Array();
  let unregAltArrayCount = 0;
  let websiteID;

  //run different changes
  try {
    const websiteHash = await toHash(str);
    console.log(websiteHash);
    websiteID = await hashDBSearch(str, websiteHash);
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }

  changeWebsite(str);

  //check each entry if registered in general database
  //if not in registered database store in unregistered array, else store in registered array.
  // websiteArray.forEach(async (w) => {
  //   // console.log(`website alt: ${w}`);
  //   try {
  //     const altHash = await toHash(w);
  //     const altCheck = await hashDBSearch(w, altHash);
  //     if (altCheck == null) {
  //       console.log(`alt: ${w} unreg`);
  //       unregAltArrayCount++;
  //       return unregAltArray.push(w);
  //     } else {
  //       console.log(`alt: ${w} reg`);
  //       regAltArrayCount++;
  //       const regW = { domain: altCheck.domain, id: altCheck.id };
  //       return regAltArray.push(regW);
  //     }
  //   } catch (err) {
  //     if (err) {
  //       console.error(err);
  //     }
  //   }

  //   //store website with searched websites in db under new database. NOT ENOUGH DATABASE STORAGE IN MONGODBATLAS
  // });

  await Promise.all(
    websiteArray.map(async (w) => {
      console.log(`website alt: ${w}`);
      try {
        const altHash = await toHash(w);
        const altCheck = await hashDBSearch(w, altHash);
        if (altCheck == null) {
          console.log(`alt: ${w} unreg`);
          unregAltArrayCount++;
          return unregAltArray.push(w);
        } else {
          console.log(`alt: ${w} reg`);
          regAltArrayCount++;
          const regW = { domain: altCheck.domain, id: altCheck.id };
          return regAltArray.push(regW);
        }
      } catch (err) {
        if (err) {
          console.error(err);
        }
      }
    })
  );

  let result;
  
  if (websiteID === null) {
    const nullSearchedWebsite = {
      website: `Website: ${str} does not exist.`,
      websiteAlts: websiteArrayCount,
      registeredAlts: regAltArray,
      registeredAltsNumber: regAltArrayCount,
      unRegisteredAlts: unregAltArray,
      unRegisteredAltsNumber: unregAltArrayCount,
    };
    result = JSON.stringify(nullSearchedWebsite);
  } else {
    const searchedWebsite = {
      website: websiteID.domain,
      originID: websiteID.id,
      websiteAlts: websiteArrayCount,
      registeredAlts: regAltArray,
      registeredAltsNumber: regAltArrayCount,
      unRegisteredAlts: unregAltArray,
      unRegisteredAltsNumber: unregAltArrayCount,
    };
    result = JSON.stringify(searchedWebsite);
  }

  //  console.log(result);

  return result;
}

//should each of these be their own function? Most likely yes.
//variation functions go below here!

//add -com
function addCom(website) {
  const alt = website + "-com";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//add -org
function addOrg(website) {
  const alt = website + "-org";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//add -net
function addNet(website) {
  const alt = website + "-net";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//add -ca
function addCa(website) {
  const alt = website + "-ca";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//add -gov
function addGov(website) {
  const alt = website + "-gov";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//add -official tags: ie. northammergames => northammergames-store etc...
function addStore(website) {
  const alt = website + "-store";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
function addShop(website) {
  const alt = website + "-shop";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//change o to 0's: northammergames => n0rthammergames
function changeOtoZero(website) {
  if (!website.includes("o")) {
    return;
  }
  const alt = website.replace("o", "0");
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//change i to l
function changeItoL(website) {
  if (!website.includes("i")) {
    return;
  }
  const alt = website.replace("i", "l");
  websiteArrayCount++;

  return websiteArray.push(alt);
}
//change l to i
function changeLtoI(website) {
  if (!website.includes("l")) {
    return;
  }
  const alt = website.replace("l", "i");
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//double small letters i, l, o, j: ie, northammergames => noorthammergames
function doubleSmall(website) {
  const alt = website;
  const altArray = alt.split("");
  let siteJoin;
  for (let index = 0; index < altArray.length; index++) {
    const element = altArray[index];
    switch (element) {
      case "i":
        altArray[index] = "ii";
        siteJoin = altArray.join("");
        websiteArray.push(siteJoin);
        websiteArrayCount++;

        break;
      case "e":
        altArray[index] = "ee";
        siteJoin = altArray.join("");
        websiteArray.push(siteJoin);
        websiteArrayCount++;

        break;
      case "l":
        altArray[index] = "ll";
        siteJoin = altArray.join("");
        websiteArray.push(siteJoin);
        websiteArrayCount++;

        break;
      case "j":
        altArray[index] = "jj";
        siteJoin = altArray.join("");
        websiteArray.push(siteJoin);
        websiteArrayCount++;

        break;
      case "h":
        altArray[index] = "hh";
        siteJoin = altArray.join("");
        websiteArray.push(siteJoin);
        websiteArrayCount++;
    }
  }
  return;
}
//add e to end: ie. northammergames => northammergamese
function addE(website) {
  const alt = website + "e";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//add s to end: ie. northammergames => northammergamess
function addS(website) {
  const alt = website + "s";
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//add - starting after first index untill second last index: ie. northammergames => n-orthammergames / no-rthammergames / nor-thammergames
function addDash(website) {
  for (let index = 1; index < website.length; index++) {
    const alt = website;
    const altArray = alt.split("");
    altArray.splice(index, 0, "-");
    const siteDashJoin = altArray.join("");
    websiteArray.push(siteDashJoin);
    websiteArrayCount++;
  }
  return;
}
//errant keystrokes and mispellings
//[ie=>ei][oo=>o][]
function missTyped(arr) {
  arr.forEach((element) => {
    if (element.includes("ie")) {
      const alt = element.replace("ie", "ei");
      arr.push(alt);
      websiteArrayCount++;
    }
    if (element.includes("o")) {
      const alt = element.replace("o", "oo");

      arr.push(alt);
      websiteArrayCount++;
    }
    if (element.includes("tt")) {
      const alt = element.replace("tt", "t");
      arr.push(alt);
      websiteArrayCount++;
    }
    if (element.includes("c")) {
      const alt = element.replace("c", "cc");
      arr.push(alt);
      websiteArrayCount++;
    }
    if (element.includes("rr")) {
      const alt = element.replace("rr", "r");
      arr.push(alt);
      websiteArrayCount++;
    }
    if (element.includes("mm")) {
      const alt = element.replace("mm", "m");
      arr.push(alt);
      websiteArrayCount++;
    }
    if (element.includes("ss")) {
      const alt = element.replace("ss", "s");
      arr.push(alt);
      websiteArrayCount++;
    }
  });
}
//add another - from str from websiteArray where no - before or after: ie. northammergames => n-o-rthammergames etc...
function addMoreDash(arr) {
  arr.forEach((element) => {
    for (let index = 1; index < element.length; index++) {
      const current = element[index];
      const prev = element[index - 1];
      const next = element[index + 1];
      const alt = element;
      const altArray = alt.split("");
      if (current != "-" && prev != "-" && next != "-") {
        altArray.splice(index, 0, "-");
        const siteDashJoin = altArray.join("");
        arr.push(siteDashJoin);
        websiteArrayCount++;
      }
    }
  });
}

function changeWebsite(str) {
  const website = str;
  addCom(website);
  addOrg(website);
  addNet(website);
  addCa(website);
  addGov(website);
  addShop(website);
  addStore(website);
  changeOtoZero(website);
  changeItoL(website);
  changeLtoI(website);
  doubleSmall(website);
  addE(website);
  addS(website);
  addDash(website);
  missTyped(websiteArray);
  addMoreDash(websiteArray);
}

// websiteNameSearcher("test");
