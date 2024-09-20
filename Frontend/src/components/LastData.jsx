import React, { useState } from 'react';
import { Circle, MapPin, Plus } from 'react-feather';

const LastTrip = () => {

  return (
    <div className="w-full md:w-1/2 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Current Trips</h2>
      </div>
      <div className="space-y-4 overflow-y-auto">
        {[
          { time1: '20:00', location1: 'Gwalior, Madhya Pradesh', time2: '21:34', distance: '17 Km', location2: 'Jabalpur, Madhyapradesh' },
          { time1: '17:34', location1: 'Ahemdabad, Gujrat', time2: '20:00', distance: '31 Km', location2: 'Tangerang, Batu Ceper' },
          { time1: '20:00', location1: 'Gwalior, Madhya Pradesh', time2: '21:34', distance: '17 Km', location2: 'Jabalpur, Madhyapradesh' },
          { time1: '17:34', location1: 'Ahemdabad, Gujrat', time2: '20:00', distance: '31 Km', location2: 'Tangerang, Batu Ceper' },
        ].map((trip, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center mr-4">
              <Circle className="w-3 h-3 text-indigo-600" />
              <div className="w-0.5 h-6 bg-gray-300"></div>
              <MapPin className="w-3 h-3 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{trip.time1}</span>
                <span className="text-gray-500">Polestar 1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{trip.location1}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-semibold">{trip.time2}</span>
                <span className="text-gray-500">{trip.distance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{trip.location2}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BrandFleet = ({ filteredVehicles, handleVehicleSelect }) => (
  <div className="w-full md:w-1/2 p-4 border-t md:border-t-0 md:border-l overflow-y-auto">
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-16">
        <span className="font-semibold">Brand</span>
        <span className="font-semibold">Fleet</span>
      </div>
      <div className="flex space-x-16">
        <span className="font-semibold">Plate no</span>
        <span className="font-semibold">Status</span>
      </div>
      <a href="#" className="text-blue-500 text-sm">See All</a>
    </div>
    <div className="space-y-2">
      {filteredVehicles.map((vehicle, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100 overflow-y-auto"
          onClick={() => handleVehicleSelect(vehicle.model)} >
          <div className="flex items-center space-x-4 w-1/2">
            <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-white text-xs">
              {vehicle.brand[0]}
            </div>
            <span className="text-indigo-600">{vehicle.model}</span>
          </div>
          <div className="flex items-center justify-between w-1/2">
            <span>{vehicle.plate}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                vehicle.status === "Active"
                  ? "bg-green-200 text-blue-800"
                  : vehicle.status === "Inactive"
                  ? "bg-red-100 text-red-1000"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {vehicle.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LastData = () => {
  const [searchQuery] = useState('');
  const [setSelectedVehicle] = useState(null);

  const handleVehicleSelect = (model) => {
    setSelectedVehicle(model);
  };


  const vehicles = [
    { 
        brand: "Tesla", 
        model: "Roadster", 
        plate: "HR00 4232", 
        status: "Active" 
    },
    { 
        brand: "Buggati", 
        model: "Nig", 
        plate: "AP00 B1006", 
        status: "Active" 
    },
    {
      brand: "Polestar",
      model: "Polestar 1",
      plate: "MP00 KH123",
      status: "Inactive",
    },
    {
      brand: "Hyundai",
      model: "Ioniq 5",
      plate: "GUJ00 AB1293",
      status: "Parking",
    },
    {
        brand: "Tata Motors",
        model: "TATATA",
        plate: "UP00 AHD111",
        status: "Active",
    },
    {
        brand: "Tata Motors",
        model: "TATATA",
        plate: "UP00 AHD111",
        status: "Parking",
    },
    { 
        brand: "Tesla", 
        model: "Roadster", 
        plate: "HR00 4232", 
        status: "Active" 
    },
    { 
        brand: "Buggati", 
        model: "Nig", 
        plate: "AP00 B1006", 
        status: "Active" 
    },
  ];

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg mb-6 flex flex-col md:flex-row">
      <LastTrip searchQuery={searchQuery} />
      <BrandFleet filteredVehicles={filteredVehicles} handleVehicleSelect={handleVehicleSelect} />
    </div>
  );
};

export default LastData;



// const ExpenseCards = () => (
//   <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//     {[
//       { icon: '⛽', amount: '$1000', label: 'Gas Station', bgColor: 'bg-blue-50', iconBgColor: 'bg-blue-100', iconColor: 'text-blue-500' },
//       { icon: '🛢️', amount: '$237', label: 'Oil', bgColor: 'bg-green-50', iconBgColor: 'bg-green-100', iconColor: 'text-green-500' },
//       { icon: '🚿', amount: '$50', label: 'Car Wash', bgColor: 'bg-purple-50', iconBgColor: 'bg-purple-100', iconColor: 'text-purple-500' },
//       { icon: '🛣️', amount: '$541', label: 'Toll', bgColor: 'bg-yellow-50', iconBgColor: 'bg-yellow-100', iconColor: 'text-yellow-500' }
//     ].map((card, index) => (
//       <div key={index} className={`${card.bgColor} p-4 rounded-lg`}>
//         <div className="flex justify-between items-center mb-2">
//           <div className={`${card.iconBgColor} w-8 h-8 rounded-full flex items-center justify-center`}>
//             <span className={card.iconColor}>{card.icon}</span>
//           </div>
//           <span className="text-2xl font-bold">{card.amount}</span>
//         </div>
//         <p className="text-sm text-gray-600">{card.label}</p>
//       </div>
//     ))}
    // <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
    //   <Plus className="w-6 h-6 text-gray-400" />
    // </div>
//   </div>
// );