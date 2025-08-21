import React from "react";
import { FaTrash } from "react-icons/fa";

function Delete({ payment, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-50">
            <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
                {/* Header */}
                <div className="flex items-center mb-4">
                    <span className="text-red-500 text-xl mr-2">⚠</span>
                    <h1 className="text-lg font-bold text-gray-800">Delete Payment</h1>
                </div>

                {/* Confirmation Message */}
                <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to delete this payment? This action cannot be undone.
                </p>

                {/* Payment Details */}
                <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600 mb-6">
                    <p className="text-red-950 font-semibold">{payment.project}</p>
                    <p>
                        <strong>Amount:</strong> ₹{payment.amount.toLocaleString()} &nbsp;|&nbsp;
                        <strong>Status:</strong> {payment.status}
                    </p>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-300 ">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        <FaTrash className="h-4 w-4" />
                        Delete Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Delete;
