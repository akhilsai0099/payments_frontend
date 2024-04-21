import React, { useEffect, useState } from "react";
import InputField from "./InputComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormHeader from "./FormHeader";

const SignupComp = () => {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (form.password.length < 8) {
      setMsg("Password must be of Length 8");
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/user/signup`,
        form
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", form.firstName);
        setIsLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      setMsg(error.response.data.msg);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (msg !== "") {
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  }, [msg]);
  return (
    <div className="flex flex-col gap-3  bg-white px-20 py-10 rounded-md ">
      <FormHeader Title="Signup" Subtitle="Enter your Details to Signup" />
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <InputField
          type="email"
          placeholder="Enter your username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Enter your Firstname"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Enter your Lastname"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <InputField
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="submit"
          className="w-full px-3 py-2 border rounded-md shadow-md bg-black text-white cursor-pointer"
          value={isLoading ? "loading..." : "Login"}
        />
      </form>
      {msg !== "" && (
        <div className="bg-red-400 text-center p-1 rounded-md">
          <p>{msg}</p>
        </div>
      )}
    </div>
  );
};

export default SignupComp;
