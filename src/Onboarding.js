import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import SignatureCanvas from "react-signature-canvas";

function Onboarding() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const sigRef = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/workers/${id}`)
      .then((res) => setWorker(res.data));
  }, [id]);

  const clear = () => {
    sigRef.current.clear();
  };

  const submitSignature = async () => {
    if (sigRef.current.isEmpty()) {
      alert("Signature required");
      return;
    }

    const signature = sigRef.current
      .getCanvas()
      .toDataURL("image/png");

    await axios.post(
      `http://localhost:5000/api/upload/signed/${id}`,
      { signature }
    );

    alert("Signed Appointment Uploaded");
  };

  if (!worker) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Worker Onboarding</h2>

      <p>Name: {worker.full_name}</p>
      <p>Designation: {worker.designation}</p>
      <p>Department: {worker.department}</p>
      <p>Salary: ₹{worker.salary}</p>

      <br />

      <a
        href={`http://localhost:5000/letters/${worker.worker_id}.pdf`}
        target="_blank"
        rel="noreferrer"
      >
        Download Appointment Letter
      </a>

      <h3>Sign Appointment</h3>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 500,
          height: 200,
          style: { border: "1px solid black" }
        }}
      />

      <br />

      <button onClick={clear}>Clear</button>
      <button onClick={submitSignature}>
        Submit Signed Appointment
      </button>
    </div>
  );
}

export default Onboarding;