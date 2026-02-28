import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import CreateOffer from "./pages/CreateOffer";
import OnboardingForm from "./pages/OnboardingForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create-offer" element={<CreateOffer />} />

        {/* Candidate Onboarding */}
        <Route path="/onboarding/:id" element={<OnboardingForm />} />

        {/* 404 */}
        <Route path="*" element={<h2 style={{ padding: 40 }}>404 Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;