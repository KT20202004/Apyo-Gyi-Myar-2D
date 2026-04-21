/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { AuthProvider, useAuth } from "@/src/components/AuthProvider";
import Layout from "@/src/components/Layout";
import Auth from "@/src/pages/Auth";
import Profiles from "@/src/pages/Profiles";
import Bets from "@/src/pages/Bets";
import Results from "@/src/pages/Results";
import Logs from "@/src/pages/Logs";
import Admins from "@/src/pages/Admins";
import { ToastProvider } from "@/src/components/Toast";
import PageTransition from "@/src/components/PageTransition";
import { AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  
  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/auth" element={user ? <Navigate to="/" replace /> : <PageTransition><Auth /></PageTransition>} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<PageTransition><Profiles /></PageTransition>} />
          <Route path="bets" element={<PageTransition><Bets /></PageTransition>} />
          <Route path="results" element={<PageTransition><Results /></PageTransition>} />
          <Route path="logs" element={<PageTransition><Logs /></PageTransition>} />
          <Route path="admins" element={<PageTransition><Admins /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
