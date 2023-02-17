// import {testData} from "./data.js"

export default function printAltSiteNames(arr) {
  const sites = new Array();
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index].domain;
    sites.push(element);
  }
  const printSites = sites.join(", ");
  console.log(printSites);
  return printSites;
}

// console.log(printAltSiteNames(testData.registeredAlts))
