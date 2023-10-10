import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import FriendsLinks from "./pages/FriendsLinks"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
        <Route path="/" exact element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/blog" element={<Blog />} />
        <Route path="/friendsLinks" element={<FriendsLinks />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
