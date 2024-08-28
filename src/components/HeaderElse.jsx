import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, Lock, LogOut } from "lucide-react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    // Implement your sign out logic here
    console.log("Signing out...");
  };

  return (
    <header className="flex items-center justify-between p-4">
      <h2 className="text-2xl flex items-center justify-center">
        <span className="font-extrabold text-amber-400 tracking-wide">
          Cyber Fortress
        </span>
        <span className="ml-2">
          <Lock className="h-6 w-6 text-amber-400" />
        </span>
      </h2>
      <div className="flex items-center space-x-4">
        <Link to="/alerts" className="focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full">
                    <Bell className="h-6 w-6 text-blue-400" />

        </Link>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full"
          >
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
              AK
            </div>
            <ChevronDown className={`h-4 w-4 ml-1 text-gray-600 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
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
}