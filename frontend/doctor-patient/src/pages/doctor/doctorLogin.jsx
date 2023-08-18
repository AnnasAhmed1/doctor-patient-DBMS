import React, { useState } from "react";
import ButtonComp from "../../components/buttonComp";
import InputComp from "../../components/inputComp";
import { useNavigate } from "react-router-dom";
import instance from "../../config/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Layout from "../../components/layout";

const DoctorLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    try {
      instance.post("/api/doctor/login", { email, password }).then((res) => {
        if (res.data.success) {
          toast.success("LoggedIn Successfully");
          Cookies.set("doctorId", res.data.data._id);
          navigate("/doctor/home");
          console.log(res.data);
        } else {
          console.log(res.data, "error");
          toast.error(
            `${res.data.message ? res.data.message : "something went wrong"}`,
            1000
          );
        }
      });
    } catch (error) {
      toast.error("something went wrong", 1000);
    }
  };

  return (
    <Layout>
      <h1 className=" text-center font-bold text-3xl border-b pb-2">
        Doctor Login
      </h1>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}
        className="w-full px-4 mt-4 flex flex-col gap-3"
      >
        <InputComp
          id="Email"
          placeholder="Enter your email"
          setState={setEmail}
        />
        <InputComp
          id="Password"
          placeholder="Enter your password"
          setState={setPassword}
          type="password"
        />
        <p
          className="cursor-pointer px-2 text-sm text-blue-600 underline"
          onClick={() => {
            navigate("/doctor/register");
          }}
        >
          Not a member! Register
        </p>
        <ButtonComp text={"Login"} type="submit" />
      </form>
    </Layout>
  );
};

export default DoctorLogin;
