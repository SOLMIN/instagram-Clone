import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';

const App: React.FC = () => {
  const loggedInUser = useSelector((state: RootState) => state.users.loggedInUser);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={loggedInUser ? <Layout><Home /></Layout> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;