import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function AdminDashboard() {
  const [offers, setOffers] = useState([]);
  const [generatedLink, setGeneratedLink] = useState("");

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

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API}/api/offers`);
      setOffers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/offers/create`, form);

      if (res.data.success) {
        // ✅ USE BACKEND GENERATED LINK
        setGeneratedLink(res.data.onboarding_link);

        fetchOffers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>HR Admin Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input name="candidate_name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input name="designation" placeholder="Designation" onChange={handleChange} required />
        <input name="salary" placeholder="Salary" onChange={handleChange} required />
        <input name="work_location" placeholder="Location" onChange={handleChange} required />
        <input type="date" name="date_of_joining" onChange={handleChange} required />

        <button type="submit">Create Offer</button>
      </form>

      {generatedLink && (
        <div style={{ marginTop: 20 }}>
          <strong>Onboarding Link:</strong>
          <br />
          <a href={generatedLink} target="_blank" rel="noreferrer">
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;