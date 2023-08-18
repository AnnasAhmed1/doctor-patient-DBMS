import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/start";
import UserLogin from "./pages/user/userLogin";
import UserRegister from "./pages/user/userRegister";
import DoctorLogin from "./pages/doctor/doctorLogin";
import DoctorRegister from "./pages/doctor/DoctorRegister";
import UserHome from "./pages/user/userHome";
import DoctorHome from "./pages/doctor/doctorHome";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/doctor/home" element={<DoctorHome />} />
        {/* <Route path="/doctor/register" element={<Start />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
