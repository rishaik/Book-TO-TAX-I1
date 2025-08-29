import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList, CartesianGrid
} from 'recharts';

const chartData = [
  { name: 'Book Inc.', y2022: 189.22, y2021: 34920 },
  { name: 'Taxes', y2022: 18.21, y2021: 2.74 },
  { name: 'PBT', y2022: 27.56, y2021: 11920 },
  { name: 'Perms', y2022: 27.56, y2021: 1560 },
  { name: 'Temps', y2022: 126.5, y2021: 123.04 },
  { name: 'Foreign', y2022: 3160, y2021: 3150 },
  { name: 'Tax Inc. Line 28', y2022: 0.048, y2021: 32060 },
  { name: 'NOL', y2022: 28000, y2021: 32000 }, // dummy for visual
  { name: 'DRD', y2022: 0, y2021: 0 }, // dummy for visual
];

const summaryRows = [
  {
    year: '2022',
    'Book Inc.': 189.22,
    Taxes: 18.21,
    PBT: 27.56,
    Perms: 27.56,
    Temps: 126.5,
    Foreign: 3160,
    'Tax Inc. Line 28': 0.048,
  },
  {
    year: '2021',
    'Book Inc.': 34920,
    Taxes: 2.74,
    PBT: 11920,
    Perms: 1560,
    Temps: 123.04,
    Foreign: 3150,
    'Tax Inc. Line 28': 32060,
  },
];

const columns = [
  'Year',
  'Book Inc.',
  'Taxes',
  'PBT',
  'Perms',
  'Temps',
  'Foreign',
  'Tax Inc. Line 28',
];

function formatValue(val) {
  if (typeof val === 'number') {
    return `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return val;
}

export default function SummaryView() {
  // Calculate Change row
  const changeRow = { year: 'Change' };
  for (let col of columns.slice(1)) {
    const v2022 = summaryRows[0][col];
    const v2021 = summaryRows[1][col];
    changeRow[col] = v2022 !== undefined && v2021 !== undefined ? +(v2022 - v2021).toFixed(2) : '';
  }

  return (
    <div style={{ margin: '2.5rem 0', padding: '0 1.5rem' }}>
      {/* Chart Container */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)', padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#1e293b' }}>Taxable Income Summary (2022 vs 2021)</div>
        <div style={{ width: '100%', height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 16, right: 32, left: 32, bottom: 16 }}
              barCategoryGap={36}
            >
              <CartesianGrid stroke="#e5e7eb" horizontal vertical={false} />
              <XAxis type="number" domain={[0, 36000]} tick={{ fontSize: 13 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 16, fontWeight: 500, fill: '#374151' }} width={170} interval={0} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => formatValue(v)} contentStyle={{ fontSize: 14 }} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="rect"
                wrapperStyle={{ paddingTop: 18, fontSize: 15, fontWeight: 500, color: '#374151', display: 'flex', gap: 24 }}
                payload={[
                  { value: '2022', type: 'rect', color: '#2563eb', id: '2022' },
                  { value: '2021', type: 'rect', color: '#374151', id: '2021' },
                ]}
              />
              <Bar dataKey="y2022" fill="#2563eb" radius={[6, 6, 6, 6]} name="2022" barSize={28} barGap={10}>
                <LabelList dataKey="y2022" position="right" formatter={formatValue} fontSize={14} fill="#2563eb" />
              </Bar>
              <Bar dataKey="y2021" fill="#374151" radius={[6, 6, 6, 6]} name="2021" barSize={28} barGap={10}>
                <LabelList dataKey="y2021" position="right" formatter={formatValue} fontSize={14} fill="#374151" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Table Container */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)', padding: '2rem', marginBottom: '2.5rem' }}>
        <div className="drag-row-groups mb-2">Drag here to set row groups</div>
        <div className="table-container" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <table className="data-table" style={{ minWidth: 900, borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} style={{ background: '#f8fafc', fontWeight: 700, fontSize: 15, color: '#1e293b', borderBottom: '2px solid #e5e7eb', borderTop: 'none', borderLeft: 0, borderRight: 0 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...summaryRows, changeRow].map((row, i) => (
                <tr key={i}
                  style={{
                    background: row.year === 'Change' ? '#eff6ff' : i % 2 === 1 ? '#f8fafc' : '#fff',
                    fontWeight: row.year === 'Change' ? 700 : 400,
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  {columns.map((col, j) => (
                    <td
                      key={col}
                      style={{
                        textAlign: j === 0 ? 'left' : 'right',
                        padding: '10px 12px',
                        borderRight: j === columns.length - 1 ? 'none' : '1px solid #e5e7eb',
                        borderLeft: 0,
                        borderTop: 0,
                        borderBottom: row.year === 'Change' ? '2px solid #2563eb' : '1px solid #e5e7eb',
                        fontSize: 15,
                        color: row.year === 'Change' ? '#2563eb' : '#212529',
                      }}
                    >
                      {formatValue(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="footer">Rows: 3</div>
        </div>
      </div>
    </div>
  );
}
