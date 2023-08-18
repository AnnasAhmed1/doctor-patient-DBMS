import React, { useState } from "react";
import ButtonComp from "../../components/buttonComp";
import InputComp from "../../components/inputComp";
import { useNavigate } from "react-router-dom";
import instance from "../../config/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Layout from "../../components/layout";

const UserRegister = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const navigate = useNavigate();

  const handleRegister = (email, password, name) => {
    try {
      instance
        .post("/api/user/register", { email, password, name })
        .then((res) => {
          if (res.data.success) {
            toast.success("User Successfully Registered");
            navigate("/user/login");
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
        User Register
      </h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister(email, password, name);
        }}
        className="w-full px-4 mt-4 flex flex-col gap-3"
      >
        <InputComp id="Name" placeholder="Enter your Name" setState={setName} />
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
            navigate("/user/login");
          }}
        >
          Already a member! Login
        </p>
        <ButtonComp text={"Register"} type="submit" />
      </form>
    </Layout>
  );
};

export default UserRegister;
