import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, PieChart, TriangleAlert, Settings } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/endpoints", icon: LayoutGrid, label: "Endpoints" },
    { to: "/alerts", icon: TriangleAlert, label: "Alerts" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-[#111] p-4">
      <div className="mb-8 ml-10">
        <h1 className="text-2xl font-bold">
        <span className="italic">Flipkart</span> 
        <img src="./logo.png" alt="Logo" className="inline-block h-10 w-10 ml-3" />
      </h1>
      </div>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `w-full flex items-center justify-start p-2 text-white rounded ${
                isActive ? 'bg-blue-600' : 'hover:bg-blue-600'
              }`
            }
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}