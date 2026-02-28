import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OnboardingForm = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/offers/${id}`
        );
        setData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOffer();
  }, [id]);

  if (!data) return <h3 style={{ padding: 40 }}>Loading...</h3>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Candidate Onboarding</h2>

      <p><strong>Name:</strong> {data.candidate_name}</p>
      <p><strong>Designation:</strong> {data.designation}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Mobile:</strong> {data.mobile}</p>
      <p><strong>Salary:</strong> {data.salary}</p>
      <p><strong>Location:</strong> {data.work_location}</p>
      <p><strong>Joining Date:</strong> {data.date_of_joining}</p>
      <p><strong>Status:</strong> {data.status}</p>
    </div>
  );
};

export default OnboardingForm;