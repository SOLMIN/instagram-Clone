import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { User } from '../constants/mockData';

const StoriesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 550px;
  margin: 0 auto; /* Center the component horizontally */
  padding: 10px 0;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:disabled {
    display: none; /* Hide the button when disabled */
  }
`;

const LeftButton = styled(ScrollButton)`
  left: -20px;
`;

const RightButton = styled(ScrollButton)`
  right: -20px;
`;

const StoriesContainer = styled.div`
  display: flex;
  overflow-x: hidden; /* Hide overflow */
  scroll-behavior: smooth;
  width: 100%;
  max-width: 550px; /* Limit the width */
  padding: 10px 0;

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for better UI */
  }
`;

const Story = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #007bff;
  }
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #007bff;
  object-fit: cover;
`;

const Username = styled.span`
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface StoriesProps {
  users: User[];
}

const Stories: React.FC<StoriesProps> = ({ users }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  return (
    <StoriesWrapper>
      <LeftButton onClick={scrollLeft} disabled={isAtStart}>
        &lt;
      </LeftButton>
      <StoriesContainer ref={containerRef}>
        {users.map((user) => (
          <Story key={user.id} to={`/profile/${user.username}`}>
            <Avatar src={user.avatar} alt={`${user.username}'s avatar`} />
            <Username>{user.username}</Username>
          </Story>
        ))}
      </StoriesContainer>
      <RightButton onClick={scrollRight} disabled={isAtEnd}>
        &gt;
      </RightButton>
    </StoriesWrapper>
  );
};

export default Stories;