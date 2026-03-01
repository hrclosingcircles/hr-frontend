import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_API_URL ||
  "https://hr-onboarding-system-1.onrender.com";

function AdminDashboard() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    candidate_name: "",
    email: "",
    mobile: "",
    designation: "",
    salary: "",
    work_location: "",
    date_of_joining: "",
    employment_type: "Full Time",
  });

  const [generatedLink, setGeneratedLink] = useState("");

  // ==============================
  // Fetch All Offers
  // ==============================
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API}/api/offers`);
      setOffers(res.data.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // ==============================
  // Handle Input Change
  // ==============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==============================
  // Create Offer
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/offers/create`, form);

      if (res.data.success) {
        setGeneratedLink(res.data.onboarding_link);
        fetchOffers();

        setForm({
          candidate_name: "",
          email: "",
          mobile: "",
          designation: "",
          salary: "",
          work_location: "",
          date_of_joining: "",
          employment_type: "Full Time",
        });
      }
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>HR Admin Dashboard</h2>

      {/* ============================== */}
      {/* CREATE OFFER FORM */}
      {/* ============================== */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          name="candidate_name"
          placeholder="Candidate Name"
          value={form.candidate_name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          required
        />
        <input
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
        />
        <input
          name="work_location"
          placeholder="Location"
          value={form.work_location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date_of_joining"
          value={form.date_of_joining}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Offer</button>
      </form>

      {/* ============================== */}
      {/* GENERATED LINK */}
      {/* ============================== */}
      {generatedLink && (
        <div style={{ marginBottom: "20px" }}>
          <strong>Onboarding Link:</strong>
          <br />
          <a href={generatedLink} target="_blank" rel="noreferrer">
            {generatedLink}
          </a>
        </div>
      )}

      {/* ============================== */}
      {/* OFFER TABLE */}
      {/* ============================== */}
      <table border="1" width="100%" cellPadding="8">
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
          {offers.length > 0 ? (
            offers.map((item) => (
              <tr key={item.id}>
                <td>{item.offer_id}</td>
                <td>{item.candidate_name}</td>
                <td>{item.designation}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Candidates Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;