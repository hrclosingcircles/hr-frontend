import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const [form, setForm] = useState({
    candidate_name: "",
    email: "",
    mobile: "",
    designation: "",
    salary: "",
    work_location: "",
    date_of_joining: "",
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const res = await axios.get("http://localhost:5000/api/offers");
    setCandidates(res.data.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/offers/create",
      {
        ...form,
        employment_type: "Full Time",
      }
    );

    setGeneratedLink(res.data.onboarding_link);

    setForm({
      candidate_name: "",
      email: "",
      mobile: "",
      designation: "",
      salary: "",
      work_location: "",
      date_of_joining: "",
    });

    fetchCandidates();
  };

  const total = candidates.length;
  const joined = candidates.filter(c => c.status === "Joined").length;
  const pending = candidates.filter(c => c.status === "Pending").length;

  return (
    <div style={{ padding: 40 }}>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>📊 HR Admin Dashboard</h2>
        <button onClick={() => setShowForm(!showForm)} style={btn}>
          {showForm ? "Close" : "+ Create Offer"}
        </button>
      </div>

      {showForm && (
        <div style={box}>
          <h3>Create Offer</h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
            <input name="candidate_name" placeholder="Candidate Name" value={form.candidate_name} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
            <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
            <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />
            <input name="work_location" placeholder="Location" value={form.work_location} onChange={handleChange} required />
            <input type="date" name="date_of_joining" value={form.date_of_joining} onChange={handleChange} required />
            <button type="submit" style={btn}>Generate Link</button>
          </form>

          {generatedLink && (
            <div style={{ marginTop: 10 }}>
              <strong>Link:</strong>
              <br />
              <a href={generatedLink} target="_blank" rel="noreferrer">
                {generatedLink}
              </a>
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        <div style={card}>Total: {total}</div>
        <div style={card}>Joined: {joined}</div>
        <div style={card}>Pending: {pending}</div>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            <th>Offer ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(item => (
            <tr key={item.id}>
              <td>{item.offer_id}</td>
              <td>{item.candidate_name}</td>
              <td>{item.designation}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

const btn = {
  padding: "10px 15px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer"
};

const box = {
  background: "#f5f5f5",
  padding: 20,
  borderRadius: 8,
  marginTop: 20
};

const card = {
  flex: 1,
  background: "#eee",
  padding: 20,
  borderRadius: 8,
  textAlign: "center"
};

export default AdminDashboard;