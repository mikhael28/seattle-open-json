import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import ResourceGuide from "./pages/ResourceGuide";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile /> } />
          <Route path="resource-guide" element={<ResourceGuide />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
