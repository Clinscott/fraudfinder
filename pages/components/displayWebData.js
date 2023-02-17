import whoDis from "./whoDis.js";

//call props by what you send it as. props is all inputs. then needs specific named variables.

export default function displayWebData(props) {
  console.log("props");
  console.log(props.data);

  const fraudWebsites = props.data.registeredAlts;
  console.log("fraudWebsites");
  console.log(fraudWebsites);

  const fraudNumber = props.data.registeredAltsNumber;
  console.log("fraudNumber");
  console.log(fraudNumber);

  const checkedNumber =
    props.data.registeredAltsNumber + props.data.unRegisteredAltsNumber;
  console.log("CheckedNumber");
  console.log(checkedNumber);

  const whoIsData = props.data.whoDis;
  console.log("whoIsData");
  console.log(whoIsData);

  let count = 0;

  // this may have to run async inline with the map function to display all the pertenant whois with each website.
  // should be interesting to figure out

  // async function whodis(websites){
  //     const websiteArray = [websites];
  //     whois.lookup(`${val.domain}.org`, function(err, data){data})
  // }

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Possible Fraud Detected</th>
            <th>Total checked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fraudNumber}</td>
            <td>{checkedNumber}</td>
          </tr>
        </tbody>
      </table>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Itentified Websites</th>
          </tr>
        </thead>
        <tbody>
          {fraudWebsites.map((val, key) => {
            count++;
            const website = val.domain;
            const data = whoIsData[key];
            return (
              <tr key={key}>
                <td>
                  <li>
                    {count + ". "}
                    {website}
                  </li>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="styled-table">
        <thead>
          <tr>
            <th>WHOIS</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {whoIsData.map((val, key) => {
            return (
              <tr key={key}>
                <td>
                  <li>{val.domainName}</li>
                </td>
                {val.registrar ? (
                  <td>
                    <li>Registrar: {val.registrar}</li>
                    <li>Registrar URL: {val.registrarUrl}</li>
                    <li>Creation Date: {val.creationDate}</li>
                    <li>Date Last Updated: {val.updatedDate}</li>
                    <li>Fraud Email: {val.registrarAbuseContactEmail}</li>
                    <li>Fraud Phone: {val.registrarAbuseContactPhone}</li>
                  </td>
                ) : (
                  <td>
                    <li>{val.error}</li>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
