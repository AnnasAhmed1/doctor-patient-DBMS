import React, { useState } from "react";
import ButtonComp from "../../components/buttonComp";
import InputComp from "../../components/inputComp";
import { useNavigate } from "react-router-dom";
import instance from "../../config/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Layout from "../../components/layout";

const DoctorRegister = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [specialization, setSpecialization] = useState();
  const [experience, setExperience] = useState();
  const [feePerCunsultation, setFeePerCunsultation] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const navigate = useNavigate();

  const handleRegister = (
    email,
    password,
    name,
    phoneNumber,
    specialization,
    experience,
    feePerCunsultation,
    [startTime, endTime]
  ) => {
    try {
      instance
        .post("/api/doctor/register", {
          email,
          password,
          name,
          phoneNumber,
          specialization,
          experience,
          feePerCunsultation,
          timings: [startTime, endTime],
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("User Successfully Registered");
            navigate("/doctor/login");
            console.log(res.data);
          } else {
            console.log(res.data, "error");
            toast.error(`${res.data.message}`, 1000);
          }
        });
    } catch (error) {
      toast.error("something went wrong", 1000);
    }
  };

  return (
    <Layout>
      <h1 className=" text-center font-bold text-3xl border-b pb-2">
        Doctor Register
      </h1>
      <form
        className="w-full px-4 mt-4 flex flex-col gap-3 h-[400px] overflow-scroll"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister(
            email,
            password,
            name,
            phoneNumber,
            specialization,
            experience,
            feePerCunsultation,
            [startTime, endTime]
          );
        }}
      >
        <InputComp id="Name" placeholder="Enter your Name" setState={setName} />
        <InputComp
          id="Email"
          placeholder="Enter your email"
          setState={setEmail}
          type="email"
        />
        <InputComp
          id="Password"
          placeholder="Enter your password"
          setState={setPassword}
          type="password"
        />
        <InputComp
          id="Phone Number"
          placeholder="Enter your phone number"
          setState={setPhoneNumber}
          type="number"
        />
        <InputComp
          id="Specialization"
          placeholder="Enter your specialization"
          setState={setSpecialization}
        />
        <InputComp
          id="Experience"
          placeholder="Enter your experience"
          setState={setExperience}
        />
        <InputComp
          id="Fee Per Consultation"
          placeholder="Enter your fee per consultation"
          setState={setFeePerCunsultation}
        />
        <InputComp
          id="Start time"
          placeholder="Enter your start time"
          setState={setStartTime}
          type="number"
        />
        <InputComp
          id="End time"
          placeholder="Enter your end time"
          setState={setEndTime}
          type="number"
        />
        <p
          className="cursor-pointer px-2 text-sm text-blue-600 underline"
          onClick={() => {
            navigate("/doctor/login");
          }}
        >
          Already a member Login!
        </p>
        <ButtonComp text={"Register"} type="submit" />
      </form>
    </Layout>
  );
};

export default DoctorRegister;
