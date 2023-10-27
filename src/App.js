import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import FriendsLinks from "./pages/FriendsLinks";
import NotFound from "./pages/NotFound";
import QbMusic from "./pages/Music";
import BlogDetail from "./pages/BlogDetail";
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        {/* 填充物 */}
        <div className="w-full h-[68.35px] lg:h-[76px]"></div>
        <Routes>
          <Route path="/" exact element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/friendsLinks" element={<FriendsLinks />} />
          <Route path="/qbmusic" element={<QbMusic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
