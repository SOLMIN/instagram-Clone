export interface Comment {
    id: string;
    text: string;
    likes: number;
  }
  
  export interface Post {
    id: string;
    username: string;
    avatar: string;
    image: string;
    caption: string;
    likes: number;
    comments: Comment[];
  }
  
  export const mockPosts: Post[] = [
    {
      id: '1',
      username: 'john_doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Realistic avatar
      image: 'https://plus.unsplash.com/premium_photo-1663039978729-6f6775725f89?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Random nature image
      caption: 'Enjoying the beautiful outdoors!',
      likes: 15,
      comments: [
        { id: 'c1', text: 'Looks amazing!', likes: 3 },
        { id: 'c2', text: 'Wish I was there!', likes: 2 },
      ],
    },
    {
      id: '2',
      username: 'jane_doe',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg', // Realistic avatar
      image: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Random city image
      caption: 'City vibes!',
      likes: 20,
      comments: [
        { id: 'c3', text: 'Love the view!', likes: 5 },
        { id: 'c4', text: 'Great shot!', likes: 4 },
      ],
    },
    {
      id: '3',
      username: 'travel_guru',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg', // Realistic avatar
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=3751&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Random travel image
      caption: 'Exploring the world one step at a time.',
      likes: 30,
      comments: [
        { id: 'c5', text: 'Incredible journey!', likes: 8 },
        { id: 'c6', text: 'Keep inspiring us!', likes: 6 },
      ],
    },
  ];