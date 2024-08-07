// src/App.js
import React ,{ useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

const AppContent = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("Supabase Session:",session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Supabase Session:",session);
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={session ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={session ? <Home user= {session.user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
      <AppContent />
  );
};

export default App;

