import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProviderDashboard from "./pages/ProviderDashboard";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(() => {
    // Load user from localStorage on first render
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4 mb-4">
          <Link to="/" className="text-blue-500">Home</Link>
          {!user && <Link to="/signup" className="text-green-500">Sign Up</Link>}
          {!user && <Link to="/login" className="text-purple-500">Login</Link>}
          {user && user.role === "provider" && <Link to="/dashboard" className="text-orange-500">Dashboard</Link>}
          {user && <button onClick={handleLogout} className="text-red-500">Logout</button>}
        </nav>

        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/signup" element={<Signup onSignup={setUser} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route
            path="/dashboard"
            element={
              user?.role === "provider" ? (
                <ProviderDashboard user={user} />
              ) : (
                <div>Access Denied</div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;