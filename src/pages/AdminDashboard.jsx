import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function AdminDashboard() {
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

  // =========================
  // Fetch All Offers
  // =========================
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API}/api/offers`);
      setOffers(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

 useEffect(() => {
  fetchOffer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // =========================
  // Handle Form Change
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // Create Offer
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/offers/create`, form);

      if (res.data.success) {
        // 🔥 ALWAYS USE CURRENT DOMAIN (NO LOCALHOST EVER)
        const productionLink = `${window.location.origin}/onboarding/${res.data.offer_id}`;

        setGeneratedLink(productionLink);

        // Reset form
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

        fetchOffers();
      }
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>HR Admin Dashboard</h2>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit}>
        <input name="candidate_name" placeholder="Candidate Name" value={form.candidate_name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
        <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />
        <input name="work_location" placeholder="Location" value={form.work_location} onChange={handleChange} required />
        <input type="date" name="date_of_joining" value={form.date_of_joining} onChange={handleChange} required />

        <button type="submit" style={{ marginTop: 10 }}>
          Generate Link
        </button>
      </form>

      {/* ================= GENERATED LINK ================= */}
      {generatedLink && (
        <div style={{ marginTop: 20 }}>
          <strong>Link:</strong>
          <br />
          <a href={generatedLink} target="_blank" rel="noreferrer">
            {generatedLink}
          </a>
        </div>
      )}

      {/* ================= OFFERS LIST ================= */}
      <div style={{ marginTop: 40 }}>
        <h3>Total: {offers.length}</h3>

        {offers.map((offer) => (
          <div key={offer.id} style={{ borderBottom: "1px solid #ccc", padding: 10 }}>
            <strong>{offer.candidate_name}</strong> – {offer.status}
          </div>
        ))}
      </div>
    </div>
  );
}