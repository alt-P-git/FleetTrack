import './AddRoute.css';
import React, { useEffect, useState } from 'react';

const AddRoute = () => {
  const [map, setMap] = useState(null);
  let directionsManager;
  const [routePointsArray, setRoutePointsArray] = useState([[0, 0]]);
  const [routeSelected, setRouteSelected] = useState(false);

  console.log("Calling function...")
  window.loadMapModule = async () => {
    GetMap();
  }

  const GetMap = () => {
    console.log("Function used...")
    let _map = new window.Microsoft.Maps.Map('#myMap', {});
    setMap(_map)
    // Load the directions module.
    window.Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
      //Create an instance of the directions manager.
      directionsManager = new window.Microsoft.Maps.Directions.DirectionsManager(_map);

      //Specify where to display the route instructions.
      directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });

      //Specify the where to display the input panel
      directionsManager.showInputPanel('directionsPanel');

      // Add event handler for directions updated event.
      window.Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', function (e) {
        const routePath = e.route[0].routePath;
        console.log("Route path")
        console.log(e.route[0].routePath)
        const routePoints = [];
        for (var i = 0; i < routePath.length; i++) {
          routePoints.push([routePath[i].latitude, routePath[i].longitude]);
        }
        setRoutePointsArray(routePoints);
        if (routePoints.length > 0) {
          setRouteSelected(true);
          console.log("Route selected")
        }
        console.log(e.route[0])
      });
    });
  }

  const SaveRoutePoints = async () => {
    try {
      const startingPoint = await getName(routePointsArray[0][0], routePointsArray[0][1]);
      const endingPoint = await getName(routePointsArray[routePointsArray.length - 1][0], routePointsArray[routePointsArray.length - 1][1]);

      console.log("Starting point and ending point")
      console.log(startingPoint)
      console.log(endingPoint)

      const data = {
        "name": startingPoint.city +"_"+startingPoint.state+"_"+startingPoint.zipCode+"_to_" + endingPoint.city +"_"+endingPoint.state+"_"+endingPoint.zipCode,
        "coords": routePointsArray
      }

      console.log(routePointsArray)

      const response = await fetch('http://localhost:4000/addRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log(responseData);
      alert("Route points saved successfully");
    } catch (error) {
      console.error(error);
    }
  }

  const getNamePromise = async (latitude, longitude) => {
    let searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
    let requestOptions = {
      location: new window.Microsoft.Maps.Location(latitude, longitude)
    };

    return new Promise((resolve, reject) => {
      requestOptions.callback = function (answer, userData) {
      let city = answer.address.locality;
      let state = answer.address.adminDistrict;
      let zipCode = answer.address.postalCode;
      resolve({ city, state, zipCode });
      };
      requestOptions.errorCallback = function (e) {
        reject(e);
      };
      searchManager.reverseGeocode(requestOptions);
    });
  };

  const getName = async (latitude, longitude) => {
    const loc = await getNamePromise(latitude, longitude).then(location => {
      return location
    }).catch(error => console.log(error));
    return loc
  }

  return (
    <>
      <div className="container">
        <div className="directionsContainer">
          <div id="directionsPanel"></div>
          <div id="directionsItinerary"></div>
        </div>
        <div className='map'>
          <div id="myMap">
          </div>
        </div>
      </div>
      {routeSelected && <button id="saveButton" onClick={SaveRoutePoints}>Save Route Points</button>}
    </>
  );
};

export default AddRoute;
