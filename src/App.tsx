import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useAppDispatch } from './store/hooks'; // Adjust the import path based on your project structure
import { fetchUsers, setLoggedInUser } from './store/userSlice'; 
import Profile from './pages/Profile';
import Layout from './components/Layout';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when the app loads
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the setLoggedInUser action with a sample user
    dispatch(
      setLoggedInUser({
        id: '1',
        username: 'john_doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'John Doe',
        bio: 'Photographer | Traveler | Dreamer',
        followers: 1200,
        following: 300,
        posts: [],
      })
    );
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