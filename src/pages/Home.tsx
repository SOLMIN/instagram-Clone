import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchPostsIfNeeded, addComment, likePost } from '../slice/postSlice';
import { RootState } from '../store/store';
import Stories from '../components/Stories';
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
  const dispatch: AppDispatch = useDispatch();
  const { posts, loading, error, hasMore, currentPage } = useSelector((state: RootState) => state.posts);
  const [isFetching, setIsFetching] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, 5)); // Show initial 5 posts
  const [commentText, setCommentText] = useState('');

  const handleAddComment = (postId: string) => {
    if (commentText.trim()) {
      dispatch(addComment({ postId, text: commentText }));
      setCommentText('');
    }
  };

  const handleLikePost = (postId: string) => {
    dispatch(likePost(postId));
  };

  useEffect(() => {
    // Fetch the first page of posts when the component mounts
    dispatch(fetchPostsIfNeeded({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    // Update visiblePosts whenever posts in the Redux store change
    setVisiblePosts(posts); // Reflect all posts from the Redux store
  }, [posts]);

  useEffect(() => {
    console.log('Current Page:', currentPage);
    console.log('Posts:', posts);
  }, [posts, currentPage]);

  // Handle infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (isFetching) {
      console.log('Dispatching fetchPostsIfNeeded');
      dispatch(fetchPostsIfNeeded({ page: currentPage + 1, limit: 10 })).then(() => {
        setIsFetching(false); // Reset isFetching after fetching
      });
    }
  }, [isFetching, dispatch, currentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, isFetching]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading && posts.length === 0) {
    return <p>Loading posts...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Stories Component */}
      <Stories />

      <Container>
        {visiblePosts.length === 0 && <p>No posts available</p>}

        {visiblePosts.map((post, index) => (
          <PostCard key={`${post.id}-${index}`}>
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
            {post.image && <PostImage src={post.image} alt={post.caption} style={{ borderRadius: '8px', marginBottom: '10px', width: '100%', maxHeight: '500px', objectFit: 'cover' }} />}
            {post.video && (
              <video controls autoPlay loop muted width="100%" style={{ borderRadius: '8px', marginBottom: '10px', width: '100%', maxHeight: '500px', objectFit: 'cover' }}>
                <source src={post.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            <PostFooter>
              <LikeButton
                postId={post.id}
                initialLikes={post.likes}
                ariaLabel={`Like post by ${post.username}`}
                onLike={handleLikePost}
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
                    postId={comment.id}
                    initialLikes={comment.likes}
                    ariaLabel={`Like comment: "${comment.text}"`}
                    onLike={handleLikePost} // Pass handleLikePost as a prop
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
        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more posts to load.</p>}
      </Container>
    </div>
  );
};

const LikeButton: React.FC<{ postId: string; initialLikes: number; ariaLabel: string; onLike: (postId: string) => void }> = ({
  postId,
  initialLikes,
  ariaLabel,
  onLike,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    onLike(postId); // Call the onLike function passed as a prop
  };

  return (
    <Button onClick={handleLikeToggle} aria-label={ariaLabel}>
      {isLiked ? '❤️' : '🤍'} {likeCount}
    </Button>
  );
};

export default Home;