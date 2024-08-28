import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector } from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent === 0) {
    return null; // Don't render anything if the percentage is 0
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  const sin = Math.sin(-RADIAN * startAngle);
  const cos = Math.cos(-RADIAN * startAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
    </g>
  );
};

const StatisticsPieChart = ({ apis }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Extract all alerts from the APIs
  let allAlerts = apis.flatMap(api => api.alerts || []);
  
  // Filter out alerts where alertOrNot is "0" and risk confidence is below 'Medium'
  allAlerts = allAlerts.filter(alert => alert.alertOrNot !== "0" && ['Medium', 'High'].includes(alert.confidence));

  // Categorize alerts by risk level
  const riskCategories = { Healthy: 0, Low: 0, Medium: 0, High: 0 };

  allAlerts.forEach(alert => {
    switch (alert.risk) {
      case 'Low':
        riskCategories.Low++;
        break;
      case 'Medium':
        riskCategories.Medium++;
        break;
      case 'High':
        riskCategories.High++;
        break;
      default:
        riskCategories.Healthy++;
        break;
    }
  });

  console.log(allAlerts)

  const totalAlerts = allAlerts.length;
  const data = Object.keys(riskCategories).map(key => ({
    name: key,
    value: totalAlerts > 0 ? (riskCategories[key] / totalAlerts) * 100 : 0,
    color: key === 'Healthy' ? '#4ade80' : key === 'Low' ? '#3b82f6' : key === 'Medium' ? '#f97316' : '#ef4444'
  }));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-lg text-white">
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
        
          <PieChart>
            <defs>
              {data.map((entry, index) => (
                <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
              ))}
            </Pie>
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="bottom"
              iconType="circle"
              iconSize={14}
              wrapperStyle={{
                right: -0, // Move the legend further to the right
                paddingRight: '10px', // Add additional padding if necessary
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsPieChart;
