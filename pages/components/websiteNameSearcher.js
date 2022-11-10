//domain name can include:
//1 - 63 characters long
//a-z, 0-9
//can include -
//index[0] cannot be -
//lastIndex cannot be -
//no consecutive -'s
//not case sensitive

export default async function websiteNameSearcher(str) {
  //check if str has been searched before. if not then go nuts.
  //otherwise return already created variables and perform WHOIS.
  //add -com
  //add -org
  //add -net
  //add -ca
  //add -gov
  //add -official tags: ie. northammergames => northammergames-store etc...
  //change o to 0's: northammergames => n0rthammergames
  //change i to l
  //change l to i
  //double small letters i, l, o, j: ie, northammergames => noorthammergames
  //add e to end: ie. northammergames => northammergamese
  //add s to end: ie. northammergames => northammergamess
  //add - starting after first index untill second last index: ie. northammergames => n-orthammergames / no-rthammergames / nor-thammergames
  //add another - from str from above function where no - before or after: ie. northammergames => n-o-rthammergames etc...
  //perform each prev variation on subsequent variations

  
  //once collected store all found variations in new database associated with search str.
};

//should each of these be their own function? Most likely yes.
//variation functions go below here!