/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { RootState, addComment, likePost, likeComment } from '../store/store'; // Adjust the path based on where your Redux store is defined
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled'; 
import { Post, CommentType } from './Home.type';


const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const PostCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
`;

const CommentSection = styled.div`
  margin-top: 10px;
`;

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Home: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');

  const handleAddComment = (postId: string) => {
    if (commentText.trim()) {
      dispatch(addComment({ postId, text: commentText }));
      setCommentText('');
    }
  };

  return (
    <Container>
      <h1>Instagram Clone</h1>
      {posts.map((post: Post) => (
        <PostCard key={post.id}>
          <PostHeader>
            <Avatar src={post.avatar} alt="Avatar" />
            <strong>{post.username}</strong>
          </PostHeader>
          <PostImage src={post.image} alt="Post" />
          <p>{post.caption}</p>
          <PostFooter>
            <Button onClick={() => dispatch(likePost(post.id))}>❤️ {post.likes}</Button>
            <span>{post.comments.length} comments</span>
          </PostFooter>
          <CommentSection>
            {post.comments.map((comment: CommentType) => (
              <Comment key={comment.id}>
                <span>{comment.text}</span>
                <Button onClick={() => dispatch(likeComment({ postId: post.id, commentId: comment.id }))}>
                  ❤️ {comment.likes}
                </Button>
              </Comment>
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

export default Home;