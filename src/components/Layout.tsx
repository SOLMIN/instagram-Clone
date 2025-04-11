// filepath: /Users/solmin.daudy/instagram-Clone-1/src/components/Layout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import styled from '@emotion/styled';

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  margin-left: 250px; /* Adjust for the sidebar width */
  @media (max-width: 768px) {
    margin-left: 0; /* No margin for mobile */
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentContainer>{children}</ContentContainer>
    </LayoutContainer>
  );
};

export default Layout;