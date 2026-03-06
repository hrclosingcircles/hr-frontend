import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_API_URL ||
  "https://hr-onboarding-system-1.onrender.com";

export default function AdminDashboard() {

  const [offers, setOffers] = useState([]);

  // ================= FETCH OFFERS =================
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {

      const res = await axios.get(`${API}/api/offers`);

      setOffers(res.data.data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>

      <h2>HR Admin Dashboard</h2>

      <h3>Total Employees: {offers.length}</h3>

      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {offers.map((o) => (
            <tr key={o.offer_id}>
              <td>{o.candidate_name}</td>
              <td>{o.email}</td>
              <td>{o.mobile}</td>
              <td>{o.designation}</td>
              <td>{o.salary}</td>
              <td>{o.date_of_joining}</td>
              <td>{o.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}