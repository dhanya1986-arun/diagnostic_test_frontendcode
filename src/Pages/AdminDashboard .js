
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";



function AdminOrders() {
  const [orders, setOrders] = useState([]);

   const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
   useEffect(() => {
    fetchOrders();
  }, []);

   const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/admin/orders/${id}/status`, {
        status: newStatus,
      });
      fetchOrders(); // Refresh after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User</th>
            <th className="p-2">Test</th>
            <th className="p-2">Prescription</th>
            <th className="p-2">Status</th>
            <th className="p-2"></th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-2">{order.user?.name || "Unknown"}</td>
              <td className="p-2">{order.test}</td>
              <td className="p-2">
                <a
                  href={`${API_URL}/uploads/${order.prescriptionPath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  {order.prescriptionPath}
                </a>
              </td>
              <td className="p-2 capitalize">{order.status}</td>

               <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleStatusChange(order._id, "Approved")}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  disabled={order.status !== "pending"}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(order._id, "Rejected")}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  disabled={order.status !== "pending"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;

