import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import OnboardingForm from "./pages/OnboardingForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/onboarding/:offerId" element={<OnboardingForm />} />
      </Routes>
    </Router>
  );
}

export default App;