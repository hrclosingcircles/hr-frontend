import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SignaturePad from "signature_pad";

const API =
  process.env.REACT_APP_API_URL ||
  "https://hr-onboarding-system-1.onrender.com";

export default function OnboardingForm() {
  const { offerId } = useParams();

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  // ✅ FIXED: fetchOffer moved inside useEffect
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get(`${API}/api/offers/${offerId}`);
        setOffer(res.data);
      } catch (error) {
        console.error("Error fetching offer:", error);
      } finally {
        setLoading(false);
      }
    };

    if (offerId) {
      fetchOffer();
    }
  }, [offerId]);

  // Initialize Signature Pad
  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current);
    }
  }, []);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSubmit = async () => {
    if (!signaturePadRef.current || signaturePadRef.current.isEmpty()) {
      alert("Please provide signature");
      return;
    }

    setSubmitting(true);

    const signatureData = signaturePadRef.current.toDataURL("image/png");

    try {
      await axios.post(`${API}/api/offers/${offerId}/submit`, {
        signature: signatureData,
      });

      alert("Onboarding submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting onboarding");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  if (!offer) return <div style={{ padding: 40 }}>Offer not found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Employee Onboarding</h2>

        <div style={styles.info}>
          <p><strong>Name:</strong> {offer.candidate_name}</p>
          <p><strong>Email:</strong> {offer.email}</p>
          <p><strong>Mobile:</strong> {offer.mobile}</p>
          <p><strong>Designation:</strong> {offer.designation}</p>
          <p><strong>Salary:</strong> ₹{offer.salary}</p>
          <p><strong>Joining Date:</strong> {offer.joining_date}</p>
          <p><strong>Location:</strong> {offer.location}</p>
        </div>

        <hr />

        <h3>Digital Signature</h3>

        <canvas
          ref={canvasRef}
          width={500}
          height={200}
          style={styles.canvas}
        />

        <div style={styles.buttonRow}>
          <button style={styles.clearBtn} onClick={clearSignature}>
            Clear
          </button>

          <button
            style={styles.submitBtn}
            onClick={handleSubmit}
            disabled={submitting}
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
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 10,
    width: 600,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  info: {
    lineHeight: 1.8,
  },
  canvas: {
    border: "1px solid #333",
    borderRadius: 6,
    marginTop: 10,
  },
  buttonRow: {
    marginTop: 15,
    display: "flex",
    justifyContent: "space-between",
  },
  clearBtn: {
    padding: "8px 15px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  submitBtn: {
    padding: "8px 15px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};