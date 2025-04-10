import React, { useState, useEffect } from 'react';
import { RootState, addComment } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from '../constants/mockData';
import {
  Container,
  PostCard,
  Avatar,
  PostHeader,
  PostImage,
  VerifiedBadge,
  PostFooter,
  Button,
  CommentSection,
  Comment as CommentStyled,
} from './Home.styles';

const Home: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const handleAddComment = (postId: string) => {
    if (commentText.trim()) {
      dispatch(addComment({ postId, text: commentText }));
      setCommentText('');
    }
  };
  const [postCount, setPostCount] = useState(5); // Number of posts to show initially

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <h1>Instagram Clone</h1>
      {visiblePosts.map((post: Post) => (
        <PostCard key={post.id}>
          <PostHeader>
            <Avatar src={post.avatar} alt={`${post.username}'s avatar`} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <strong>{post.username}</strong>
              {post.isVerified && <VerifiedBadge aria-label="Verified account">✔</VerifiedBadge>}
            </div>
            <span style={{ fontSize: '12px', color: '#888', paddingLeft: '10px' }}>
              {post.timeAgo}
            </span>
          </PostHeader>
          {post.image && <PostImage src={post.image} alt={post.caption} />}
          {post.video && (
            <video controls autoPlay loop muted width="100%" style={{ borderRadius: '8px', marginBottom: '10px' }}>
              <source src={post.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <p>{post.caption}</p>
          <PostFooter>
            <LikeButton
              initialLikes={post.likes}
              ariaLabel={`Like post by ${post.username}`}
            />
            <span>{post.comments.length} comments</span>
          </PostFooter>
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
           <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button onClick={() => handleAddComment(post.id)}>Post</Button>
          </CommentSection>
        </PostCard>
      ))}
    </Container>
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