import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux'; // Updated import to include useDispatch
import { RootState, addPost } from '../store/store'; // Adjust the import path based on your project structure

// Import icons from react-icons
import { FaHome, FaFacebookMessenger } from 'react-icons/fa';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { BsChatDots } from 'react-icons/bs';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoSearch } from "react-icons/io5";
import { RiHeartAdd2Line } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { MdOutlineExplore } from "react-icons/md";
import CreatePostModal from './CreatePostModal';

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
  const loggedInUser = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCreatePost = (image: string, caption: string) => {
    const newPost = {
      id: `${Date.now()}`, // Unique ID based on timestamp
      username: loggedInUser.username, // Use the logged-in user's username
      avatar: loggedInUser.avatar, // Use the logged-in user's avatar
      image,
      caption,
      likes: 0,
      comments: [],
      isVerified: false,
      timeAgo: 'Just now',
    };
    dispatch(addPost(newPost)); // Dispatch the action to add the post
    setIsModalOpen(false); // Close the modal
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
        <NavItem to={`/profile/${loggedInUser.username}`} hideOnMobile={false}>
          <Icon isAvatar>
            <img
              src={loggedInUser.avatar}
              alt="User Avatar"
              style={{ width: '100%', height: '100%' }}
            />
          </Icon>
          <NavText>Profile</NavText>
        </NavItem>
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