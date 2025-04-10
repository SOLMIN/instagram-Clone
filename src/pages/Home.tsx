import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, RootState } from '../store/store'; // Import the RootState type
import { mockPosts, Post, mockUsers } from '../constants/mockData'; // Import mockPosts and mockUsers
import Stories from '../components/Stories'; // Import the Stories component
import CreatePostModal from '../components/CreatePostModal'; // Import the CreatePostModal component
import {
  Container,
  PostCard,
  Avatar,
  PostHeader,
  UsernameContainer,
  Username,
  VerifiedBadge,
  TimeAgo,
  PostImage,
  PostFooter,
  Button,
  CommentSection,
  CaptionContainer,
  CaptionText,
  CommentsCount,
  CommentInputContainer,
  CommentInput,
  PostButton,
  Comment as CommentStyled,
} from './Home.styles';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.posts); // Fetch posts from Redux store
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState('');
  const [postCount, setPostCount] = useState(5); // Number of posts to show initially
  const dispatch = useDispatch();
  const handleAddComment = (postId: string) => {
    if (commentText.trim()) {
      dispatch(addComment({ postId, text: commentText }));
      setCommentText('');
    }
  };
  // Load initial posts
  useEffect(() => {
    setVisiblePosts(posts.slice(0, postCount));
  }, [postCount, posts]);

  // Handle infinite scroll
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setPostCount((prevCount) => prevCount + 5); // Load 5 more posts
    }
  };

  useEffect(() => {
    setVisiblePosts(posts.slice(0, 5)); // Update visiblePosts whenever posts change
  }, [posts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Stories Component */}
      <Stories users={mockUsers} />

      <Container>
        {visiblePosts.length === 0 && <p>No posts available</p>}
        {visiblePosts.map((post) => (
          <PostCard key={post.id}>
            <PostHeader>
              <Avatar src={post.avatar} alt={`${post.username}'s avatar`} />
              <UsernameContainer>
                <Link to={`/profile/${post.username}`}>
                  <Username>{post.username}</Username>
                </Link>
                {post.isVerified && <VerifiedBadge aria-label="Verified account">✔</VerifiedBadge>}
              </UsernameContainer>
              <TimeAgo>{post.timeAgo}</TimeAgo>
            </PostHeader>
            {post.image && <PostImage src={post.image} alt={post.caption} />}
            {post.video && (
              <video controls autoPlay loop muted width="100%" style={{ borderRadius: '8px', marginBottom: '10px' }}>
                <source src={post.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            <PostFooter>
              <LikeButton
                initialLikes={post.likes}
                ariaLabel={`Like post by ${post.username}`}
              />
              <CommentsCount>{post.comments.length} comments</CommentsCount>
            </PostFooter>
            <CaptionContainer>
              <UsernameContainer>
                <Link to={`/profile/${post.username}`}>
                  <Username>{post.username}</Username>
                </Link>
                {post.isVerified && <VerifiedBadge aria-label="Verified account">✔</VerifiedBadge>}
              </UsernameContainer>
              <CaptionText>{post.caption}</CaptionText>
            </CaptionContainer>
            <CommentSection>
              {post.comments.map((comment) => (
                <CommentStyled key={comment.id}>
                  <span>{comment.text}</span>
                  <LikeButton
                    initialLikes={comment.likes}
                    ariaLabel={`Like comment: "${comment.text}"`}
                  />
                </CommentStyled>
              ))}
              <CommentInputContainer>
                <CommentInput
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <PostButton onClick={() => handleAddComment(post.id)}>Post</PostButton>
              </CommentInputContainer>
            </CommentSection>
          </PostCard>
        ))}
      </Container>
    </div>
  );
};

const LikeButton: React.FC<{ initialLikes: number; ariaLabel: string }> = ({ initialLikes, ariaLabel }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <Button onClick={handleLikeToggle} aria-label={ariaLabel}>
      {isLiked ? '❤️' : '🤍'} {likeCount}
    </Button>
  );
};

export default Home;