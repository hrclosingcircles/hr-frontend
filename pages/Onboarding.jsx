import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function OnboardingForm() {
  const { offer_id } = useParams();
  const [data, setData] = useState(null);

  const fetchOffer = async () => {
    try {
      const res = await axios.get(`${API}/api/offers/${offer_id}`);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Fetch single error:", error);
    }
  };

  useEffect(() => {
    fetchOffer();
  }, [offer_id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Onboarding Details</h2>

      <p><strong>Name:</strong> {data.candidate_name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Mobile:</strong> {data.mobile}</p>
      <p><strong>Designation:</strong> {data.designation}</p>
      <p><strong>Salary:</strong> {data.salary}</p>
      <p><strong>Location:</strong> {data.work_location}</p>
      <p><strong>Joining Date:</strong> {data.date_of_joining}</p>
      <p><strong>Status:</strong> {data.status}</p>
    </div>
  );
}

export default OnboardingForm;