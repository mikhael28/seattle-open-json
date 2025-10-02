import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import ResourceGuide from "./pages/ResourceGuide";
import Permitting from "./pages/Permitting";
import SiteMapDesignerPage from "./pages/SiteMapDesignerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile /> } />
          <Route path="resource-guide" element={<ResourceGuide />} />
          <Route path="permitting" element={<Permitting />} />
          <Route path="site-map-designer" element={<SiteMapDesignerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
