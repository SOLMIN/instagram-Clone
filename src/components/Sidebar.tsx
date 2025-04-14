import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux'; // Updated import to include useDispatch
import { RootState } from '../store/store'; // Adjust the import path based on your project structure
import { Post } from '../constants/mockData';
const FaHome = require('react-icons/fa').FaHome;
const IoSearch = require('react-icons/io5').IoSearch;
const MdOutlineExplore = require('react-icons/md').MdOutlineExplore;
const FaFacebookMessenger = require('react-icons/fa').FaFacebookMessenger;
const RiHeartAdd2Line = require('react-icons/ri').RiHeartAdd2Line;
const MdOutlineAutoAwesome = require('react-icons/md').MdOutlineAutoAwesome;
const BsChatDots = require('react-icons/bs').BsChatDots;
const CgAddR =  require('react-icons/cg').CgAddR;
const IoIosLogOut =  require("react-icons/io").IoIosLogOut;
const HiOutlineDotsHorizontal = require('react-icons/hi').HiOutlineDotsHorizontal;
import CreatePostModal from './CreatePostModal';
import { clearLoggedInUser } from '../slice/userSlice';
import { addPost } from '../slice/postSlice';

const SidebarContainer = styled.div`
  width: 220px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
  padding-top: 8px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 12px;
  position: fixed;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 370px;
    height: 30px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 50px;
    border-top: 1px solid #ddd;
    padding-right: 30px;
    padding-left: 30px;
    flex-direction: row; /* Change to row for mobile */
  }
`;

const Logo = styled.h1`
  font-family: Cursive;
  font-size: 28px;
  margin-bottom: 20px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(Link)<{ hideOnMobile?: boolean }>`
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Vertically center icon and text */
  padding: 12px;
  text-decoration: none;
  color: #333;
  font-size: 20px;
  margin-bottom: 2px;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack icon and text on mobile */
    font-size: 12px; /* Smaller font size for mobile */
    padding: 10px;
    color: #666;

    ${(props) =>
      props.hideOnMobile &&
      `
      display: none; /* Hide non-essential icons on mobile */
    `}
  }
`;

const Icon = styled.span<{ isAvatar?: boolean }>`
  margin-right: 16px; /* Add spacing between icon and text */
  ${(props) =>
    props.isAvatar &&
    `
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
  `}

  @media (max-width: 768px) {
    margin-right: 0; /* Remove margin for mobile */
    font-size: 20px; /* Larger icons for mobile */
  }
`;

const NavText = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  text-overflow: ellipsis;
  line-height: 20px;
  font-weight: 400;

  @media (max-width: 768px) {
    display: none; /* Hide text on mobile */
  }
`;

const BottomNavContainer = styled.div`
  margin-top: auto; /* Push this section to the bottom */
  margin-bottom: 30px;
  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 20px;
    display: none;
    justify-content: space-around;
    width: 100%;
  }
`;

const NavButton = styled.button`
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Vertically center icon and text */
  padding: 12px;
  background: none;
  border: none;
  text-decoration: none;
  color: #333;
  font-size: 20px;
  margin-bottom: 2px;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack icon and text on mobile */
    font-size: 12px; /* Smaller font size for mobile */
    padding: 10px;
    color: #666;
  }
`;

// Define navigation items
const navItems = [
  { to: '/', icon: <FaHome />, text: 'Home', hideOnMobile: false },
  { to: '/search', icon: <IoSearch />, text: 'Search', hideOnMobile: false },
  { to: '/explore', icon: <MdOutlineExplore />, text: 'Explore', hideOnMobile: false },
  { to: '/messages', icon: <FaFacebookMessenger />, text: 'Messages', hideOnMobile: false },
  { to: '/notifications', icon: <RiHeartAdd2Line />, text: 'Notifications', hideOnMobile: false },
];

const bottomNavItems = [
  { to: '/ai-studio', icon: <MdOutlineAutoAwesome />, text: 'AI Studio', hideOnMobile: true },
  { to: '/threads', icon: <BsChatDots />, text: 'Threads', hideOnMobile: true },
  { to: '/more', icon: <HiOutlineDotsHorizontal />, text: 'More', hideOnMobile: true },
];

const Sidebar: React.FC = () => {
  // Get the logged-in user's avatar from Redux or context
  const loggedInUser = useSelector((state: RootState) => state.users.loggedInUser); // Fetch loggedInUser from Redux
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearLoggedInUser()); // Dispatch the logout action
  };

  const addPostToFeed = async (postData: Post) => {
    try {
      console.log('Adding post:', postData);
      const response = await fetch('/api/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      const result = await response.json();
      console.log('Post added successfully:', result);
      dispatch(addPost(result.post));
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleCreatePost = (image: string, caption: string) => {
    const newPost = {
      id: `${Date.now()}`, // Unique ID based on timestamp
      username: loggedInUser?.username || 'Unknown User', // Provide a default username
      avatar: loggedInUser?.avatar || '/default-avatar.png', // Provide a default avatar
      image,
      caption,
      likes: 0,
      comments: [],
      isVerified: false,
      timeAgo: 'Just now',
    };
    addPostToFeed(newPost);
    setIsModalOpen(false);
  };

  return (
    <>
      <SidebarContainer>
        <Logo>Instagram</Logo>
        {/* Main Navigation Items */}
        {navItems.map((item) => (
          <NavItem key={item.to} to={item.to} hideOnMobile={item.hideOnMobile}>
            <Icon>{item.icon}</Icon>
            <NavText>{item.text}</NavText>
          </NavItem>
        ))}
        {/* Create Navigation Item */}
        <NavButton onClick={() => setIsModalOpen(true)}>
        <Icon>
          <CgAddR />
        </Icon>
        <NavText>Create</NavText>
      </NavButton>
        {/* Profile Navigation Item */}
        {loggedInUser && (
        <>
          <NavItem to={`/profile/${loggedInUser.username}`}>
            <Icon>
              <img
                src={loggedInUser.avatar}
                alt="User Avatar"
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
            </Icon>
            <NavText>{loggedInUser.username}</NavText>
          </NavItem>
          <BottomNavContainer>
            <NavButton onClick={handleLogout}>
            <Icon><IoIosLogOut /></Icon>

              <NavText>Logout</NavText>
            </NavButton>
          </BottomNavContainer>
        </>
      )}
        {/* Bottom Navigation Items */}
        <BottomNavContainer>
          {bottomNavItems.map((item) => (
            <NavItem key={item.to} to={item.to} hideOnMobile={item.hideOnMobile}>
              <Icon>{item.icon}</Icon>
              <NavText>{item.text}</NavText>
            </NavItem>
          ))}
        </BottomNavContainer>
      </SidebarContainer>

      {/* Create Post Modal */}
      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} onSubmit={handleCreatePost} />}
    </>
  );
};

export default Sidebar;