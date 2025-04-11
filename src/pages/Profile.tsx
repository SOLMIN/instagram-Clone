import React from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../constants/mockData';
import {
  ProfileContainer,
  AvatarLarge,
  ProfileDetails,
  ProfileStats,
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
      <AvatarLarge src={user.avatar} alt={`${user.name}'s avatar`} />
      <ProfileDetails>
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <ProfileStats>
          <span>{user.posts.length} Posts</span>
          <span>{user.followers} Followers</span>
          <span>{user.following} Following</span>
        </ProfileStats>
      </ProfileDetails>
      <PostsGrid>
        {user.posts.map((post) => (
          post.video ? (
            <VideoThumbnail key={post.id} controls>
              <source src={post.video} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoThumbnail>
          ) : (
            <PostThumbnail key={post.id} src={post.image} alt={post.caption} />
          )
        ))}
      </PostsGrid>
    </ProfileContainer>
  );
};

export default Profile;