import React, { useState } from 'react';

export default function DiagnosticsCharts() {
  const [activeDiagTab, setActiveDiagTab] = useState('Workflow Status');

  const charts = {
    'Workflow Status': {
      data: [
        { label: 'Not Started', value: 30, color: '#F87171' },
        { label: 'In Progress', value: 20, color: '#FBBF24' },
        { label: 'Completed', value: 50, color: '#6EE7B7' },
      ],
      total: 576,
      legend: [
        { label: 'Not Started', value: '30%', color: '#F87171' },
        { label: 'In Progress', value: '20%', color: '#FBBF24' },
        { label: 'Completed', value: '50%', color: '#6EE7B7' },
      ],
    },
    'Documentation Status': {
      data: [
        { label: 'Missing', value: 30, color: '#F87171' },
        { label: 'In Review', value: 20, color: '#FBBF24' },
        { label: 'Completed', value: 50, color: '#6EE7B7' },
      ],
      total: 576,
      legend: [
        { label: 'Missing', value: '30%', color: '#F87171' },
        { label: 'In Review', value: '20%', color: '#FBBF24' },
        { label: 'Completed', value: '50%', color: '#6EE7B7' },
      ],
    },
    'ES Filing Status': {
      data: [
        { label: 'Over Due', value: 4, color: '#F87171' },
        { label: 'Due in > 30 Days', value: 6, color: '#FBBF24' },
        { label: 'Due in > 60 days', value: 10, color: '#6EE7B7' },
        { label: 'Filed in last 6 months', value: 10, color: '#A7F3D0' },
      ],
      total: 576,
      legend: [
        { label: 'Over Due', value: '4', color: '#F87171' },
        { label: 'Due in > 30 Days', value: '6', color: '#FBBF24' },
        { label: 'Due in > 60 days', value: '10', color: '#6EE7B7' },
        { label: 'Filed in last 6 months', value: '10', color: '#A7F3D0' },
      ],
    },
  };

  const chart = charts[activeDiagTab];

  function DonutChart({ data, total }) {
    const radius = 48;
    const stroke = 10; // thinner lines for donut
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    let offset = 0;
    return (
      <svg width={radius * 2} height={radius * 2}>
        {data.map((d, index) => {
          const value = d.value;
          const percent = typeof value === 'number' && total > 0 ? value / total : 0;
          const dash = percent * circumference;
          const dashArray = `${dash} ${circumference - dash}`;
          const el = (
            <circle
              key={index}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              fill="transparent"
              stroke={d.color}
              strokeWidth={stroke}
              strokeDasharray={dashArray}
              strokeDashoffset={-offset}
              style={{ transition: 'stroke-dasharray 0.3s' }}
            />
          );
          offset += dash;
          return el;
        })}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#1F2937"
          fontSize="18"
          fontWeight="600"
        >
          {total}
        </text>
        <text
          x="50%"
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="10"
        >
          Total
        </text>
      </svg>
    );
  }

  return (
    <div className="w-full mt-8 px-4 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
      {/* Show all charts side by side always */}
      <div className="diagnostics-charts-row w-full flex flex-row justify-between items-stretch gap-8 mt-8">
        {Object.keys(charts).map((title) => (
          <div key={title} className="flex-1 flex flex-col items-center min-w-[260px] max-w-[340px] bg-white rounded-lg shadow-sm p-6 mx-2">
            <h3
              className={`font-bold text-lg mb-2 text-left w-full`}
            >
              {title}
            </h3>
            <div className="flex flex-row items-center">
              <div className="relative flex flex-col items-center justify-center">
                <DonutChart data={charts[title].data} total={charts[title].total} />
              </div>
              <div className="ml-8 flex flex-col gap-2">
                {charts[title].legend.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ background: item.color }}
                    ></span>
                    <span>{item.label}</span>
                    <span className="ml-1 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
