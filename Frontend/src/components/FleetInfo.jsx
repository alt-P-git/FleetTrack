import React from "react";
import { Map } from "react-feather";


export default function FleetInfo({ selectedVehicle }) {
  return (
    <div className="bg-white shadow rounded-lg mb-6 flex flex-col md:flex-row w-full h-3/4">
      <div className="w-full md:w-3/4 p-4">
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-100 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Map className="w-24 h-24 text-blue-500 opacity-25" />
          </div>
          <div className="absolute top-4 left-4 bg-white p-2 rounded shadow z-10">
            <h3 className="font-semibold text-gray-700">Fleet Location</h3>
          </div>
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow z-10">
            <p className="text-sm text-gray-600">Zoom: 100%</p>
          </div>
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-yellow-500 rounded-full"></div>
        </div>
      </div>
      <div className="w-full md:w-2/4 p-4">
        <h2 className="text-xl font-semibold mb-4">My Fleet</h2>
        <div className="bg-indigo-100 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            {selectedVehicle}
          </h3>
          <p className="text-2xl font-semibold">Fleet1</p>
          <div className="flex justify-between mb-2">
            
            <div>
              <p className="text-2xl font-bold">135 Km/h</p>
              <p className="text-sm text-gray-600">Speed</p>
            </div>
            <div>
              <p className="text-2xl font-bold">486 Km</p>
              <p className="text-sm text-gray-600">Traveled</p>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">20°C</p>
            <p className="text-sm text-gray-600">Temperature</p>
          </div>
        </div>
        <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-photo/truck-with-white-trailer-that-says-scania-side_123827-23486.jpg"
            alt="truckImg"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}