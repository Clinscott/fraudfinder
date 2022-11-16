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

  if (websiteArrayCount === 10) {
    websiteArray.forEach((w) => {
      //run different changes
      //post array to database stored under searched website
      //reduce array and count to 0
    });
  }
  changeWebsite(str);
  console.log(websiteArray);
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
  const alt = website.replace();
  websiteArrayCount++;
  return websiteArray.push(alt);
}
//add e to end: ie. northammergames => northammergamese
//add s to end: ie. northammergames => northammergamess
//add - starting after first index untill second last index: ie. northammergames => n-orthammergames / no-rthammergames / nor-thammergames
//add another - from str from above function where no - before or after: ie. northammergames => n-o-rthammergames etc...
//perform each prev variation on subsequent variations

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
}

websiteNameSearcher("northammergames");
