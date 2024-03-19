import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import MainPageContent from "./pages/MainContent";
import Admin from "./pages/Admin";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <Router>
        <div className="container">
          <Routes>
            <Route index element={<MainPageContent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
