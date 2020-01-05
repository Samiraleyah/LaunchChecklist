//Write your JavaScript code here!



/* This block of code shows how to format the HTML once you fetch some planetary JSON!

<h2>Mission Destination</h2>

<ol>

   <li>Name: ${}</li>

   <li>Diameter: ${}</li>

   <li>Star: ${}</li>

   <li>Distance from Earth: ${}</li>

   <li>Number of Moons: ${}</li>

</ol>

<img src="${}">

*/


document
.getElementByid('formSubmit')
.addEventListener('click', function(event) {
    var pilotName = document.querySelector('input[name=pilotName]').value;
    var copilotName = document.querySelector('input[name=copilotName]').value;
    var fuelLevel = document.querySelector('input[name=fuelLevel]').value;
    var cargoMass = document.querySelector('input[name=cargoMass]').value;
    console.log(pilotName);
    console.log(copilotName);
    console.log(fuelLevel);
    console.log(cargoMass);
    if (
      pilotName == '' ||
      copilotName == '' ||
      fuelLevel == '' ||
      cargoMass == ''
    ) {
      alert('All fields are required');
      event.preventDefault();
    } else {
      console.log(/[^a-z]/i.test(pilotName));
      console.log(/[^a-z]/i.test(copilotName));
      console.log(isNaN(fuelLevel));
      console.log(isNaN(cargoMass));
      if (
        /[^a-z]/i.test(pilotName) ||
        /[^a-z]/i.test(copilotName) ||
        isNaN(fuelLevel) ||
        isNaN(cargoMass)
      ) {
        alert('make sure to enter a valid value for each field');
        event.preventDefault();
      } else {
        const div1 = document.getElementById('launchStatusCheck');
        div1.innerHTML = `
      <h2 id="launchStatus">${
        Number(fuelLevel) < 10000 || Number(cargoMass) > 10000
          ? 'Shuttle not ready for launch'
          : 'Shuttle is ready for launch'
      }</h2>
        <div id="faultyItems">
          <ol>
              <li id="pilotStatus">${pilotName} Pilot Ready</li>
              <li id="copilotStatus">${copilotName} Co-pilot Ready</li>
              <li id="fuelStatus">Fuel level high enough for launch</li>
              <li id="cargoStatus">Cargo mass low enough for launch</li>
          </ol>
        </div>
        `;
        if (Number(fuelLevel) < 10000 || Number(cargoMass) > 10000) {
          document.querySelector('h2[id="launchStatus"]').style.color = 'red';
          document.getElementById('faultyItems').style.visibility = 'visible';
          if (Number(fuelLevel) < 10000) {
            document.getElementById('fuelStatus').innerHTML =
              ' Fuel level too low for launch';
          }
          if (Number(cargoMass) > 10000) {
            console.log(document.getElementById('cargoStatus'));
            document.getElementById('cargoStatus').innerHTML =
              ' Cargo mass level too high for launch';
          }
        } else {
          document.querySelector('h2[id="launchStatus"]').style.color = 'green';
        }
        fetch(
          'https://handlers.education.launchcode.org/static/planets.json'
        ).then(function(response) {
          response.json().then(function(json) {
            console.log(json);
            const div = document.getElementById('missionTarget');
            // Add HTML that includes the JSON data
            div.innerHTML = `
                    <h2>Mission Destination</h2>
<ol>
  <li>Name: ${json[4].name}</li>
  <li>Diameter: ${json[4].diameter}</li>
  <li>Star: ${json[4].star}</li>
  <li>Distance from Earth: ${json[4].distance}</li>
  <li>Number of Moons: ${json[4].moons == 'unknown' ? 0 : json[4].moons}</li>
</ol>
<img src="${json[4].image}">
                  `;
          });
        });
      }
    }
  });



