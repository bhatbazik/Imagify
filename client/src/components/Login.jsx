import React, { useEffect } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("login");
  const { setShowLogin } = useContext(AppContext);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img width={24} src={assets.profile_icon} alt="" />
            <input
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input
            className="outline-none text-sm"
            type="email"
            placeholder="Email id"
            required
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "login" ? "Login" : "Create account"}
        </button>

        {state === "login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            ALready have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("login")}
            >
              Login
            </span>
          </p>
        )}
        <img
          className="absolute top-5 right-5 cursor pointer "
          src={assets.cross_icon}
          alt=""
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
};

export default Login;
