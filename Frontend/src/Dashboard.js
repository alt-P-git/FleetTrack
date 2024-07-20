import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddRoute from './AddRoute';
import ViewRoutes from './ViewRoutes';
import VehicleData from './VehicleData';
import ViewRoute from './ViewRoute';
import axios from 'axios';
import './Dashboard.css';
import Headers from './Navbar';

const apiUrl = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [tripData, setTripData] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [routeId, setrouteId] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [vehicleCoordinate, setVehicleCoordinate] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);

  const fetchTripData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tripdata`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error fetching trip data:', error);
    }
  };

  useEffect(() => {
    fetchTripData().then(setTripData);
  }, []);

  const handleTripClick = (tripId, routeId, vehicleId) => {
    console.log('Trip clicked:', tripId, routeId, vehicleId);
    setSelectedTripId(tripId);
    setrouteId(routeId);
    setVehicleId(vehicleId);
    fetchVehicleData()
      .catch(console.error);
  };

  const fetchVehicleData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/vehicledata`, { withCredentials: true });
      console.log('Vehicle data:', response.data);
      setVehicleData(response.data);

      console.log('Current vehicle ID:', vehicleId);
      const selectedVehicle = response.data.find(vehicle => vehicle.vehicle_id === vehicleId);
      if (selectedVehicle) {
        setVehicleCoordinate(selectedVehicle.last_location);
      }
      console.log('Selected vehicle:', selectedVehicle);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchVehicleData()
        .catch(console.error);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const stringToDate = (date_time) => {
    if (date_time) {
      const date = new Date(date_time);
      return date.toLocaleString();
    }
    return "No details available";
  }

  return (
    <div className="Dashboard">
      <div className="dashNavbar">
        <Headers />
      </div>

      <div className="listMapContainer">
        <div className="tripList">
          <h2>Trips:</h2>
          {tripData &&
            tripData.map((trip) => (
              <div
                key={trip.tripId}
                className={`tripItem ${selectedTripId === trip.tripId ? 'selected' : ''}`}
                onClick={() => handleTripClick(trip.tripId, trip.routeId, trip.vehicleId)}
              >
                <span className="tripName">{trip.tripId} {trip.routeName}</span>
                {selectedTripId === trip.tripId && (
                  <div className="tripDetails">
                    <p>
                      <strong>Vehicle ID:</strong> {trip.vehicleId}
                    </p>
                    <p>
                      <strong>Driver name:</strong> {trip.driverId}
                    </p>
                    <p>
                      <strong>Extra info:</strong> {trip.info}
                    </p>
                    <p>
                      <strong>Start Time:</strong> {stringToDate(trip.trip_start_date_time)}
                    </p>
                    <p>
                      <strong>End Time:</strong> {stringToDate(trip.trip_end_date_time)}
                    </p>
                    <p>
                      <strong>Status:</strong> {trip.tripStatus}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="tripMapContainer">
          {routeId && <ViewRoute routeId={routeId} vehicleCoordinate={vehicleCoordinate} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;