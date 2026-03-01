import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SignaturePad from "signature_pad";

const API =
  process.env.REACT_APP_API_URL?.trim() ||
  "https://hr-onboarding-system-1.onrender.com";

export default function OnboardingForm() {
  const { offerId } = useParams();

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [locked, setLocked] = useState(false);

  const [joiningDetails, setJoiningDetails] = useState({
    father_name: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    bank_name: "",
    account_number: "",
    ifsc: "",
    emergency_name: "",
    emergency_contact: "",
    qualification: "",
    university: "",
    passing_year: "",
  });

  const [documents, setDocuments] = useState({});

  const canvasRef = useRef(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get(`${API}/api/offers/${offerId}`);
        setOffer(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [offerId]);

  useEffect(() => {
    if (canvasRef.current) {
      signatureRef.current = new SignaturePad(canvasRef.current);
    }
  }, []);

  const handleChange = (e) => {
    setJoiningDetails({
      ...joiningDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setDocuments({
      ...documents,
      [e.target.name]: e.target.files[0],
    });
  };

  const lockDetails = () => {
    if (!joiningDetails.father_name || !joiningDetails.address) {
      alert("Please fill required fields before locking.");
      return;
    }
    setLocked(true);
  };

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  const handleSubmit = async () => {
    if (!locked) {
      alert("Lock details before signing.");
      return;
    }

    if (signatureRef.current.isEmpty()) {
      alert("Please provide digital signature.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("joiningDetails", JSON.stringify(joiningDetails));
    formData.append("signature", signatureRef.current.toDataURL());

    Object.keys(documents).forEach((key) => {
      formData.append(key, documents[key]);
    });

    try {
      await axios.post(
        `${API}/api/offers/${offerId}/submit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Onboarding submitted successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }

    setSubmitting(false);
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!offer) return <div style={{ padding: 40 }}>Offer not found.</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Employee Onboarding v99 TEST</h2>

      <h3>Offer Details</h3>
      <p>Name: {offer.candidate_name}</p>
      <p>Email: {offer.email}</p>
      <p>Designation: {offer.designation}</p>
      <p>Salary: ₹{offer.salary}</p>

      <hr />

      <h3>Joining Details</h3>

      <input name="father_name" placeholder="Father Name" onChange={handleChange} disabled={locked} /><br /><br />
      <input type="date" name="dob" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="gender" placeholder="Gender" onChange={handleChange} disabled={locked} /><br /><br />

      <textarea name="address" placeholder="Full Address" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="city" placeholder="City" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="state" placeholder="State" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="pincode" placeholder="Pincode" onChange={handleChange} disabled={locked} /><br /><br />

      <input name="bank_name" placeholder="Bank Name" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="account_number" placeholder="Account Number" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="ifsc" placeholder="IFSC Code" onChange={handleChange} disabled={locked} /><br /><br />

      <input name="emergency_name" placeholder="Emergency Contact Name" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="emergency_contact" placeholder="Emergency Contact Number" onChange={handleChange} disabled={locked} /><br /><br />

      <input name="qualification" placeholder="Qualification" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="university" placeholder="University" onChange={handleChange} disabled={locked} /><br /><br />
      <input name="passing_year" placeholder="Passing Year" onChange={handleChange} disabled={locked} /><br /><br />

      {!locked && (
        <button onClick={lockDetails}>Lock Details & Proceed to Signature</button>
      )}

      <hr />

      <h3>Upload Documents</h3>
      <label>Aadhaar Card</label><br />
      <input type="file" name="aadhaar" onChange={handleFileChange} /><br /><br />

      <label>PAN Card</label><br />
      <input type="file" name="pan" onChange={handleFileChange} /><br /><br />

      <label>Bank Proof</label><br />
      <input type="file" name="bank_proof" onChange={handleFileChange} /><br /><br />

      <label>Passport Photo</label><br />
      <input type="file" name="photo" onChange={handleFileChange} /><br /><br />

      <label>Signed Appointment Letter</label><br />
      <input type="file" name="signedAppointment" onChange={handleFileChange} /><br /><br />

      {locked && (
        <>
          <h3>Digital Signature</h3>
          <canvas ref={canvasRef} width={500} height={200} style={{ border: "1px solid black" }} />
          <br />
          <button onClick={clearSignature}>Clear</button>
          <br /><br />
          <button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Final Submit"}
          </button>
        </>
      )}
    </div>
  );
}