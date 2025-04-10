import React, { useState } from 'react';
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
  TabsContainer,
  Tab,
  PostsGrid,
  PostThumbnail,
  VideoThumbnail,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from './Profile.styles';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const user = mockUsers.find((user) => user.username === username);

  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'tagged'>('posts');
  const [selectedPost, setSelectedPost] = useState<{ video?: string; image?: string; caption: string } | null>(null);

  if (!user) {
    return <div>User not found</div>;
  }

  const openModal = (post: any) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

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

      {/* Tabs */}
      <TabsContainer>
        <Tab active={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
          Posts
        </Tab>
        <Tab active={activeTab === 'reels'} onClick={() => setActiveTab('reels')}>
          Reels
        </Tab>
        <Tab active={activeTab === 'tagged'} onClick={() => setActiveTab('tagged')}>
          Tagged
        </Tab>
      </TabsContainer>

      {/* Posts Grid */}
      {activeTab === 'posts' && (
        <PostsGrid>
          {user.posts.map((post) =>
            post.video ? (
              <VideoThumbnail key={post.id} onClick={() => openModal(post)} controls>
                <source src={post.video} type="video/mp4" />
                Your browser does not support the video tag.
              </VideoThumbnail>
            ) : (
              <PostThumbnail key={post.id} src={post.image} alt={post.caption} onClick={() => openModal(post)} />
            )
          )}
        </PostsGrid>
      )}

      {/* Modal */}
      {selectedPost && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {selectedPost.video ? (
              <video controls autoPlay style={{ width: '100%' }}>
                <source src={selectedPost.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={selectedPost.image} alt={selectedPost.caption} style={{ width: '100%' }} />
            )}
            <p>{selectedPost.caption}</p>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </ProfileContainer>
  );
};

export default Profile;