import React, { useEffect, useState } from "react";



function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);
  const [test, setTest] = useState("");
  const [orders, setOrders] = useState([]);

   // 🟢 Fetch user orders
 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  fetchOrders();
}, [token]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

   

    if (!file || !test) {
      alert("Please upload a prescription and select a test.");
      return;
    }

    const formData = new FormData();
    //formData.append("userId", user._id);
    formData.append("userId", user._id);
    formData.append("prescription", file);
    formData.append("test", test);

    try {
      const response = await fetch("http://localhost:5000/api/bookOrder", {
        method: "POST",
        headers: {
            
             Authorization: `Bearer ${token}`, // Optional: if you validate JWT
            
        },
        body: formData,
      });
     
      const result = await response.json();
      
         console.log("pres",result);
      if (response.ok) {
        alert("Test booked successfully!");
        setFile(null);
        setTest("");
      } else {
        alert(result.message || "Failed to book test.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded shadow">
        <h2 className="text-3xl font-bold text-blue-950 mb-4 text-center"> Diagnostic test booking</h2>
      <h2 className="text-xl font-bold text-blue-800 mb-4">Welcome, {user.name} </h2>

      <form onSubmit={handleSubmit}>
        {/* Upload prescription */}
        <div className="mb-4">
          <label className="block mb-2 font-bold border p-2 ">Upload Doctor's Prescription</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Choose tests */}
        <div className="mb-4">
          <label className="block mb-2 font-bold border p-2">Choose Test</label>
          <select
            value={test}
            onChange={(e) => setTest(e.target.value)}
            className="w-full border p-2"
            required
          >
            <option value="">Select a test</option>
            <option value="Blood Test">Blood Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="ECG">ECG</option>
          </select>
        </div>

        {/* Book test */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Book Test
        </button>
      </form>
  
    <div>
        <h3 className="text-xl font-semibold mb-3">My Orders</h3>
        {orders.length === 0 ? (
          <p>No test orders found.</p>
        ) : (
          <table className="w-full border border-blue-300 text-left">
            <thead>
              <tr className="bg-blue-200 w-full border">
                <th className="p-2">Test</th>
                <th className="p-2">Prescription</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-2">{order.test}</td>
                  <td className="p-2">
                    <a
                      href={`http://localhost:5000/uploads/${order.prescriptionPath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="p-2 capitalize">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    //////////////////////////////
    

  );
}

export default UserDashboard;

