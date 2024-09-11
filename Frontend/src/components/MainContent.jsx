import React from 'react';

const [selectedVehicle, setSelectedVehicle] = useState("POLESTAR 1");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Vehicle maintenance due for Tesla Roadster",
      read: false,
    },
    { id: 2, message: "Polestar 1 has completed its trip", read: false },
    { id: 3, message: "Low fuel alert for Hyundai Ioniq 5", read: false },
  ]);

function MainContent() {
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };

      const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen);
      };

      const toggleNotificationRead = (id) => {
        setNotifications(
          notifications.map((notif) =>
            notif.id === id ? { ...notif, read: !notif.read } : notif
          )
        );
      };

    const isSidebarOpen = true; 
    const searchQuery = '';
    const unreadCount = 0; 
    const isNotificationOpen = true; 
    const notifications = []; 

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            onClick={toggleSidebar}
                            className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {isSidebarOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Dashboard
                        </h1>
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
                                            className={`p-4 ${notif.read ? "bg-gray-100" : "bg-white"}`}
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
        </div>
    );
}

export default MainContent;
