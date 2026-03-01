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

  const [documents, setDocuments] = useState({
    aadhaar: null,
    pan: null,
    resume: null,
    signedAppointment: null,
  });

  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  // ================= FETCH OFFER =================
  useEffect(() => {
    if (!offerId) return;

    const fetchOffer = async () => {
      try {
        const res = await axios.get(`${API}/api/offers/${offerId}`);
        setOffer(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [offerId]);

  // ================= INIT SIGNATURE PAD =================
  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current);
    }
  }, []);

  const clearSignature = () => {
    signaturePadRef.current.clear();
  };

  const handleFileChange = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!signaturePadRef.current || signaturePadRef.current.isEmpty()) {
      alert("Please provide digital signature");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("signature", signaturePadRef.current.toDataURL());
    formData.append("aadhaar", documents.aadhaar);
    formData.append("pan", documents.pan);
    formData.append("resume", documents.resume);
    formData.append("signedAppointment", documents.signedAppointment);

    try {
      await axios.post(
        `${API}/api/offers/${offerId}/submit`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Onboarding completed successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Submission failed");
    }

    setSubmitting(false);
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!offer) return <div style={{ padding: 40 }}>Offer not found.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Employee Onboarding</h2>

        {/* ================= OFFER DETAILS ================= */}
        <div style={styles.section}>
          <h3>Offer Details</h3>
          <p><strong>Name:</strong> {offer.candidate_name}</p>
          <p><strong>Email:</strong> {offer.email}</p>
          <p><strong>Mobile:</strong> {offer.mobile}</p>
          <p><strong>Designation:</strong> {offer.designation}</p>
          <p><strong>Salary:</strong> ₹{offer.salary}</p>
          <p><strong>Joining Date:</strong> {offer.date_of_joining}</p>
          <p><strong>Location:</strong> {offer.work_location}</p>
        </div>

        {/* ================= DOCUMENT UPLOAD ================= */}
        <div style={styles.section}>
          <h3>Upload Documents</h3>

          <input type="file" name="aadhaar" onChange={handleFileChange} />
          <br /><br />

          <input type="file" name="pan" onChange={handleFileChange} />
          <br /><br />

          <input type="file" name="resume" onChange={handleFileChange} />
          <br /><br />

          <input type="file" name="signedAppointment" onChange={handleFileChange} />
        </div>

        {/* ================= SIGNATURE PAD ================= */}
        <div style={styles.section}>
          <h3>Digital Signature</h3>

          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            style={styles.canvas}
          />

          <br />

          <button onClick={clearSignature} style={styles.clearBtn}>
            Clear Signature
          </button>
        </div>

        {/* ================= SUBMIT ================= */}
        <div style={{ marginTop: 20 }}>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={styles.submitBtn}
          >
            {submitting ? "Submitting..." : "Submit Onboarding"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    width: 650,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  section: {
    marginBottom: 25,
  },
  canvas: {
    border: "1px solid #333",
    borderRadius: 6,
  },
  clearBtn: {
    padding: "6px 12px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  submitBtn: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};