import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
  padding: 20px;
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
  font-family: 'Cursive', sans-serif;
  font-size: 28px;
  margin-bottom: 20px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    display: none; /* Hide the logo on mobile */
  }
`;

const NavItem = styled(Link)<{ mobileOnly?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 0;
  text-decoration: none;
  color: #333;
  font-size: 20px;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 12px; /* Smaller font size for mobile */
    padding: 10;
    color: #666;

    ${(props) =>
      props.mobileOnly &&
      `
      display: none; /* Hide non-essential icons on mobile */
    `}
  }
`;

const Icon = styled.span`
  margin-right: 16px;

  @media (max-width: 768px) {
    margin-right: 20; /* Remove margin for mobile */
    font-size: 20px; /* Larger icons for mobile */
  }
`;

const NavText = styled.span`
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

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>Instagram</Logo>
      <NavItem to="/">
        <Icon>🏠</Icon>
        <NavText>Home</NavText>
      </NavItem>
      <NavItem to="/search">
        <Icon>🔍</Icon>
        <NavText>Search</NavText>
      </NavItem>
      <NavItem to="/explore">
        <Icon>🧭</Icon>
        <NavText>Explore</NavText>
      </NavItem>
      <NavItem to="/messages">
        <Icon>💬</Icon>
        <NavText>Messages</NavText>
      </NavItem>
      <NavItem to="/create">
        <Icon>➕</Icon>
        <NavText>Create</NavText>
      </NavItem>
      <NavItem to="/profile">
        <Icon>👤</Icon>
        <NavText>Profile</NavText>
      </NavItem>
      {/* Bottom navigation items */}
      <BottomNavContainer>
        <NavItem to="/ai-studio" mobileOnly>
          <Icon>✨</Icon>
          <NavText>AI Studio</NavText>
        </NavItem>
        <NavItem to="/threads" mobileOnly>
          <Icon>🧵</Icon>
          <NavText>Threads</NavText>
        </NavItem>
        <NavItem to="/more" mobileOnly>
          <Icon>⋮</Icon>
          <NavText>More</NavText>
        </NavItem>
      </BottomNavContainer>
    </SidebarContainer>
  );
};

export default Sidebar;