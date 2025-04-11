import React from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../constants/mockData';
import {
  ProfileContainer,
  ProfileHeader,
  AvatarLarge,
  ProfileDetails,
  ProfileStats,
  ProfileName,
  ProfileBio,
  PostsGrid,
  PostThumbnail,
  VideoThumbnail,
} from './Profile.styles';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const user = mockUsers.find((user) => user.username === username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <ProfileContainer>
      {/* Profile Header */}
      <ProfileHeader>
        <AvatarLarge src={user.avatar} alt={`${user.name}'s avatar`} />
        <ProfileDetails>
          <ProfileName>{user.name}</ProfileName>
          <ProfileBio>{user.bio}</ProfileBio>
          <ProfileStats>
            <span>
              <strong>{user.posts.length}</strong> Posts
            </span>
            <span>
              <strong>{user.followers}</strong> Followers
            </span>
            <span>
              <strong>{user.following}</strong> Following
            </span>
          </ProfileStats>
        </ProfileDetails>
      </ProfileHeader>

      {/* Posts Grid */}
      <PostsGrid>
        {user.posts.map((post) =>
          post.video ? (
            <VideoThumbnail key={post.id} controls>
              <source src={post.video} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoThumbnail>
          ) : (
            <PostThumbnail key={post.id} src={post.image} alt={post.caption} />
          )
        )}
      </PostsGrid>
    </ProfileContainer>
  );
};

export default Profile;