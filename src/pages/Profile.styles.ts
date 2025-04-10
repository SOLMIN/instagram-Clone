import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

export const AvatarLarge = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const ProfileDetails = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666;
  }
`;

export const ProfileStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;

  span {
    font-size: 14px;
    font-weight: bold;
  }
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const PostThumbnail = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;