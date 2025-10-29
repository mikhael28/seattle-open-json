import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import ResourceGuide from "./pages/ResourceGuide";
import Permitting from "./pages/Permitting";
import SiteMapDesignerPage from "./pages/SiteMapDesignerPage";
import SCSDataExplorer from "./pages/SCSDataExplorer";
import AboutSCS from "./pages/AboutSCS";
import SCSDashboard from "./pages/SCSDashboard";
import PermitDataExplorerPage from "./pages/PermitDataExplorerPage";
import PresentationMode from "./pages/PresentationMode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SCSDashboard />} />
          <Route path="civic-entities" element={<SCSDashboard />} />
          <Route path="resource-guide" element={<ResourceGuide />} />
          <Route path="about-scs" element={<AboutSCS />} />
          <Route path="scs-explorer" element={<SCSDataExplorer />} />
          <Route path="permitting" element={<Permitting />} />
          <Route
            path="permit-data-explorer"
            element={<PermitDataExplorerPage />}
          />
          <Route path="site-map-designer" element={<SiteMapDesignerPage />} />
          <Route path="presentation" element={<PresentationMode />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
