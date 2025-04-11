import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
`;

export const AvatarLarge = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const ProfileDetails = styled.div`
  margin-bottom: 20px;
`;

export const ProfileStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

export const PostThumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const VideoThumbnail = styled.video`
  width: 100%;
  border-radius: 8px;
`;