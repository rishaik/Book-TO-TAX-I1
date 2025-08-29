import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const initialRows = [
	{ id: 1, code: '2100', desc: 'Sales Tax Payable', amount: '12,500', comments: 'Q2 accrual', activity: 'Filing' },
	{ id: 2, code: '2200', desc: 'Income Tax Expense', amount: '8,900', comments: 'Deferred tax', activity: 'Provision' },
	{ id: 3, code: '5100', desc: 'VAT Payable', amount: '5,200', comments: 'Monthly VAT', activity: 'Remittance' },
	{ id: 4, code: '3100', desc: 'Withholding Tax', amount: '2,100', comments: 'Vendor payment', activity: 'Reporting' },
	{ id: 5, code: '4100', desc: 'Franchise Tax', amount: '3,800', comments: 'Annual fee', activity: 'Filing' },
	{ id: 6, code: '6100', desc: 'Payroll Tax', amount: '6,400', comments: 'Employee Q1', activity: 'Remittance' },
	{ id: 7, code: '7100', desc: 'Excise Tax', amount: '1,900', comments: 'Import duty', activity: 'Provision' },
	{ id: 8, code: '8100', desc: 'Property Tax', amount: '4,500', comments: 'Annual property', activity: 'Assessment' },
];

export default function ManualBookAdjustmentTable() {
	const [rows, setRows] = useState(initialRows);
	const [editingId, setEditingId] = useState(null);
	const [newRow, setNewRow] = useState(null);

	const handleAdd = () => {
		setNewRow({ code: '', desc: '', amount: '', comments: '', activity: '' });
		setEditingId('new');
	};

	const handleInputChange = (e, field) => {
		if (editingId === 'new') {
			setNewRow({ ...newRow, [field]: e.target.value });
		}
	};

	const handleSave = () => {
		if (newRow && newRow.code && newRow.desc && newRow.amount) {
			setRows([
				...rows,
				{ id: Date.now(), ...newRow },
			]);
			setNewRow(null);
			setEditingId(null);
		}
	};

	const handleCancel = () => {
		setNewRow(null);
		setEditingId(null);
	};

	return (
		<div className="manual-book-adj-table">
			<div className="flex items-center justify-between mb-4" style={{ position: 'relative' }}>
				<h2 className="font-bold text-xl w-full text-center" style={{ marginBottom: 24 }}>Manual Book Adjustment</h2>
				<div className="flex justify-end" style={{ position: 'absolute', right: 0, top: 0 }}>
					<button className="add-button flex items-center" onClick={handleAdd}>
						<Plus className="add-icon" />
						<span className="ml-1">Add</span>
					</button>
				</div>
			</div>
			<div style={{ height: 16 }} />
			<div className="table-container" style={{ padding: 0 }}>
				<table className="data-table w-full text-xs md:text-sm">
					<thead>
						<tr>
							<th>Account Code</th>
							<th>Account Desc</th>
							<th>Amount</th>
							<th>Comments</th>
							<th>Activity</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => (
							<tr key={row.id}>
								<td>{row.code}</td>
								<td>{row.desc}</td>
								<td>{row.amount}</td>
								<td>{row.comments}</td>
								<td>{row.activity}</td>
								<td></td>
							</tr>
						))}
						{editingId === 'new' && (
							<tr>
								<td><input className="table-input" value={newRow.code} onChange={e => handleInputChange(e, 'code')} placeholder="Code" /></td>
								<td><input className="table-input" value={newRow.desc} onChange={e => handleInputChange(e, 'desc')} placeholder="Description" /></td>
								<td><input className="table-input" value={newRow.amount} onChange={e => handleInputChange(e, 'amount')} placeholder="Amount" /></td>
								<td><input className="table-input" value={newRow.comments} onChange={e => handleInputChange(e, 'comments')} placeholder="Comments" /></td>
								<td><input className="table-input" value={newRow.activity} onChange={e => handleInputChange(e, 'activity')} placeholder="Activity" /></td>
								<td className="add-row-actions">
									<button className="add-button" onClick={handleSave}>Save</button>
									<button className="add-button" style={{ background: '#e5e7eb', color: '#222' }} onClick={handleCancel}>Cancel</button>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
