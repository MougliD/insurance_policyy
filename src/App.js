import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserData from "./components/UserData";
import ErrorBoundary from "./components/ErrorBoundary";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userdata" element={<UserData />} />
            <Route path="/user/:userId" element={<UserProfile />} />{" "}
            {/* Add this route */}
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
