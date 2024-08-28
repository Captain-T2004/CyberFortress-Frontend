import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const isInProgress = (api) => {
  return !api.alerts || api.alerts.length === 0;
};

export default function ExecutingTasksPanel({ apis }) {
  const [openApiId, setOpenApiId] = useState(null);

  const toggleApi = (id) => {
    setOpenApiId(prevId => (prevId === id ? null : id));
  };

  const inProgressApis = apis.filter(isInProgress);

  return (
    <div className="bg-neutral-900 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Currently Executing</h2>
      {inProgressApis.length === 0 ? (
        <p className="text-neutral-400">No tasks currently in progress.</p>
      ) : (
        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {inProgressApis.map((api, index) => (
            <div key={api._id} className="rounded-md bg-neutral-800 overflow-hidden">
              <button 
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() => toggleApi(api._id)}
              >
                <div className="flex items-center flex-grow">
                  <span className="mr-4 rounded-full bg-neutral-700 px-2 py-1">{index + 1}</span>
                  <span className="font-semibold ml-3 flex-grow">{api.path}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-2 py-1 rounded-full bg-yellow-500 text-black text-xs font-semibold">
                    In Progress
                  </span>
                  {openApiId === api._id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>
              {openApiId === api._id && (
                <div className="p-4 bg-neutral-700">
                  <h3 className="font-bold mb-2">Methods:</h3>
                  {api.methods && api.methods.length > 0 ? (
                    api.methods.map((method, methodIndex) => (
                      <div key={methodIndex} className="mb-4 mr-10 ml-5">
                        <p><strong>Method:</strong> {method.method}</p>
                        <p><strong>Description:</strong> {method.description}</p>
                        {method.responses && Object.entries(method.responses).length > 0 && (
                          <>
                            <h4 className="font-semibold mt-2">Responses:</h4>
                            {Object.entries(method.responses).map(([code, response]) => (
                              <div key={code} className="ml-4 mt-2">
                                <p><strong>Status {code}:</strong> {response.description}</p>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-400">No methods information available.</p>
                  )}
                  <p className="mt-2 text-yellow-500">This API is currently being processed.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}