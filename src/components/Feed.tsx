import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { fetchPosts } from '../services/api';
import PostComponent from './Post';

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                console.log('Fetched posts:', data); // Debug the response
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadPosts();
    }, []);

    return (
        <div className="feed">
            Hello
            {Array.isArray(posts) && posts.map(post => (
                <PostComponent key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Feed;