import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_API_URL ||
  "https://hr-onboarding-system-1.onrender.com";

export default function AdminDashboard() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await axios.get(`${API}/api/offers`);
      setEmployees(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>HR Admin Dashboard</h2>

      <h3>Total Employees: {employees.length}</h3>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Father</th>
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
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.candidate_name}</td>
              <td>{emp.email}</td>
              <td>{emp.mobile}</td>
              <td>{emp.designation}</td>
              <td>{emp.status}</td>

              <td>{emp.father_name}</td>
              <td>{emp.bank_name}</td>
              <td>{emp.ifsc}</td>
              <td>{emp.emergency_contact}</td>

              <td>
                {emp.aadhaar && (
                  <a
                    href={`${API}/uploads/${emp.aadhaar}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                )}
              </td>

              <td>
                {emp.pan && (
                  <a
                    href={`${API}/uploads/${emp.pan}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                )}
              </td>

              <td>
                {emp.photo && (
                  <a
                    href={`${API}/uploads/${emp.photo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                )}
              </td>

              <td>
                {emp.signed_appointment && (
                  <a
                    href={`${API}/uploads/${emp.signed_appointment}`}
                    target="_blank"
                    rel="noreferrer"
                  >
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