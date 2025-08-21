import React from "react";
import { FaRegClock, FaRegCalendarAlt, FaCreditCard, FaCalculator, FaCalendar, FaRupeeSign, FaFileInvoice, } from "react-icons/fa";

function View({ payment, onClose }) {
  if (!payment) return null;

  return (
   <div className="absolute inset-0  bg-[rgba(0,0,0,0.05)] bg-opacity-0.5 z-50 h-full ">

      <div className="max-w-lg mx-auto bg-white rounded-lg p-6 mt-10">
        {/* Header */}
        <div className="pb-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Payment Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-xl">
              ✕
            </button>
          </div>
          <p className="text-gray-500 mt-2 flex items-center gap-2">
            Complete information about this payment
          </p>
        </div>

        {/* Project Info */}
        <div className="mt-4 border rounded-xl p-4 bg-gray-100 ">
          <h3 className="text-md font-semibold mb-2 flex items-center justify-between">
            {payment.project}
            <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700 flex items-center gap-1">
              <FaRegClock className="w-4 h-4" />
              {payment.status}
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>
              <span className="font-medium flex items-center gap-1 mb-1">Client</span>
              <div className="font-medium flex items-center gap-1 mb-1">
                <FaCalculator className="w-4 h-4 text-gray-600" /> N/A
              </div>
            </p>
            <p>
              <span className="font-medium flex items-center gap-1 mb-1">Due Date</span>
              <div className="font-medium flex items-center gap-1 mb-1">
                <FaRegCalendarAlt className="w-4 h-4 text-gray-600" /> {payment.dueDate}
              </div>
            </p>
            <p>
              <span className="font-medium flex items-center gap-1 mb-1">Payment Type</span>
              <div className="font-medium flex items-center gap-1 mb-1">
                <FaCreditCard className="w-4 h-4 text-gray-600" /> {payment.type}
              </div>
            </p>
            <p>
              <span className="font-medium flex items-center gap-1 mb-1">Paid Date</span>
              <div className="font-medium flex items-center gap-1 mb-1">
                <FaCalendar className="w-4 h-4 text-gray-600" /> {payment.paidDate || "N/A"}
              </div>
            </p>
            <p>
              <span className="font-medium flex items-center gap-1 mb-1">Amount</span>
              <div className="font-medium flex items-center gap-1 mb-1">
                <FaRupeeSign className="w-4 h-4 text-gray-600" /> ₹{payment.amount.toLocaleString()} ({payment.percentage}%)
              </div>
            </p>
            <p>
              <span className="font-medium flex items-center gap-1 mb-1">Invoice Number</span>
              <div className="font-medium flex items-center gap-1 mb-1">
                <FaFileInvoice className="w-4 h-4 text-gray-600" /> {payment.invoice || "N/A"}
              </div>
            </p>
          </div>
        </div>

        {/* Milestone Info */}
        <div className="mt-4 border rounded-xl p-4 bg-gray-50">
          <div className="flex items-center mb-2">
            <FaFileInvoice className="text-lg text-gray-600 mr-2" />
            <h3 className="text-md font-semibold">Milestone Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>
              <span className="font-medium">Milestone</span>
              <br />
              {payment.milestone}
            </p>
            <p>
              <span className="font-medium">Code</span>
              <br />
              {payment.code}
            </p>
            <p className="col-span-2">
              <span className="font-medium">Notes</span>
              <br />
              {payment.notes || "—"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default View;
