// import { Navigate } from "react-router-dom";
// import { auth } from "../firebase/firebaseConfig";

// function AdminRoute({ children }) {
//   const user = auth.currentUser;

//   if (!user) {
//     return <Navigate to="/signin" />;
//   }

//   // Replace with your admin email
//   if (user.email !== "salvationmaduka1@gmail.com") {
//     return <Navigate to="/dashboard" />;
//   }

//   return children;
// }

// export default AdminRoute;


// new line of code below
// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// function AdminRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const checkAdmin = async () => {
//       const user = auth.currentUser;

//       if (!user) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const userRef = doc(db, "users", user.uid);

//         const userSnap = await getDoc(userRef);

//         if (
//           userSnap.exists() &&
//           userSnap.data().isAdmin === true
//         ) {
//           setIsAdmin(true);
//         }
//       } catch (error) {
//         console.log(error);
//       }

//       setLoading(false);
//     };

//     checkAdmin();
//   }, []);

//   if (loading) {
//     return <p>Checking permissions...</p>;
//   }

//   if (!isAdmin) {
//     return <Navigate to="/dashboard" />;
//   }

//   return children;
// }

// export default AdminRoute;

// jsx
// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// function AdminRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         setIsAdmin(false);
//         setLoading(false);
//         return;
//       }

//       try {
//         const userRef = doc(db, "users", user.uid);
//         const userSnap = await getDoc(userRef);

//         if (userSnap.exists() && userSnap.data().isAdmin === true) {
//           setIsAdmin(true);
//         } else {
//           setIsAdmin(false);
//         }
//       } catch (error) {
//         console.error("Error checking admin permissions:", error);
//         setIsAdmin(false);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600">Checking permissions...</p>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// }

// export default AdminRoute;




import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().isAdmin === true) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin permissions:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking permissions...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default AdminRoute;