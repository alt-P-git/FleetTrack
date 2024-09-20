import React, { useEffect, useRef } from "react";
import { Map } from "react-feather";
import LastData from "./LastData";

export default function FleetInfo({ selectedVehicle }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMapScript = () => {
      const script = document.createElement("script");
      script.src = "http://www.bing.com/api/maps/mapcontrol?callback=GetMap";
      script.async = true;
      script.defer = true;
      window.GetMap = () => {
        const map = new window.Microsoft.Maps.Map(mapRef.current, {
          credentials: "Your_Bing_Maps_Key",
          center: new window.Microsoft.Maps.Location(47.6062, -122.3321),
          mapTypeId: window.Microsoft.Maps.MapTypeId.road,
          zoom: 10,
        });
      };
      document.body.appendChild(script);
    };

    if (!window.Microsoft || !window.Microsoft.Maps) {
      loadMapScript();
    } else {
      window.GetMap();
    }
  }, []);

  return (
    <div className="bg-white shadow rounded-lg mb-4 flex flex-col md:flex-row w-full h-54">
      <div className="w-full md:w-3/4 p-4">
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div ref={mapRef} className="absolute inset-0"></div>
          <div className="absolute top-4 left-4 bg-white p-2 rounded shadow z-10">
            <h3 className="font-semibold text-gray-700">Fleet Location</h3>
          </div>
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow z-10">
            {/* <p className="text-sm text-gray-600">Zoom: 100%</p> */}
          </div>
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-yellow-500 rounded-full"></div>
        </div>
      </div>
      <div className="w-full md:w-2/4 p-4">
        {/* <h2 className="text-xl font-semibold mb-4">My Fleet</h2> */}
         <div className="bg-indigo-100 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            {selectedVehicle}
          </h3>
          <p className="text-2xl font-semibold">Fleet - Information</p>
          {/* <div className="flex justify-between mb-2"> */}
            <div>
              <p className="text-1xl">Fleet No. 1 : Tata Trucks</p>
              <p className="text-sm text-green-600">Currently Active</p>

              <br/>

              <p className="text-1xl">Fleet No. 2 : Ashok Leyland</p>
              <p className="text-sm text-green-600">Currently Active</p>

              <br/>

              <p className="text-1xl">Fleet No. 3 : Mahindra Trucks</p>
              <p className="text-sm text-red-600">Free / Not On Trip</p>

              <br/>

              <p className="text-1xl">Fleet No. 4 : Eicher Trucks</p>
              <p className="text-sm text-green-600">Currently On Trip</p>

              <br/>

              <p className="text-1xl">Fleet No. 5 : Volvo Trucks</p>
              <p className="text-sm text-orange-600">About To Go On A Trip</p>
            </div>
            {/* <div>
              <p className="text-2xl font-bold">486 Km</p>
              <p className="text-sm text-gray-600">Traveled</p>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">20°C</p>
            <p className="text-sm text-gray-600">Temperature</p>
          </div> */}
          
        </div>
        {/* <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">
          <img
            src="https://img.fleetowner.com/files/base/ebm/fleetowner/image/2024/01/65a8277960bb88001ee41239-imc_lightweight_internationals.png?auto=format,compress&fit=crop&q=45&h=356&height=356&w=640&width=640"
            alt="truckImg"
            className="h-full w-3/4"
          />
        </div> */}
      </div>
    </div>
  );
}