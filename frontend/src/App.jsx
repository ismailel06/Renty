import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProviderDashboard from "./pages/ProviderDashboard.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4 mb-4">
          <Link to="/" className="text-blue-500">Home</Link>
          {!user && <Link to="/signup" className="text-green-500">Sign Up</Link>}
          {!user && <Link to="/login" className="text-purple-500">Login</Link>}
          {user && user.role === "provider" && <Link to="/dashboard" className="text-orange-500">Dashboard</Link>}
        </nav>

        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/dashboard" element={user?.role === "provider" ? <ProviderDashboard user={user} /> : <div>Access Denied</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;