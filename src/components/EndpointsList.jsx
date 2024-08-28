import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const HealthBar = ({ percentage }) => (
  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
    <div 
      className={`h-full ${percentage === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
      style={{ width: `${percentage}%` }}
    />
  </div>
);

const getStatus = (alerts) => {
  const highRiskAlert = alerts.some(alert => 
    ['High', 'Critical', 'Medium'].includes(alert.risk)
  );
  return highRiskAlert ? 'Alert' : 'Ready';
};

const getHealthPercentage = (alerts) => {
  const highRiskAlert = alerts.some(alert => 
    ['High', 'Critical', 'Medium'].includes(alert.risk)
  );
  return highRiskAlert ? 70 : 100; // You can adjust this value between 65-70
};

export default function EndpointsList({ apis }) {
  const [openReportId, setOpenReportId] = useState(null);

  const toggleReport = (id) => {
    setOpenReportId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {apis.map((api) => {
        const status = getStatus(api.alerts || []);
        const healthPercentage = getHealthPercentage(api.alerts || []);
        return (
          <div key={api._id} className="rounded-md bg-neutral-800 overflow-hidden">
            <button 
              className="flex w-full items-center justify-between p-4 text-left"
              onClick={() => toggleReport(api._id)}
            >
              <div className="flex items-center flex-grow">
                <span className="mr-4 rounded-full bg-neutral-700 px-2 py-1">{apis.indexOf(api) + 1}</span>
                <span className="font-semibold ml-3 flex-grow">{api.path}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full ${status === 'Alert' ? 'bg-red-500' : 'bg-lime-500'} text-black text-xs font-semibold`}>
                  {status}
                </span>
                <HealthBar percentage={healthPercentage} />
                {openReportId === api._id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>
            {openReportId === api._id && (
              <div className="p-4 bg-neutral-700">
                <h3 className="font-bold mb-2">Methods:</h3>
                {api.methods.map((method, methodIndex) => (
                  <div key={methodIndex} className="mb-4 mr-10 ml-5">
                    <p><strong>Method:</strong> {method.method}</p>
                    <p><strong>Description:</strong> {method.description}</p>
                    <h4 className="font-semibold mt-2">Responses:</h4>
                    {Object.entries(method.responses).map(([code, response]) => (
                      <div key={code} className="ml-4 mt-2">
                        <p><strong>Status {code}:</strong> {response.description}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}