import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const PurityPage = React.lazy(() => import("./pages/PurityPage"));
const RatePage = React.lazy(() => import("./pages/RatePage"));
const Navbar = React.lazy(() => import("./components/Navbar"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/purity" />} />
          <Route path="/purity" element={<PurityPage />} />
          <Route path="/rate" element={<RatePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
