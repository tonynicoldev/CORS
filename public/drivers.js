const countryCodes = {
  "Great Britain": "GB",
  "United Kingdom": "GB",
  "England": "GB",
  "Scotland": "GB",
  "Wales": "GB",
  "USA": "US",
  "United States": "US",
  "Netherlands": "NL",
  "Monaco": "MC",
  "Australia": "AU",
  "Canada": "CA",
  "Spain": "ES",
  "Mexico": "MX",
  "France": "FR",
  "Denmark": "DK",
  "Japan": "JP",
  "China": "CN",
  "Finland": "FI",
  "Germany": "DE",
  "Italy": "IT",
  "Switzerland": "CH",
  "Russia": "RU",
  "Brazil": "BR",
  "Argentina": "AR",
  "Belgium": "BE",
  "Austria": "AT",
  "South Africa": "ZA",
  "New Zealand": "NZ",
  "Thailand": "TH",
};


async function loadDrivers(year = "current") {

  const tableBody = document.querySelector("#driversTable tbody");
  tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  try {
  
    // Demo CORS. Try to PUT to the site. Browser will preflight to check this is allowed - and it isn't
   /// fetch(`https://f1api.dev/api/${year}/drivers-championship`, { method: "PUT" });

    // Demo CORS with a non-simple GET by adding a non=standard header to force a preflight
   /// fetch(`https://f1api.dev/api/${year}/drivers-championship`, {headers: {"x-test": "Force a preflight options request"}});

    // Standard simple CORS request, browser assumes it will work so for efficiency, no preflight sent
    const response = await fetch(`https://f1api.dev/api/${year}/drivers-championship`);
    const data = await response.json();

    tableBody.innerHTML = "";

    data.drivers_championship.forEach(elem => {
      const row = document.createElement("tr");

      const flagUrl = `https://flagsapi.com/${countryCodes[elem.driver.nationality]}/flat/32.png`; // THis is not an API they have mislabeled it. It's just a URL

      row.innerHTML = `
        <td>${elem.position}</td>
        <td>${elem.driverId
        }</td>
        <td>${elem.points}</td>
        <td><img src="${flagUrl}" alt="${elem.driver.country_code} flag"></td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    tableBody.innerHTML = "<tr><td colspan='4'>Error loading data</td></tr>";
  }
}

document.querySelector("#yearSelect").addEventListener("change", (e) => {
  loadDrivers(e.target.value);
});

loadDrivers();

console.log(`Should see this before the table loads to show that it is async but there is nothing else to do but wait. Can still interact with the page`);