import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";
import ServicesListing from "./Components/ServicesListing";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ServiceCategory from "./Components/ServiceCategory";
import Appointment from "./Components/Appointment";
import Admin from "./Components/Admin";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Profile from "./Components/Profile";
const App = () => {
  return (
    <div>
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/services" element={<ServicesListing />}></Route>
            <Route path="/appointment" element={<Appointment />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/service-category/:id" element={<ServiceCategory />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
