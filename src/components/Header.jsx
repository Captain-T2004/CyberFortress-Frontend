import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut } from "lucide-react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    // Implement your sign out logic here
    console.log("Signing out...");
  };

  return (
    <header className="flex items-center justify-between p-4">
      <h2 className="text-xl">
        <span className="text-blue-400">Hey Akshay</span>, welcome back!
      </h2>
      <div className="flex items-center space-x-4">
        <Link to="/alerts" className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full">
          <Bell className="h-6 w-6 text-blue-400" />
        </Link>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            AK
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 text-left"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;