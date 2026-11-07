import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HowItWorks from "./pages/HowItWorks";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupSuccess from "./pages/SignupSuccess";
import SigninSuccess from "./pages/SigninSuccess";
import AuthError from "./pages/AuthError";
import NotFound from "./pages/NotFound";
import History from "./pages/History";
import Profile from "./pages/Profile";
import CompanionCall from "./pages/CompanionCall";
import ShoutOutCall from "./pages/ShoutOutCall";
import ReminderCall from "./pages/ReminderCall";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminRoute from "./components/AdminRoute";
import BookingSuccess from "./pages/BookingSuccess";
import PricingPayment from "./pages/PricingPayment";

console.log(auth);

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <div>
        {/* Firebase Connected */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth-error"element={<AuthError />}/>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
          path="/dashboard/companion-call"
          element={
            <ProtectedRoute>
              <CompanionCall />
            </ProtectedRoute>
          }
        />

        <Route 
         path="/signup-success"
         element={
          <ProtectedRoute>
            <SignupSuccess />
          </ProtectedRoute>
         }
        />

              <Route 
         path="/signin-success"
         element={
          <ProtectedRoute>
            <SigninSuccess />
          </ProtectedRoute>
         }
        />

        <Route
  path="/dashboard/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/shoutout-call"
  element={
    <ProtectedRoute>
      <ShoutOutCall />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/reminder-call"
  element={
    <ProtectedRoute>
      <ReminderCall />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/dashboard/booking-success"
  element={<BookingSuccess />}
/>

<Route
  path="/dashboard/pricing-payment"
  element={<PricingPayment />}
/>

        {/* remains the last, nothing comes below here */}
        <Route path="*" element={<NotFound />} />
        </Routes>
        
      </div>
    </>
  );
}

export default App;
