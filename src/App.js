import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import OnboardingForm from "./pages/OnboardingForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Panel */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Candidate Onboarding */}
        <Route path="/onboarding/:offer_id" element={<OnboardingForm />} />

        {/* Default Route */}
        <Route path="*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;