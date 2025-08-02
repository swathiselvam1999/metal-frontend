import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PurityPage from "./pages/PurityPage";
import RatePage from "./pages/RatePage";
import Navbar from "./components/Navbar"; // ⬅️ You’ll create this next

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/purity" />} />
          <Route path="/purity" element={<PurityPage />} />
          <Route path="/rate" element={<RatePage />} />
        </Routes>
    </Router>
  );
}

export default App;
