import React from 'react';

const orders = [
  { id: 1, user: 'John Doe', status: 'Pending', file: 'prescription1.pdf' },
  { id: 2, user: 'Jane Smith', status: 'In Progress', file: 'prescription2.pdf' },
];

function AdminPanel() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">User</th>
            <th className="p-2 border">Prescription</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="text-center">
              <td className="p-2 border">{order.user}</td>
              <td className="p-2 border">
                <a href={`/${order.file}`} className="text-blue-500 underline">View</a>
              </td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Assign</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
