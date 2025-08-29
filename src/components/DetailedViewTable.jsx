import React from 'react';

const detailedViewRows = [
  {
    ac: '001-6440-000', desc: 'Product Revenue', book: 120000, reclass: 5000, adjBook: 125000, taxAdj: 2000, adjTax: 127000, py: 110000, pyTax: 112000, var: '15.2%'
  },
  {
    ac: '002-6290-000', desc: 'Service Revenue', book: 85000, reclass: 0, adjBook: 85000, taxAdj: -1500, adjTax: 83500, py: 90000, pyTax: 88000, var: '-5.6%'
  },
  {
    ac: '003-7000-000', desc: 'Operating Expenses', book: -45000, reclass: 2000, adjBook: -43000, taxAdj: 0, adjTax: -43000, py: -40000, pyTax: -41000, var: '7.5%'
  },
  {
    ac: '004-8000-000', desc: 'Depreciation', book: -12000, reclass: 0, adjBook: -12000, taxAdj: 500, adjTax: -11500, py: -10000, pyTax: -9500, var: '20.0%'
  },
  {
    ac: '005-9000-000', desc: 'Interest Income', book: 3000, reclass: 0, adjBook: 3000, taxAdj: 0, adjTax: 3000, py: 2500, pyTax: 2500, var: '20.0%'
  },
  {
    ac: '006-5100-000', desc: 'Accounts Receivable', book: 40000, reclass: 0, adjBook: 40000, taxAdj: 0, adjTax: 40000, py: 38000, pyTax: 37000, var: '5.3%'
  },
  {
    ac: '007-2200-000', desc: 'Accounts Payable', book: -25000, reclass: 0, adjBook: -25000, taxAdj: 0, adjTax: -25000, py: -23000, pyTax: -22500, var: '8.7%'
  },
  {
    ac: '008-3100-000', desc: 'Income Tax Expense', book: -18000, reclass: 0, adjBook: -18000, taxAdj: 1000, adjTax: -17000, py: -17000, pyTax: -16500, var: '5.9%'
  },
  {
    ac: '009-4100-000', desc: 'Deferred Tax Asset', book: 6000, reclass: 0, adjBook: 6000, taxAdj: 0, adjTax: 6000, py: 5500, pyTax: 5400, var: '9.1%'
  },
  {
    ac: '010-1110-000', desc: 'Retained Earnings', book: 50000, reclass: 0, adjBook: 50000, taxAdj: 0, adjTax: 50000, py: 48000, pyTax: 47000, var: '4.2%'
  },
];

export default function DetailedViewTable() {
  return (
    <div className="table-container w-full overflow-x-auto">
      <table className="data-table min-w-[900px] w-full text-xs md:text-sm">
        <thead>
          <tr>
            <th style={{ fontWeight: 700 }}>Account</th>
            <th style={{ fontWeight: 700 }}>Description</th>
            <th style={{ fontWeight: 700 }}>bookAmount</th>
            <th style={{ fontWeight: 700 }}>bookReclass</th>
            <th style={{ fontWeight: 700 }}>adjustedBook</th>
            <th style={{ fontWeight: 700 }}>taxAdjust</th>
            <th style={{ fontWeight: 700 }}>adjustedTax</th>
            <th style={{ fontWeight: 700 }}>py</th>
            <th style={{ fontWeight: 700 }}>pyTax</th>
            <th style={{ fontWeight: 700 }}>varPercent</th>
          </tr>
        </thead>
        <tbody>
          {detailedViewRows.map((row, i) => (
            <tr key={i}>
              <td>{row.ac}</td>
              <td>{row.desc}</td>
              <td>{row.book.toLocaleString()}</td>
              <td>{row.reclass.toLocaleString()}</td>
              <td>{row.adjBook.toLocaleString()}</td>
              <td>{row.taxAdj.toLocaleString()}</td>
              <td>{row.adjTax.toLocaleString()}</td>
              <td>{row.py.toLocaleString()}</td>
              <td>{row.pyTax.toLocaleString()}</td>
              <td>{row.var}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
