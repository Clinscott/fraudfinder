export default function ZoneForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      website: event.target.website.value
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
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log(result)
    //we have it returning data so far.
  };
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit} className="card" >
      <label htmlFor="website">Website  </label>
      <input
        type="text"
        id="website"
        name="website"
        required
        minLength={Number.MIN_SAFE_INTEGER}
        maxLength={Number.MAX_SAFE_INTEGER}
      />
      <a>      </a>
      <button type="submit" style={{backgroundColor: 'Green'}}>Submit</button>
    </form>
  );
}
