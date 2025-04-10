import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 468px;
  max-height: 585px;
  margin: 0 auto;
  padding: 20px;
`;

export const PostCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffffff; /* Ensure sufficient contrast */
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #1da1f2; /* Instagram-like blue */
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-left: 5px;
`;

export const PostImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: #007bff; /* Ensure sufficient contrast */
  cursor: pointer;
  font-size: 16px;

  &:focus {
    outline: 2px solid #0056b3; /* Add focus outline for keyboard navigation */
    outline-offset: 2px;
  }
`;

export const CommentSection = styled.div`
  margin-top: 10px;
`;

export const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: #333; /* Ensure sufficient contrast */
`;