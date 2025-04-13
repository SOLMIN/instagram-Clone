import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useAppDispatch } from './store/hooks'; // Adjust the import path based on your project structure
import { fetchUsers } from './store/userSlice'; 
import Profile from './pages/Profile';
import Layout from './components/Layout';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when the app loads
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;