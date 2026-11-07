import React, { useState } from "react";
import bg1 from "../assets/bg1.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveChat from "../components/LiveChat";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { db } from "../firebase/firebaseConfig";

import { doc, setDoc,} from "firebase/firestore";

function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

     setLoading(true);

     await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      // await createUserWithEmailAndPassword(auth, email, password);

      const userCredential =
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

const user = userCredential.user;

await setDoc(
  doc(db, "users", user.uid),
  {
    uid: user.uid,
    fullName,
    phoneNumber,
    email,
    createdAt: new Date(),
  }
);

      alert("Account created successfully!");

      navigate("/signup-success");
    } catch (error) {
  // alert(error.message);
  

  let errorMessage =
    "Something went wrong. Please try again.";

  if (error.code === "auth/email-already-in-use") {
    errorMessage =
      "This email address is already registered.";
  }

  if (error.code === "auth/invalid-email") {
    errorMessage =
      "Please enter a valid email address.";
  }

  if (error.code === "auth/weak-password") {
    errorMessage =
      "Password must be at least 6 characters.";
  }

  navigate("/auth-error", {
    state: {
      message: errorMessage,
    },
  });
}
  finally {
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

        {/* Signup Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
          {/* Heading */}
          <div className="text-center mb-3">
            <h1 className="text-white text-4xl font-bold">Create Account</h1>

            <p className="text-gray-300 mt-2">Join PaddyBOT today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            {/* Full Name */}
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              autoComplete="name"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-red-500 transition"
            />

            {/* Number*/}
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              autoComplete="tel"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-red-500 transition"
            />

            {/* Email */}
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-red-500 transition"
            />

           

            <div className="relative">
  <input
    id="password"
    name="password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    autoComplete="new-password"
    className="w-full px-4 py-3 pr-16 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-red-500 transition"
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


            <div className="relative">
  <input
    id="confirmPassword"
    name="confirmPassword"
    type={showPassword ? "text" : "password"}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    placeholder="Confirm Password"
    autoComplete="new-password"
    className="w-full px-4 py-3 pr-16 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-transparent focus:border-red-500 transition"
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

  <div className="text-white">
        <p>password must have minimum of 6 characters, uppercase,lowercase and number</p>
        </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Bottom Text */}
          <p className="text-gray-300 text-center mt-6">
            Already have an account?
            <Link to="/signin" className="text-red-400 hover:underline ml-2">
              Sign In
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
        Creating your account...
      </p>
    </div>
  </div>
)}

      </section>

      <Footer />
    </>
  );
}

export default SignUp;
