import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Radar } from 'lucide-react';
import AlertsVisualization from '../components/AlertsVisualization';
import AlertsPanel from '../components/AlertsPanel';
import ExecutingTasksPanel from '../components/ExecutingTasksPanel';
import StatisticsChart from '../components/StatisticsChart'; // Import the new component

export default function DashboardPage() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/reports`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to fetch reports. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleReload = () => {
    fetchReports();
  };

  const handleSendRequest = () => {
    setIsSending(true);
    const data = JSON.stringify({ target: process.env.REACT_APP_RESCAN_TARGET });
    const blob = new Blob([data], { type: 'application/json' });
    
    if (navigator.sendBeacon(process.env.REACT_APP_RESCAN_URI, blob)) {
      console.log('Request sent successfully');
    } else {
      console.error('Failed to send request');
    }
    
    setTimeout(() => setIsSending(false), 1000); // Reset sending state after 1 second
  };

  return (
    <div className="min-h-screen text-white p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-2">Security Dashboard</h1>
          <button
            onClick={handleReload}
            className={`ml-2 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Reload Dashboard"
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <button
          onClick={handleSendRequest}
          className={`bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors duration-200 flex items-center ${
            isSending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSending}
        >
          <Radar className={`h-5 w-5 mr-2 ${isSending ? 'animate-pulse' : ''}`} />
          Scan Again
        </button>
      </div>
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-12 w-12 animate-spin text-neutral-400" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 flex-grow">
          <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="bg-neutral-900 rounded-lg overflow-hidden flex-1 h-80" >
              <StatisticsChart apis={reports}/>
            </div>
            <div className="bg-neutral-900 rounded-lg overflow-hidden flex-1 h-80">
              <AlertsVisualization reports={reports} />
            </div>
            
          </div>
          <div className="flex flex-col md:flex-row gap-4 flex-grow">
            <div className="flex-1">
              <div className="bg-neutral-900 rounded-lg overflow-hidden h-96">
                <AlertsPanel reports={reports} />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-neutral-900 rounded-lg overflow-hidden h-96">
                <ExecutingTasksPanel apis={reports} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
