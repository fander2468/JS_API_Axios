/*
Using JavaScript(axios) and the DOM you are to create a table of data using the F1 racer API.
The table should have a total of 7 rows and dynamically populate the data when
a "season" and "round" are specified within your form. Grab firstName, lastName, position, wins, DOB, permanentNumber and constructorName
 */
// ============================================================
// create the input field for ergast
createErgast = () => {
  inputYear = document.createElement("input");
  inputRound = document.createElement("input");

  inputYear.placeholder = "Enter racer year";
  inputRound.placeholder = "Enter racer round";

  inputYear.name = "racerYear";
  inputRound.name = "racerRound";

  inputYear.classList.add("form-control");
  inputRound.classList.add("form-control");

  document.body.appendChild(inputYear);
  document.body.appendChild(inputRound);
};
createErgast();
// ============================================================
// create the table to present the API data
createTable = () => {
  // create the table in the body
  table = document.createElement("table");
  table.classList.add("table", "table-dark", "table-striped");
  document.body.appendChild(table);

  // create a semantic heading section
  thead = document.createElement("thead");
  table.appendChild(thead);

  // create a heading row
  tr = document.createElement("tr");
  thead.appendChild(tr);

  // append all the heading elements
  th = document.createElement("th");
  th.innerText = "First-Name";
  th.scope = "col";
  tr.appendChild(th);

  th = document.createElement("th");
  th.innerText = "Last-Name";
  th.scope = "col";
  tr.appendChild(th);

  th = document.createElement("th");
  th.innerText = "Position";
  th.scope = "col";
  tr.appendChild(th);

  th = document.createElement("th");
  th.innerText = "Wins";
  th.scope = "col";
  tr.appendChild(th);

  th = document.createElement("th");
  th.innerText = "DOB";
  th.scope = "col";
  tr.appendChild(th);

  th = document.createElement("th");
  th.innerText = "Permanent-Number";
  th.scope = "col";
  tr.appendChild(th);

  th = document.createElement("th");
  th.innerText = "Constructor-Name";
  th.scope = "col";
  tr.appendChild(th);

  // create a semantic body section
  tbody = document.createElement("tbody");
  table.appendChild(tbody);
};
createTable();
// ============================================================
// create a function to work with the ergast api
let doAPIcall = async (year, round) => {
  result = await axios.get(
    `https://ergast.com/api/f1/${year}/${round}/driverStandings.json`
  );
  if (!result) {
    return;
  }
  result = result.data;
  data = result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  tbody = document.getElementsByTagName("tbody")[0];
  for (driver of data) {
    tr = document.createElement("tr");
    tbody.appendChild(tr);

    td = document.createElement("td");
    td.innerText = driver["Driver"]["givenName"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = driver["Driver"]["familyName"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = driver["position"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = driver["wins"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = driver["Driver"]["dateOfBirth"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = driver["Driver"]["permanentNumber"] ?? "No Number";
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = driver.Constructors[0]["name"];
    tr.appendChild(td);
  }
};
// ============================================================
// make a listener for the button being clicked
handleClick = (event) => {
  ergastYear = document.getElementsByName("racerYear")[0].value;
  ergastRound = document.getElementsByName("racerRound")[0].value;
  // send an API call to ergast.io
  doAPIcall(ergastYear, ergastRound);
};
// ============================================================
// make the button
submitButton = () => {
  button = document.createElement("button");
  document.body.appendChild(button);
  button.innerText = "Submit";
  button.classList.add("btn", "btn-primary");
  button.addEventListener("click", handleClick);
};
submitButton();
