import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_API_URL ||
  "https://hr-onboarding-system-1.onrender.com";

export default function AdminDashboard() {
  const [offers, setOffers] = useState([]);
  const [generatedLink, setGeneratedLink] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    candidate_name: "",
    email: "",
    mobile: "",
    designation: "",
    salary: "",
    work_location: "",
    date_of_joining: "",
  });

  // =========================
  // FETCH OFFERS (CI SAFE)
  // =========================
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(`${API}/api/offers`);
        setOffers(res.data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // CREATE OFFER
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/offers/create`, form);

      if (res.data.success) {
        const productionLink = `${window.location.origin}/onboarding/${res.data.offer_id}`;
        setGeneratedLink(productionLink);

        setForm({
          candidate_name: "",
          email: "",
          mobile: "",
          designation: "",
          salary: "",
          work_location: "",
          date_of_joining: "",
        });

        // Refresh list
        const updated = await axios.get(`${API}/api/offers`);
        setOffers(updated.data.data || []);
      }
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>HR Admin Dashboard v2</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input name="candidate_name" placeholder="Candidate Name" value={form.candidate_name} onChange={handleChange} required />
        <br /><br />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br /><br />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
        <br /><br />
        <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
        <br /><br />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />
        <br /><br />
        <input name="work_location" placeholder="Location" value={form.work_location} onChange={handleChange} required />
        <br /><br />
        <input type="date" name="date_of_joining" value={form.date_of_joining} onChange={handleChange} required />
        <br /><br />

        <button type="submit">Generate Link</button>
      </form>

      {generatedLink && (
        <div style={{ marginBottom: 20 }}>
          <strong>Generated Link:</strong>
          <br />
          <a href={generatedLink} target="_blank" rel="noreferrer">
            {generatedLink}
          </a>
        </div>
      )}

      <h3>Total Offers: {offers.length}</h3>

      {offers.map((offer) => (
        <div key={offer.id} style={{ borderBottom: "1px solid #ccc", padding: 10 }}>
          <strong>{offer.candidate_name}</strong> — {offer.status}
        </div>
      ))}
    </div>
  );
}