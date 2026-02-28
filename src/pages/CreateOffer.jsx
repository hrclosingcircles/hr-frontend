import React, { useState } from "react";
import axios from "axios";

const CreateOffer = () => {
  const [form, setForm] = useState({
    candidate_name: "",
    email: "",
    mobile: "",
    designation: "",
    salary: "",
    work_location: "",
    date_of_joining: "",
  });

  const [generatedLink, setGeneratedLink] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/offers/create",
        {
          ...form,
          employment_type: "Full Time"
        }
      );

      setGeneratedLink(res.data.onboarding_link);
      alert("Offer Created Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating offer");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Create Offer & Generate Onboarding Link</h2>

      <form onSubmit={handleSubmit}>

        <input name="candidate_name" placeholder="Candidate Name"
          onChange={handleChange} required />
        <br /><br />

        <input name="email" placeholder="Email"
          onChange={handleChange} required />
        <br /><br />

        <input name="mobile" placeholder="Mobile"
          onChange={handleChange} required />
        <br /><br />

        <input name="designation" placeholder="Position"
          onChange={handleChange} required />
        <br /><br />

        <input name="salary" placeholder="Salary"
          onChange={handleChange} required />
        <br /><br />

        <input name="work_location" placeholder="Location"
          onChange={handleChange} required />
        <br /><br />

        <input type="date" name="date_of_joining"
          onChange={handleChange} required />
        <br /><br />

        <button type="submit">Generate Link</button>
      </form>

      {generatedLink && (
        <div style={{ marginTop: 20 }}>
          <h4>Onboarding Link:</h4>
          <a href={generatedLink} target="_blank" rel="noreferrer">
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default CreateOffer;