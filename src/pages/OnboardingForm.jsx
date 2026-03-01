import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function OnboardingForm() {
  const { offerId } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffer();
  }, [offerId]);

  const fetchOffer = async () => {
    try {
      const res = await axios.get(`${API}/api/offers/${offerId}`);

      if (res.data) {
        setOffer(res.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!offer) return <div style={{ padding: 40 }}>Offer not found</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Onboarding Details</h2>

      <p><strong>Name:</strong> {offer.candidate_name}</p>
      <p><strong>Email:</strong> {offer.email}</p>
      <p><strong>Mobile:</strong> {offer.mobile}</p>
      <p><strong>Designation:</strong> {offer.designation}</p>
      <p><strong>Salary:</strong> {offer.salary}</p>
      <p><strong>Location:</strong> {offer.work_location}</p>
      <p><strong>Joining Date:</strong> {offer.date_of_joining}</p>
      <p><strong>Status:</strong> {offer.status}</p>
    </div>
  );
}