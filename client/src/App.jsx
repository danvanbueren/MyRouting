import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import MainPageContent from "./pages/MainContent";
import Admin from "./pages/Admin";

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route index element={<MainPageContent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
