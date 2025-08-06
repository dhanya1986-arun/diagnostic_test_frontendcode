
import React, { useEffect, useState } from "react";
import axios from "axios";



// src/pages/AdminDashboard.js
//function AdminDashboard() {
  //const mockOrders = [
  //  { id: 1, name: "John", test: "Blood Test", prescription: "Rx1.pdf" },
  //  { id: 2, name: "Jane", test: "X-Ray", prescription: "Rx2.pdf" },
  //];
 
  {/*return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {mockOrders.map((order) => (
        <div key={order.id} className="mb-4 p-4 border rounded flex justify-between items-center">
          <div>
            <p><strong>User:</strong> {order.name}</p>
            <p><strong>Test:</strong> {order.test}</p>
            <p><strong>Prescription:</strong> {order.prescription}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
            <button className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;*/}
// src/AdminOrders.js

function AdminOrders() {
  const [orders, setOrders] = useState([]);

   const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/orders");
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
      await axios.put(`http://localhost:5000/admin/orders/${id}/status`, {
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
                  href={`http://localhost:5000/uploads/${order.prescriptionPath}`}
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

