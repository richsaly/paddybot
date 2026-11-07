import React, { useState } from "react";
import bg1 from "../assets/bg1.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveChat from "../components/LiveChat";

import { useNavigate } from "react-router-dom";


import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { auth } from "../firebase/firebaseConfig";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();


    setLoading(true);

await new Promise((resolve) =>
  setTimeout(resolve, 3000)
);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("Logged In:", userCredential.user);

      navigate("/signin-success");
    } catch (error) {
      // alert("Invalid email or password");
      navigate("/auth-error", {
  state: {
    message:
      "Invalid email or password. Please check your details and try again.",
  },
});
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <LiveChat />

      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-6 pt-24"
        style={{
          backgroundImage: `url(${bg1})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Signin Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
          {/* Heading */}
          <div className="text-center mb-3">
            <h1 className="text-white text-4xl font-bold">Welcome Back</h1>

            <p className="text-gray-300 mt-2">
              Sign in to continue to PaddyBOT
            </p>
          </div>

          {/* Form */}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Full Name */}
            {/* <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-red-500 transition"
            /> */}

            {/* Email */}
            
            

              <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // id="email"
              // name="email"
              // type="email"

              placeholder="Email Address"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-red-500 transition"
            />
          <div className="relative">
            {/* Password */}
            <input
              // type="password"
                type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // id="password"
              // name="password"
              // type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-red-500 transition"
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {/* {showPassword ? "Hide" : "Show"} */}
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            

            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Bottom Text */}
          <p className="text-gray-300 text-center mt-6">
            Don't have an account yet?
            <Link to="/signUp" className="text-red-400 hover:underline ml-2">
              SignUp
            </Link>
          </p>
        </div>

          {loading && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
    <div className="flex flex-col items-center">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-white mt-4 text-lg font-medium">
        Verifying your credentials...
      </p>
    </div>
  </div>
)}
      </section>

      <Footer />
    </>
  );
}

export default SignIn;
