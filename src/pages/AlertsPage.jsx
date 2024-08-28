import React, { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Radar } from 'lucide-react'
import AlertsList from '../components/AlertsList'

export default function AlertsPage() {
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const fetchReports = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/reports', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setReports(data)
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  const handleReload = () => {
    fetchReports()
  }

  const handleSendRequest = () => {
    setIsSending(true)
    const data = JSON.stringify({ target: process.env.REACT_APP_RESCAN_TARGET })
    const blob = new Blob([data], { type: 'application/json' })
    
    if (navigator.sendBeacon(process.env.REACT_APP_RESCAN_URI, blob)) {
      console.log('Request sent successfully')
    } else {
      console.error('Failed to send request')
    }
    
    setTimeout(() => setIsSending(false), 1000) // Reset sending state after 1 second
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-2">Alerts</h2>
          <button
            onClick={handleReload}
            className={`ml-2 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Reload Alerts"
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
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <RefreshCw className="h-8 w-8 animate-spin text-neutral-400" />
        </div>
      ) : (
        <AlertsList reports={reports} />
      )}
    </div>
  )
}