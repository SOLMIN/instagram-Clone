import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`;

export const AvatarLarge = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileDetails = styled.div`
  flex: 1;
  margin-left: 20px;
`;

export const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ProfileBio = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

export const ProfileStats = styled.div`
  display: flex;
  gap: 20px;

  span {
    font-size: 16px;
    color: #333;

    strong {
      font-weight: bold;
    }
  }
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

export const PostThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const VideoThumbnail = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;