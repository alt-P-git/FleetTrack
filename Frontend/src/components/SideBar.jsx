import React, { useEffect, useState } from 'react';
import { LogIn, LogOut, Menu, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Hamburger from './Hamburger';

const apiUrl = process.env.REACT_APP_API_URL;

const useUserData = () => {
  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/login/success`, { withCredentials: true });
        setUserdata(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, []);

  return userdata;
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userdata = useUserData();
  const navigate = useNavigate();

  const loginwithgoogle = () => {
    window.open(`${apiUrl}/auth/google/callback`, "_self");
  };

  const logout = () => navigate('/logout');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${isSidebarOpen ? "w-80" : "w-20"} bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-screen`}>
      <div className="flex items-center justify-between p-2 h-30">
        <img
          src="https://i.ibb.co/pWQ16dv/logo.webp"
          alt="FleetKu Logo" className="h-full w-auto object-contain"
        />
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <nav className="flex-grow mt-8">
        <a href="/dashboard" className="flex items-center py-2 px-4 bg-indigo-600 text-white">
          <span className="mr-2">📊</span> {isSidebarOpen && "Dashboard"}
        </a>
        <a href="/" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">🏠</span> {isSidebarOpen && "Home"}
        </a>
        <a href="/AddRoute" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">🛣️</span> {isSidebarOpen && "Add Route"}
        </a>
        <a href="/ViewRoutes" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">🛣️</span> {isSidebarOpen && "Routes"}
        </a>
        <a href="/VehicleData" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">🚗</span> {isSidebarOpen && "Vehicles"}
        </a>
        <a href="/DriverData" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">👤</span> {isSidebarOpen && "Drivers"}
        </a>
      </nav>
      <div className="p-4 mt-auto">
        {Object.keys(userdata).length > 0 ? (
          <div className="flex items-center text-gray-600 hover:text-gray-800">
            <img src={userdata.image} className="w-8 h-8 rounded-full mr-2" alt="User" />
            {isSidebarOpen && <span className="mr-2">{userdata.displayName}</span>}
            <button onClick={logout} className="flex items-center">
              <LogOut className="w-5 h-5 mr-2" />
              {isSidebarOpen && "Logout"}
            </button>
          </div>
        ) : (
          <button onClick={loginwithgoogle} className="flex items-center text-gray-600 hover:text-gray-800">
            <LogIn className="w-5 h-5 mr-2" />
            {isSidebarOpen && "Login"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;