// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './Header.css';
// import Extras from './Extras';

// const apiUrl = process.env.REACT_APP_API_URL;

// const useUserData = () => {
//     const [userdata, setUserdata] = useState({});

//     useEffect(() => {
//         const getUser = async () => {
//             try {
//                 const response = await axios.get(`${apiUrl}/login/success`, { withCredentials: true });
//                 setUserdata(response.data.user);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         getUser();
//     }, []);

//     return userdata;
// };

// const Header = () => {
//     const userdata = useUserData();
//     const extrasRef = useRef(null);

//     useEffect(() => {
//         if (Object.keys(userdata).length !== 0) {
//             extrasRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [userdata]);

//     const handleGetStarted = () => {
//         if (Object.keys(userdata).length === 0) {
//             alert('Please login first');
//         } else {
//             window.location.href = `${apiUrl}/dashboard`;
//         }
//     };

//     return (
//         <div className='header'>
//             <div className="sidecontentryt">
//                 <h2>Track your fleet with ease</h2>
//                 <p>Monitor your vehicles in real-time and optimize your routes with Fleet-Track.</p>
//                 {/* <button className='getstr' onClick={() => window.location.href='../components/Extras'}>Get Started</button> */}
//                 {/* <Link to="/Extras" className='getstr'>Get Started</Link> */}
//             </div>
//             <div className='header-contents'>
//                 <h2>Fleet-Track</h2>
//             </div>
//             <div ref={extrasRef}>
//                 {/* <Extras /> */}
//             </div>
//         </div>
//     );
// };

// export default Header;

import React from "react";
import { Menu, X, Search, Bell } from "react-feather";

export default function Header({
  isSidebarOpen,
  toggleSidebar,
  searchQuery,
  handleSearchChange,
  unreadCount,
  toggleNotifications,
  isNotificationOpen,
  notifications,
  toggleNotificationRead,
}) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-2xl font-bold bg-white text-black">Dashboard</h1>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 ${notif.read ? "bg-gray-100" : "bg-white"
                      }`}
                  >
                    <p className="text-sm text-gray-600">{notif.message}</p>
                    <button
                      onClick={() => toggleNotificationRead(notif.id)}
                      className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      {notif.read ? "Mark as unread" : "Mark as read"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}