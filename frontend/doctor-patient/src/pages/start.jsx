import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/home_background.jpg";  

const Start = () => {
  const navigate = useNavigate();
  return (
    <main
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#242B2E] h-screen overflow-hidden "
    >
      <section className="bg-gray-400 bg-opacity-75">
        <h1 className="text-blue-900 font-serif mx-auto text-5xl text-center font bold pt-6">
          Doctor Appointment Booking Application
        </h1>
        <section className=" w-full pb-12 h-screen flex gap-12 justify-center items-center">
          <div className="w-[200px] h-[250px] flex flex-col justify-center items-center gap-2 p-2 rounded-lg bg-white shadow-lg">
            <img
              className="w-full"
              src={require("../assets/patient_icon.png")}
              alt=""
            />
            <button
              onClick={() => {
                navigate("/user/login");
              }}
              className="bg-blue-500 rounded-md p-1 text-white  w-[90%]"
            >
              LOGIN AS PATIENT
            </button>
          </div>
          <div className="w-[200px] h-[250px] flex flex-col justify-center items-center gap-2 p-2 rounded-lg bg-white shadow-lg">
            <img
              className="w-full"
              src={require("../assets/doctor_icon.png")}
              alt=""
            />
            <button
              onClick={() => {
                navigate("user/login");
              }}
              className="bg-blue-500 rounded-md p-1 text-white  w-[90%]"
            >
              LOGIN AS DOCTOR
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Start;
