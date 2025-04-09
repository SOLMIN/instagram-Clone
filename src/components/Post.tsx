import React from 'react';
import styled from '@emotion/styled';

interface PostProps {
    post: {
        id: string;
        username: string;
        avatar: string;
        image: string;
        caption: string;
        likes: number;
        comments: number;
    };
}

const PostContainer = styled.div`
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    margin: 20px 0;
    background-color: #fff;
    max-width: 600px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const Username = styled.span`
    font-weight: bold;
    font-size: 14px;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Caption = styled.div`
    padding: 10px;
    font-size: 14px;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    color: #8e8e8e;
`;

const PostComponent: React.FC<PostProps> = ({ post }) => {
    return (
        <PostContainer>
            <Header>
                <Avatar src={post.avatar} alt={`${post.username}'s avatar`} />
                <Username>{post.username}</Username>
            </Header>
            <Image src={post.image} alt="Post content" />
            <Caption>{post.caption}</Caption>
            <Footer>
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
            </Footer>
        </PostContainer>
    );
};

export default PostComponent;