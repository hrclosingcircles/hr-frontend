import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_API_URL ||
  "https://hr-onboarding-system-1.onrender.com";

export default function AdminDashboard() {

  const [offers, setOffers] = useState([]);

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

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Father Name</th>
            <th>Bank</th>
            <th>IFSC</th>
            <th>Emergency</th>
            <th>Aadhaar</th>
            <th>PAN</th>
            <th>Photo</th>
            <th>Signed Appointment</th>
          </tr>
        </thead>

        <tbody>
          {offers.map((o) => (
            <tr key={o.id}>
              <td>{o.candidate_name}</td>
              <td>{o.email}</td>
              <td>{o.mobile}</td>
              <td>{o.designation}</td>
              <td>{o.status}</td>
              <td>{o.father_name}</td>
              <td>{o.bank_name}</td>
              <td>{o.ifsc}</td>
              <td>{o.emergency_contact}</td>

              <td>
                {o.aadhaar && (
                  <a href={`${API}/uploads/${o.aadhaar}`} target="_blank">
                    View
                  </a>
                )}
              </td>

              <td>
                {o.pan && (
                  <a href={`${API}/uploads/${o.pan}`} target="_blank">
                    View
                  </a>
                )}
              </td>

              <td>
                {o.photo && (
                  <a href={`${API}/uploads/${o.photo}`} target="_blank">
                    View
                  </a>
                )}
              </td>

              <td>
                {o.signed_appointment && (
                  <a href={`${API}/uploads/${o.signed_appointment}`} target="_blank">
                    View
                  </a>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}