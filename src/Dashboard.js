import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    worker_id: "EMP" + Date.now(),
    full_name: "",
    father_name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    designation: "",
    department: "",
    salary: "",
    joining_date: "",
    work_location: "",
    bank_name: "",
    account_number: "",
    ifsc: "",
    aadhaar_number: "",
    pan_number: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/workers", formData);
      alert("Worker Created Successfully");
      navigate(`/onboarding/${formData.worker_id}`);
    } catch (error) {
      console.error(error);
      alert("Error creating worker");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h2>HR Dashboard - Add New Worker</h2>

      <form onSubmit={handleSubmit}>

        <h3>Personal Details</h3>
        <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
        <input name="father_name" placeholder="Father Name" onChange={handleChange} />
        <input type="date" name="dob" onChange={handleChange} />
        <input name="gender" placeholder="Gender" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />

        <h3>Employment Details</h3>
        <input name="designation" placeholder="Designation" onChange={handleChange} />
        <input name="department" placeholder="Department" onChange={handleChange} />
        <input name="salary" placeholder="Monthly Salary" onChange={handleChange} />
        <input type="date" name="joining_date" onChange={handleChange} />
        <input name="work_location" placeholder="Work Location" onChange={handleChange} />

        <h3>Bank Details</h3>
        <input name="bank_name" placeholder="Bank Name" onChange={handleChange} />
        <input name="account_number" placeholder="Account Number" onChange={handleChange} />
        <input name="ifsc" placeholder="IFSC Code" onChange={handleChange} />

        <h3>Government Details</h3>
        <input name="aadhaar_number" placeholder="Aadhaar Number" onChange={handleChange} />
        <input name="pan_number" placeholder="PAN Number" onChange={handleChange} />

        <br /><br />
        <button type="submit">Create Worker & Generate Appointment</button>

      </form>
    </div>
  );
}

export default Dashboard;