import React from 'react';
import { UserCircle } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-gray-300 p-6 md:p-10">
      <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-10">
          <div className="w-32 h-32 bg-neutral-800 rounded-full flex items-center justify-center">
            <UserCircle className="w-24 h-24 text-neutral-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Profile Picture</h2>
            <button className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600 transition-colors">
              Upload New Photo
            </button>
          </div>
        </div>

        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-400 mb-2">Full name</label>
              <input 
                id="fullname" 
                type="text" 
                placeholder="Enter your full name" 
                className="w-full px-4 py-2 bg-neutral-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-neutral-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <input 
                id="username" 
                type="text" 
                placeholder="Enter your username" 
                className="w-full px-4 py-2 bg-neutral-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone number</label>
              <input 
                id="phone" 
                type="tel" 
                placeholder="Enter your phone number" 
                className="w-full px-4 py-2 bg-neutral-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
            <textarea 
              id="bio" 
              placeholder="Write your bio here..." 
              className="w-full px-4 py-2 bg-neutral-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-neutral-600" 
              rows={4}
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <button type="submit" className="px-6 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600 transition-colors">
                Update Profile
              </button>
              <button type="reset" className="px-6 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition-colors">
                Reset
              </button>
            </div>
            <button type="button" className="text-red-500 hover:text-red-400 transition-colors">
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;