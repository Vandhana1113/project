import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FaCreditCard, FaRupeeSign, FaCheck, FaRegClock } from "react-icons/fa";
import Cards from "./Cards";
import View from "./View";
import Statusdropdown from "./Statusdropdown";
import Createpayment from "./Createpayment";
import Edit from "./Edit";
import Delete from "./Delete";

function Summary() {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [payments, setPayments] = useState([
    {
      project: "Pro-1",
      type: "Milestone",
      milestone: "mil-2",
      code: "MS00002",
      amount: 5500,
      percentage: 10,
      status: "DUE", // Corrected based on logic
      dueDate: "2025-08-12",
      paidDate: "",
      invoice: "",
      notes: "Initial milestone",
    },
    {
      project: "Pro-2",
      type: "Milestone",
      milestone: "mil-1",
      code: "MS00001",
      amount: 5000,
      percentage: 10,
      status: "DUE",
      dueDate: "2025-08-12",
      paidDate: "2025-08-10",
      invoice: "INV001",
      notes: "Final milestone",
    },
    {
      project: "Pro-1",
      type: "Support",
      milestone: "No Milestone",
      code: "MS00003",
      amount: 50000,
      percentage: 100,
      status: "PAID",
      dueDate: "2025-08-19",
      paidDate: "2025-08-19",
      invoice: "INV002",
      notes: "Support contract",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editPayment, setEditPayment] = useState(null);
  const [deletePayment, setDeletePayment] = useState(null);

  const handleCreatePayment = (formData) => {
    const amount = parseFloat(formData.amount);
    const status = amount >= 50000 ? "PAID" : "DUE";
    const newPayment = {
      project: formData.project,
      type: formData.paymentType === "Milestone Payment" ? "Milestone" : "Support",
      milestone: formData.milestone || "No Milestone",
      amount,
      percentage: parseFloat(formData.percentage),
      status,
      dueDate: formData.dueDate,
      paidDate: status === "PAID" ? new Date().toISOString().split("T")[0] : "",
      invoice: formData.invoice || "",
      notes: formData.notes,
      code: `MS${String(payments.length + 1).padStart(5, '0')}`,
    };
    setPayments([...payments, newPayment]);
    setShowForm(false);
  };

  const handleEditSubmit = (updatedData) => {
    const updatedAmount = parseFloat(updatedData.amount);
    const updatedStatus = updatedAmount >= 50000 ? "PAID" : "DUE";
    const updatedPayments = payments.map((p) =>
      p.code === editPayment.code
        ? { ...p, ...updatedData, status: updatedStatus }
        : p);
    setPayments(updatedPayments);
    setEditPayment(null);
  };

  const handleDeleteConfirm = () => {
    setPayments(payments.filter(p => p.code !== deletePayment.code));
    setDeletePayment(null);
  };

  const filteredPayments = payments.filter(p => {
    const matchesStatus = selectedStatus === "All Status" ||
      p.status.toLowerCase() === selectedStatus.toLowerCase().replace(" ", "_");

    const matchesSearch =
      p.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.milestone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.status.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 bg-blue-100 min-h-screen relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-gray-500">Monitor and manage all project payments</p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md whitespace-nowrap"
          onClick={() => setShowForm(true)}>
          + New Payment
        </button>
      </div>

      {/* Modals */}
      {showForm && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <button
            className="absolute top-2 right-3 text-red text-2xl hover:text-gray-700"
            onClick={() => setShowForm(false)}>
            &times;
          </button>
          <Createpayment
            onCancel={() => setShowForm(false)}
            onSubmit={handleCreatePayment} />
        </div>
      )}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-lg mx-auto bg-white rounded-lg p-6 mt-25">
            <View payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
          </div>
        </div>
      )}
      {editPayment && (
        <Edit
          initialData={editPayment}
          onCancel={() => setEditPayment(null)}
          onUpdate={handleEditSubmit} />
      )}
      {deletePayment && (
        <Delete
          payment={deletePayment}
          onCancel={() => setDeletePayment(null)}
          onConfirm={handleDeleteConfirm} />
      )}

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Cards label="Total Payments" value={payments.length.toString()} bg="bg-blue-300" icon={<FaCreditCard className="text-blue-600 text-xl" />} />
        <Cards label="Paid" value={payments.filter(p => p.status === "PAID").length.toString()} bg="bg-green-100" icon={<FaCheck className="text-green-600 text-xl" />} />
        <Cards label="Due" value={payments.filter(p => p.status === "DUE").length.toString()} bg="bg-yellow-100" icon={<FaRegClock className="text-yellow-600 text-xl" />} />
        <Cards label="Total Value" value={`₹${payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`} bg="bg-purple-100" icon={<FaRupeeSign className="text-purple-600 text-xl" />} />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mt-6">
        <input
          type="text"
          placeholder="Search payments..."
          className="border rounded-md px-3 py-2 w-80 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
        <Statusdropdown selected={selectedStatus} onSelect={(status) => setSelectedStatus(status)} />
        <button className="border px-4 py-2 rounded-md bg-white" onClick={() => {
          setSelectedStatus("All Status");
          setSearchQuery("");
        }}>Clear Filters</button>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Payment</h2>
          <p className="text-sm text-gray-600 mt-1">View all payments with their associated milestones and support contracts</p>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-white-100">
            <tr>
              <th className="p-3">Project</th>
              <th className="p-3">Type</th>
              <th className="p-3">Milestone/Support</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((p, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">{p.project}</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">{p.type}</span>
                </td>
                <td className="p-3">
                  {p.milestone}
                  <div className="text-xs text-gray-400">{p.code}</div>
                </td>
                <td className="p-3">₹{p.amount.toLocaleString()}</td>
                <td className="p-3">{p.status}</td>
                <td className="p-3">{p.dueDate}</td>
                <td className="p-3 flex gap-2">
                  <button className="p-2 bg-white border border-neutral-400 rounded-md hover:bg-gray-100" onClick={() => setSelectedPayment(p)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="p-2 bg-white border border-neutral-400 rounded-md hover:bg-gray-100" onClick={() => setEditPayment(p)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="p-2 bg-white border border-neutral-400 text-red-600 rounded-md hover:bg-red-100" onClick={() => setDeletePayment(p)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div>
        {/* Your content based on currentPage */}
        <div className="flex justify-center p-4 text-sm gap-3">
          <button
            className="flex items-center gap-1 font-bold"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}><span className="text-xl mb-1">&lt;</span>
            Previous
          </button>
          <span className="border border-black px-2 py-1 rounded bg-white">{currentPage}</span>
          <button
            className="flex items-center gap-1 font-bold"
            onClick={() => setCurrentPage(prev => (startIndex + itemsPerPage < filteredPayments.length ? prev + 1 : prev))}
            disabled={startIndex + itemsPerPage >= filteredPayments.length}>
            Next  <span className="text-xl mb-1">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;