import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

function Edit({ onCancel, onUpdate, initialData }) {
  const [form, setForm] = useState({
    project: initialData.project || "Pro-1 - A2Z Tech",
    paymentType: initialData.paymentType || "Milestone Payment",
    amount: initialData.amount || 0,
    percentage: initialData.percentage || 10,
    dueDate: initialData.dueDate || "",
    paidDate: initialData.paidDate || "",
    status: initialData.status || "Not Due",
    invoice: initialData.invoice || "",
    notes: initialData.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
  e.preventDefault();
  const newAmount = parseFloat(form.amount) || 0;
  onUpdate({ ...form, amount: newAmount });
};


  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50 h-full">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mt-1 max-h-[90vh] ">
        <h2 className="text-lg font-semibold mb-2">Edit Payment</h2>
        <p className="text-gray-500 mb-4">Update the payment details</p>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
          {/* Project & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Project *</label>
              <select
                name="project"
                value={form.project}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500">
                <option value="">Select project</option>
                <option value="Pro-1">Pro-1-A2Z Tech</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Payment Type *</label>
              <select
                name="paymentType"
                value={form.paymentType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500">
                <option value="Milestone Payment">Milestone Payment</option>
                <option value="Full Payment">Support Payment</option>
              </select>
            </div>
          </div>

          {/* Amount & Percentage */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Amount (₹) *</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"/>
            </div>
            <div>
              <label className="block font-bold mb-1">Percentage (%)</label>
              <input
                type="number"
                name="percentage"
                value={form.percentage}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"/>
            </div>
          </div>

          {/* Dates & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Due Date *</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"/>
            </div>
            <div>
              <label className="block font-bold mb-1">Status *</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2">
                <option value="Not Due">Not Due</option>
                <option value="Due">Due</option>
                <option value="Paid">Invoiced</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Paid Date & Invoice */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Paid Date</label>
              <input
                type="date"
                name="paidDate"
                value={form.paidDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"/>
            </div>
            <div>
              <label className="block font-bold mb-1">Invoice Number</label>
              <input
                type="text"
                name="invoice"
                value={form.invoice}
                onChange={handleChange}
                placeholder="Enter invoice number"
                className="w-full border rounded px-3 py-2"/>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-bold mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add any additional notes..."
              className="w-full border rounded px-3 py-2" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded hover:bg-gray-100 font-bold">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
              <FaEdit className="text-white" />
              Update Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
