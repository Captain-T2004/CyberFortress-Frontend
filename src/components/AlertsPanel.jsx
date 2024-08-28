import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

const riskLevels = ["Low", "Medium", "High"];
const confidenceLevels = ["Low", "Medium", "High"];

const isAtLeastMedium = (level, scale) => {
  return scale.indexOf(level) >= scale.indexOf("Medium");
};

export default function AlertsPanel({ reports }) {
  const [openReportId, setOpenReportId] = useState(null);

  const toggleReport = (id) => {
    setOpenReportId(prevId => prevId === id ? null : id);
  };

  const filteredReports = reports.filter(report => 
    report.alerts && Array.isArray(report.alerts) && report.alerts.some(alert => 
      isAtLeastMedium(alert.risk, riskLevels) && 
      isAtLeastMedium(alert.confidence, confidenceLevels)
    )
  );

  return (
    <div className="bg-neutral-900 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Alerts</h2>
      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredReports.map((report, index) => {
          const alertsToShow = report.alerts ? report.alerts.filter(alert => 
            isAtLeastMedium(alert.risk, riskLevels) && 
            isAtLeastMedium(alert.confidence, confidenceLevels)
          ) : [];

          if (alertsToShow.length === 0) return null;

          return (
            <div key={report._id} className="rounded-md bg-neutral-800 overflow-hidden">
              <button 
                className="flex w-full items-center justify-between p-3 text-left"
                onClick={() => toggleReport(report._id)}
              >
                <div className="flex items-center flex-grow">
                  <span className="mr-3 rounded-full bg-neutral-700 px-2 py-1 text-sm">{index + 1}</span>
                  <span className="font-semibold text-sm text-red-500">path:</span>
                  <span className="text-sm ml-2 truncate">{report.path}</span>
                </div>
                <div className="flex items-center space-x-2 ml-2">
                  <span className="text-red-500 font-semibold text-sm">Alerts: {alertsToShow.length}</span>
                  {openReportId === report._id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>
              {openReportId === report._id && (
                <div className="p-3 bg-neutral-700 text-sm">
                  <h3 className="font-bold mb-2">Alerts:</h3>
                  <ul className="list-inside">
                    {alertsToShow.map((alert, alertIndex) => (
                      <li key={alertIndex} className="mb-2">
                        <p><strong>Alert:</strong> {alert.alert}</p>
                        <p><strong>Risk:</strong> {alert.risk}</p>
                        <p><strong>Confidence:</strong> {alert.confidence}</p>
                      </li>
                    ))}
                  </ul>
                  {report.methods && report.methods.map((method, methodIndex) => (
                    <div key={methodIndex} className="mt-2">
                      <p><strong>Method:</strong> {method.method}</p>
                      <p><strong>Description:</strong> {method.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}