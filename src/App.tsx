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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Profiles />} />
        <Route path="bets" element={<Bets />} />
        <Route path="results" element={<Results />} />
        <Route path="logs" element={<Logs />} />
        <Route path="admins" element={<Admins />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
