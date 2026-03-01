import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://hr-onboarding-system-1.onrender.com";

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
    employment_type: "Full Time",
  });

  // FETCH OFFERS
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API}/api/offers`);
      setOffers(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false); // 🔥 IMPORTANT
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
          employment_type: "Full Time",
        });

        fetchOffers();
      }
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 30 }}>
      <h2>HR Admin Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input name="candidate_name" placeholder="Candidate Name" value={form.candidate_name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
        <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />
        <input name="work_location" placeholder="Location" value={form.work_location} onChange={handleChange} required />
        <input type="date" name="date_of_joining" value={form.date_of_joining} onChange={handleChange} required />
        <button type="submit">Generate Link</button>
      </form>

      {generatedLink && (
        <div style={{ marginTop: 20 }}>
          <strong>Link:</strong><br />
          <a href={generatedLink} target="_blank" rel="noreferrer">
            {generatedLink}
          </a>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <h3>Total: {offers.length}</h3>
        {offers.map((offer) => (
          <div key={offer.id}>
            {offer.candidate_name} - {offer.status}
          </div>
        ))}
      </div>
    </div>
  );
}