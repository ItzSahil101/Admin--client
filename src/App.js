// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import OrderPage from "./components/OrderPage";
import Main from "./components/Main";
import Login from "./components/Login";

/** helper to safely read token data from localStorage */
function getTokenData() {
  try {
    const raw = localStorage.getItem("adminToken");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

/** returns true if token exists, matches expected value and not expired */
function isValidToken() {
  const tokenData = getTokenData();
  return (
    tokenData &&
    tokenData.token === "qwerty1!2@3#38" &&
    typeof tokenData.expiry === "number" &&
    tokenData.expiry > Date.now()
  );
}

/** ProtectedRoute: allow children only when token valid, otherwise redirect to "/" (login) */
function ProtectedRoute({ children }) {
  if (!isValidToken()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

/** PublicRoute: show the public page (Login). If already logged in, redirect to /main */
function PublicRoute({ children }) {
  if (isValidToken()) {
    return <Navigate to="/main" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* Root "/" serves as the login page (public). If logged in, it redirects to /main */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Alternate explicit login route (optional) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback: unknown paths -> if logged in send to /main, otherwise to / */}
        <Route
          path="*"
          element={isValidToken() ? <Navigate to="/main" replace /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}
