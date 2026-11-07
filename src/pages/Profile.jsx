import React, { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import { auth, db } from "../firebase/firebaseConfig";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { updatePassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";



function Profile() {

    const navigate = useNavigate();

const [userData, setUserData] =
  useState(null);

const [fullName, setFullName] =
  useState("");

const [newPassword, setNewPassword] =
  useState("");

  useEffect(() => {
  const fetchUser = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const docRef = doc(
      db,
      "users",
      user.uid
    );

    const docSnap =
      await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());

      setFullName(
        docSnap.data().fullName
      );
    }
  };

  fetchUser();
}, []);

// update name function 

const handleUpdateProfile =
  async () => {
    try {
      const user =
        auth.currentUser;

      await updateDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          fullName,
        }
      );

      alert(
        "Profile updated successfully!"
      );
    } catch (error) {
      console.log(error);
    }
  };

//   update password function

const handleChangePassword =
  async () => {
    try {
      const user =
        auth.currentUser;

      await updatePassword(
        user,
        newPassword
      );

      alert(
        "Password updated successfully!"
      );

      setNewPassword("");
    } catch (error) {
      console.log(error);

      alert(
        "Please log out and log back in before changing password."
      );
    }
  };



  return (
  <DashboardLayout>
    <div className="max-w-3xl mx-auto">

        <div className="flex flex-col items-center mb-8">

  <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-3xl font-bold">

    {fullName?.charAt(0)}

  </div>

  <h2 className="mt-4 text-xl font-bold">
    {fullName}
  </h2>

</div>

      <div className="bg-white rounded-3xl shadow-md p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="space-y-6">

          <div>
            <label className="font-semibold block mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Email
            </label>

            <input
              type="email"
              value={
                userData?.email || ""
              }
              disabled
              className="w-full border rounded-xl p-4 bg-gray-100"
            />
          </div>

          <button
            onClick={
              handleUpdateProfile
            }
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
          >
            Update Profile
          </button>

          <hr />

          <div>
            <label className="font-semibold block mb-2">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />
          </div>

          <button
            onClick={
              handleChangePassword
            }
            className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl transition"
          >
            Change Password
          </button>

        </div>

      </div>
    </div>
  </DashboardLayout>
);
}

export default Profile;
