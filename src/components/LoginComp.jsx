import React, { useEffect, useState } from "react";
import InputField from "./InputComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormHeader from "./FormHeader";
const LoginComp = () => {
  const [form, setForm] = useState({ username: "", password: "" });
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
        "http://localhost:3000/api/v1/user/signin",
        form
      );
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.firstName);
        setIsLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      setMsg("Invalid username or password");
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
      <FormHeader Title="Login" Subtitle="Enter your Details to Login" />
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

export default LoginComp;
