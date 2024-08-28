import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

const riskLevels = ["Low", "Medium", "High"];
const confidenceLevels = ["Low", "Medium", "High"];

const isAtLeastMedium = (level, scale) => {
  return scale.indexOf(level) >= scale.indexOf("Medium");
};

export default function AlertsList({ reports }) {
  const [openReportId, setOpenReportId] = useState(null);

  const toggleReport = (id) => {
    setOpenReportId(prevId => prevId === id ? null : id);
  };

  const filteredReports = reports.filter(report => 
    report.alerts.some(alert => 
      isAtLeastMedium(alert.risk, riskLevels) && 
      isAtLeastMedium(alert.confidence, confidenceLevels)
    )
  );

  return (
    <div className="space-y-4">
      {filteredReports.map((report, index) => {
        const alertsToShow = report.alerts.filter(alert => 
          isAtLeastMedium(alert.risk, riskLevels) && 
          isAtLeastMedium(alert.confidence, confidenceLevels)
        );

        if (alertsToShow.length === 0) return null;

        return (
          <div key={report._id} className="rounded-md bg-neutral-800 overflow-hidden">
            <button 
              className="flex w-full items-center justify-between p-4 text-left"
              onClick={() => toggleReport(report._id)}
            >
              <div className="flex items-center">
                <span className="mr-6 rounded-full bg-neutral-700 px-2 py-1">{index + 1}</span>
                <span className="font-semibold ml-3 text-red-600">path:</span>
                <span className="text-white ml-4">{report.path}</span>
              </div>
              <div className="flex items-center space-x-2 ml-20">
                <span className="text-red-600 font-semibold text-right">Alerts:</span>
                <span className="text-red-600 font-semibold">{report.alerts[0].alert}</span>
              </div>
              <div className="flex items-center ml-4">
                {openReportId === report._id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>
            {openReportId === report._id && (
              <div className="p-4 bg-neutral-700">
                <h3 className="font-bold mb-2">Alerts:</h3>
                <ul className="list-inside">
                  {alertsToShow.map((alert, alertIndex) => (
                    <li key={alertIndex} className="mb-4 mr-10">
                      <p><strong>Alert:</strong> {alert.alert}</p>
                      <p><strong>Risk:</strong> {alert.risk}</p>
                      <p><strong>Confidence:</strong> {alert.confidence}</p>
                    </li>
                  ))}
                </ul>
                {report.methods.map((method, methodIndex) => (
                  <div key={methodIndex} className="mb-4">
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
  );
}