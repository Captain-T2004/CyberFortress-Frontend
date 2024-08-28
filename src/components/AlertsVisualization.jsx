import React from 'react';

const CircularProgress = ({ value, max, size, strokeWidth, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-yellow-500 shadow-[0_0_12px_2px_rgba(251,191,36,1)]"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};



const HorizontalProgress = ({ value, max, className }) => {
  const percentage = (value / max) * 100;
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2.5 ${className}`}>
      <div className="h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const AlertsVisualization = ({ reports }) => {
  const totalAlerts = reports.length;
  const riskDetected = reports.reduce((sum, api) => sum + (api.alerts?.filter(alert => ((alert.risk === 'Medium' && alert.confidence === 'High') || (alert.risk === 'High' && alert.confidence === 'High') ) ).length || 0), 0);
  const healthyAPIs = reports.length - reports.filter(api => api.alerts && api.alerts.length > 7).length;

return (
  <div className="bg-neutral-900 p-9 rounded-lg text-white">
    <div className="flex items-center mb-5 ml-40">
      <CircularProgress value={healthyAPIs} max={totalAlerts} size={250} strokeWidth={14}>
        <span className="text-2xl font-semibold">{healthyAPIs}/{totalAlerts}</span>
      </CircularProgress>
      <div className="ml-10 space-y-6">
        <div>
          <h3 className="font-bold mb-2 text-xl">Risk Detected</h3>
          <p className="text-xl mb-2">{riskDetected} Risk detected</p>
          <HorizontalProgress value={riskDetected} max={totalAlerts} className="bg-red-500">
            <div className="bg-red-500"></div>
          </HorizontalProgress>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-xl">Healthy API's</h3>
          <p className="text-xl mb-2">{healthyAPIs} Healthy API's</p>
          <HorizontalProgress value={healthyAPIs} max={reports.length} className="bg-green-500">
            <div className="bg-green-500"></div>
          </HorizontalProgress>
        </div>
      </div>
    </div>
  </div>
);

};

export default AlertsVisualization;