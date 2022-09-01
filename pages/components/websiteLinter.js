import { debugPort } from "process";

export default function websiteLinter(website) {
  let url = website;
  let domain = url.substring(url.lastIndexOf("."), url.length);
  console.log(`Starting ${url}`);

  let testUrl = url.substring(url.indexOf(".")+1, url.lastIndexOf("."));

  if (domain[0] === ".") {
    url = url.replace(domain, "");
  }

  if(domain[0] !== "."){
    domain = null
  }

  console.log(`Test: ${testUrl}`);

  console.log(`Domain: ${domain}`);

  if (url.startsWith("www.")) {
    const www = "www.";
    console.log(`${url} starts with www.`);
    url = url.slice(www.length);
  }

  if (url.startsWith("http://www.")) {
    const http = "http://www.";
    console.log(`${url} starts with http://www.`);
    url = url.slice(http.length);
  }

  if (url.startsWith("https://www.")) {
    const httpsw = "https://www.";
    console.log(`${url} starts with https://www.`);
    url = url.slice(httpsw.length);
  }

  if (url.startsWith("https://")) {
    const https = "https://";
    console.log(`${url} starts with https://`);
    url = url.slice(https.length);
  }

  if (url.startsWith("http://")) {
    const http = "http://";
    console.log(`${url} starts with http://`);
    url = url.slice(http.length);
  }

let result = {
  site: url || null,
  dom: domain || null
}

console.log(result)
  return result;
}

console.log(`Test One: ${websiteLinter("https://www.northammergames.com")}`);
//console.log(`Test Two: ${websiteLinter("http://www.northammergames.com")}`);
//console.log(`Test Three: ${websiteLinter("www.northammergames.com")}`);
//console.log(`Test Four: ${websiteLinter("northammergames.com")}`);
//console.log(`Test Five: ${websiteLinter("northammergames")}`);
//console.log(`Base: ${websiteLinter("https://www.northammergames.com")}`);
