import React, { useState, useEffect, useCallback } from 'react'
import { ChevronDown, Search, RefreshCw } from 'lucide-react'
import EndpointsList from '../components/EndpointsList'

const projects = ['Flipkart P1', 'Flipkart P2', 'Flipkart P3', 'Flipkart P4']

export default function EndpointsPage() {
  const [apis, setApis] = useState([])
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchApis = useCallback(async () => {
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
      setApis(data)
    } catch (error) {
      console.error('Error fetching apis:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchApis()
  }, [fetchApis])

  const handleReload = () => {
    fetchApis()
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold mr-2">API Endpoints</h2>
          <button
            onClick={handleReload}
            className={`ml-2 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Reload API Endpoints"
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
          <div className="relative w-full sm:w-48">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-neutral-800 w-full px-4 py-2 rounded flex items-center justify-between text-white"
            >
              <span>{selectedProject}</span>
              <ChevronDown size={20} />
            </button>
            {isOpen && (
              <ul className="absolute z-10 w-full bg-neutral-800 mt-1 rounded shadow-lg">
                {projects.map((project) => (
                  <li
                    key={project}
                    className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-white"
                    onClick={() => {
                      setSelectedProject(project)
                      setIsOpen(false)
                    }}
                  >
                    {project}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search endpoints"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-800 w-full px-4 py-2 rounded pl-10 text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <RefreshCw className="h-8 w-8 animate-spin text-neutral-400" />
        </div>
      ) : (
        <EndpointsList apis={apis.filter(api => api.path.toLowerCase().includes(searchQuery.toLowerCase()))} />
      )}
    </div>
  )
}