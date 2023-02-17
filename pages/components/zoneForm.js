import { useEffect, useState } from "react";
import { testData } from "./data.js";
import printAltSiteNames from "./printAltSiteNames.js";
import printCheckedAlts from "./printCheckedAlts.js";
import DisplayWebData from "./displayWebData.js";

export default function ZoneForm() {
  const [loading, setLoading] = useState(false);
  const [webData, setWebData] = useState();
  const [fraudSites, setFraudSites] = useState();
  const [notFraudSites, setNotFraudSites] = useState();

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    //disable button while data loading
    setLoading(true);
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      website: event.target.website.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/form";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const dataGetter = async () => {
      const response = await fetch(endpoint, options);

      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.

      const result = await response.json();
      if (result) {
        //we have it returning data so far.
        setWebData(result.data);
        console.log("WebData:");
        console.log(webData);
        alert(`Something: ${webData}`);
        setLoading(false);
      }
    };

    const testDataGetter = async () => {
      setWebData(testData);
      const printedSiteNames = printAltSiteNames(testData.registeredAlts);
      setFraudSites(printedSiteNames);
      const printedFailedSites = printCheckedAlts(testData.unRegisteredAlts);
      setNotFraudSites(notFraudSites);

      console.log("TestData:");
      console.log(testData);
      alert(
        `TEST Website: ${testData.website} \n
        Test Alts: ${testData.websiteAlts} \n
        Possible Fraud: ${testData.registeredAltsNumber} \n
        Possible Fraud Sites: ${printedSiteNames} \n
        Sites Failed: ${printedFailedSites}`
      );
      setLoading(false);
    };
    console.log(webData);
    testDataGetter();

    // dataGetter();
  };
  return (
    // We pass the event to the handleSubmit() function on submit.

    <div
      style={{
        display: "justify-content-center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="website">Website </label>
        <input
          type="text"
          id="website"
          name="website"
          required
          minLength={Number.MIN_SAFE_INTEGER}
          maxLength={Number.MAX_SAFE_INTEGER}
        />
        <a> </a>

        <button
          type="submit"
          style={
            loading ? { backgroundColor: "Red" } : { backgroundColor: "Green" }
          }
          disabled={loading ? true : false}
        >
          Submit
        </button>
      </form>

      {webData ? (
        <DisplayWebData data={webData} />
      ) : (
        <div>
          <p>Awaiting Input . . .</p>
        </div>
      )}
      {/* Important to note: useEffect only works IN BROWSER. Code cannot access use effect OUTSIDE browser. You(me) Moron. */}
    </div>
    /*
    description:	Here we take the data brought in and show it in a logical and informative manner. 
                    In some form of map/foreach function returning HTML.
    credit:			  Geeks For Geeks. Author @krcpr007 
    link:			    https://www.geeksforgeeks.org/how-to-display-values-from-database-in-real-time-without-refreshing-the-webpage/.
    further:		  Next step will be to figure out how to analyze the alternate websites code to see how
                    similar it is to the given website. Then a WHOIS will be performed on the alt websites to 
                    give information on who owns and runs the fraud website.
    */
  );
}
