const out = (str) => console.log(str);
const url = 'http://localhost:8080/get-candidates';
const delUrl = 'http://localhost:8080/delete-candidate/';

function fetchCandidatesAsc() {
  return fetch(url + "?sort=true").then(response => response.json());
}
function fetchCandidatesDesc() {
  return fetch(url + "?sort=false").then(response => response.json());
}
let body;


function actionCandidatesAsc(btn) {
  out("candidateAsc btn used");
  const prom = fetchCandidatesAsc();
  prom.then(candidateCallback);
  prom.then(printCandidates);
}

function actionCandidatesDesc(btn) {
  out("candidateDesc btn used");
  const prom = fetchCandidatesDesc();
  prom.then(candidateCallback);
  prom.then(printCandidates);
}

/*
Ikke nødvendig men skriver objekter i konsol ved get-kald.
 */
function printCandidates(data) {
  out("Print candidates");
  data.forEach(obj => {
    out(obj);
  })
}

function deleteCandidate(id) {

  fetch(delUrl + id, {
    method: "DELETE"
  });
  out("Candidate by id:" + id + " has been deleted.")
  location.reload();
}

function candidateCallback(candidateList) {
  let html = "<table border='1' cellpadding='10'>"  +
    "<tr> " +
    "<th> Id </th>" +
    " <th> Name </th>" +
    " <th> Party </th>" +
    " <th> Edit </th>" +
    " <th> Delete </th> </tr>"
  candidateList.forEach(function(item)
  { html += "<tr> <td>"
    + item.id + "</td> <td> "
    + item.name + "</td>  <td>"
    + item.party.partyName
    + "</td> <td>"
    + "Edit" + "</td>  <td>"
    + "<button onclick='deleteCandidate(" + item.id +" )' > Delete </button>"
    + "</td>" 	})
  html += "</table>"
  document.getElementById("CandidateTable").innerHTML = html}

const GetCandidatesAsc = document.querySelector(".GetCandidatesAsc");
GetCandidatesAsc.addEventListener("click", actionCandidatesAsc);

const GetCandidatesDesc = document.querySelector(".GetCandidatesDesc");
GetCandidatesDesc.addEventListener("click", actionCandidatesDesc);
