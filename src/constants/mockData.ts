export interface Comment {
  id: string;
  text: string;
  likes: number;
}

export interface Post {
  id: string;
  username: string;
  avatar: string;
  image?: string;
  video?: string;
  caption: string;
  likes: number;
  comments: Comment[];
  isVerified?: boolean; // New property for verified users
  timeAgo: string; // New property for time indicator
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  posts: Post[]; // Posts specific to this user
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    bio: 'Photographer | Traveler | Dreamer',
    followers: 1200,
    following: 300,
    posts: [
      {
        id: '1',
        username: 'john_doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        image: 'https://plus.unsplash.com/premium_photo-1663039978729-6f6775725f89?q=80&w=3538&auto=format&fit=crop',
        caption: 'Enjoying the beautiful outdoors!',
        likes: 15,
        comments: [
          { id: 'c1', text: 'Looks amazing!', likes: 3 },
          { id: 'c2', text: 'Wish I was there!', likes: 2 },
        ],
        isVerified: true,
        timeAgo: '34 min',
      },
      {
        id: '2',
        username: 'john_doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        image: 'https://plus.unsplash.com/premium_photo-1663039978729-6f6775725f89?q=80&w=3538&auto=format&fit=crop',
        caption: 'Enjoying the beautiful outdoors!',
        likes: 15,
        comments: [
          { id: 'c1', text: 'Looks amazing!', likes: 3 },
          { id: 'c2', text: 'Wish I was there!', likes: 2 },
        ],
        isVerified: true,
        timeAgo: '34 min',
      },
      {
        id: '3',
        username: 'john_doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        image: 'https://plus.unsplash.com/premium_photo-1663039978729-6f6775725f89?q=80&w=3538&auto=format&fit=crop',
        caption: 'Enjoying the beautiful outdoors!',
        likes: 15,
        comments: [
          { id: 'c1', text: 'Looks amazing!', likes: 3 },
          { id: 'c2', text: 'Wish I was there!', likes: 2 },
        ],
        isVerified: true,
        timeAgo: '34 min',
      },
    ],
  },
  {
    id: '2',
    username: 'jane_doe',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Doe',
    bio: 'City explorer and coffee lover ☕',
    followers: 800,
    following: 150,
    posts: [
      {
        id: '2',
        username: 'jane_doe',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        video: 'https://assets.mixkit.co/videos/34563/34563-720.mp4',
        caption: 'City vibes!',
        likes: 20,
        comments: [
          { id: 'c3', text: 'Love the view!', likes: 5 },
          { id: 'c4', text: 'Great shot!', likes: 4 },
        ],
        isVerified: false,
        timeAgo: '1h',
      },
    ],
  },
  {
    id: '3',
    username: 'travel_guru',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Travel Guru',
    bio: 'Exploring the world one step at a time.',
    followers: 1500,
    following: 500,
    posts: [
      {
        id: '3',
        username: 'travel_guru',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        image: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        caption: 'Exploring the world one step at a time.',
        likes: 30,
        comments: [
          { id: 'c5', text: 'Incredible journey!', likes: 8 },
          { id: 'c6', text: 'Keep inspiring us!', likes: 6 },
        ],
        isVerified: true,
        timeAgo: '2h',
      },
    ],
  },
  {
    id: '4',
    username: 'nature_lover',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Nature Lover',
    bio: 'Nature is the best therapy!',
    followers: 2000,
    following: 300,
    posts: [
      {
        id: '4',
        username: 'nature_lover',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        video: 'https://assets.mixkit.co/videos/34563/34563-720.mp4',
        caption: 'Nature is the best therapy!',
        likes: 25,
        comments: [
          { id: 'c7', text: 'So peaceful!', likes: 4 },
          { id: 'c8', text: 'I love this place!', likes: 3 },
        ],
        isVerified: true,
        timeAgo: '45 min',
      },
    ],
  },
  {
    id: '5',
    username: 'foodie',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'Foodie',
    bio: 'Exploring the world of flavors!',
    followers: 1800,
    following: 400,
    posts: [
      {
        id: '5',
        username: 'foodie',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        caption: 'Delicious food at its best!',
        likes: 40,
        comments: [
          { id: 'c9', text: 'Yummy!', likes: 6 },
          { id: 'c10', text: 'Where is this place?', likes: 5 },
        ],
        isVerified: false,
        timeAgo: '2h',
      },
    ],
  },
  {
    id: '6',
    username: 'fitness_freak',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'Fitness Freak',
    bio: 'Fitness is not a destination, it’s a way of life!',
    followers: 2500,
    following: 600,
    posts: [
      {
        id: '6',
        username: 'fitness_freak',
        avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
        video: 'https://assets.mixkit.co/videos/51500/51500-720.mp4',
        caption: 'Fitness is not a destination, it’s a way of life!',
        likes: 70,
        comments: [
          { id: 'c15', text: 'Inspiring!', likes: 12 },
          { id: 'c16', text: 'Great workout!', likes: 9 },
        ],
        isVerified: true,
        timeAgo: '5h',
      },
    ],
  },
  {
    id: '7',
    username: 'artsy_vibes',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    name: 'Artsy Vibes',
    bio: 'Creating something new every day!',
    followers: 3000,
    following: 700,
    posts: [
      {
        id: '7',
        username: 'artsy_vibes',
        avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
        image: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        caption: 'Creating something new!',
        likes: 70,
        comments: [
          { id: 'c29', text: 'Beautiful work!', likes: 10 },
          { id: 'c30', text: 'So creative!', likes: 7 },
        ],
        isVerified: true,
        timeAgo: '12h',
      },
    ],
  },
  {
    id: '8',
    username: 'mountain_hiker',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    name: 'Mountain Hiker',
    bio: 'Climbing the peaks of life!',
    followers: 2200,
    following: 400,
    posts: [
      {
        id: '16',
        username: 'mountain_hiker',
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        caption: 'Summit reached!',
        likes: 100,
        comments: [
          { id: 'c31', text: 'Amazing view!', likes: 10 },
          { id: 'c32', text: 'Congrats!', likes: 8 },
        ],
        isVerified: true,
        timeAgo: '1h',
      },
      {
        id: '17',
        username: 'mountain_hiker',
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        video: 'https://www.w3schools.com/html/mov_bbb.mp4',
        caption: 'Hiking through the forest!',
        likes: 80,
        comments: [
          { id: 'c33', text: 'So peaceful!', likes: 5 },
          { id: 'c34', text: 'Love this!', likes: 3 },
        ],
        isVerified: true,
        timeAgo: '3h',
      },
    ],
  },
  {
    id: '9',
    username: 'urban_explorer',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    name: 'Urban Explorer',
    bio: 'Discovering the hidden gems of the city.',
    followers: 1800,
    following: 300,
    posts: [
      {
        id: '18',
        username: 'urban_explorer',
        avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
        image: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb',
        caption: 'City lights at night!',
        likes: 90,
        comments: [
          { id: 'c35', text: 'So vibrant!', likes: 12 },
          { id: 'c36', text: 'Love this shot!', likes: 10 },
        ],
        isVerified: false,
        timeAgo: '2h',
      },
      {
        id: '19',
        username: 'urban_explorer',
        avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-busy-city-street-traffic-3453-large.mp4',
        caption: 'Exploring the streets!',
        likes: 75,
        comments: [
          { id: 'c37', text: 'Great energy!', likes: 8 },
          { id: 'c38', text: 'Amazing vibe!', likes: 6 },
        ],
        isVerified: false,
        timeAgo: '4h',
      },
    ],
  },
  {
    id: '10',
    username: 'beach_lover',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Beach Lover',
    bio: 'Life’s a beach, enjoy the waves!',
    followers: 2500,
    following: 500,
    posts: [
      {
        id: '20',
        username: 'beach_lover',
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        caption: 'Relaxing by the ocean!',
        likes: 120,
        comments: [
          { id: 'c39', text: 'So calming!', likes: 15 },
          { id: 'c40', text: 'I need a vacation!', likes: 12 },
        ],
        isVerified: true,
        timeAgo: '5h',
      },
      {
        id: '21',
        username: 'beach_lover',
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        video: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        caption: 'Sunset by the beach!',
        likes: 95,
        comments: [
          { id: 'c41', text: 'Beautiful!', likes: 10 },
          { id: 'c42', text: 'Love the colors!', likes: 8 },
        ],
        isVerified: true,
        timeAgo: '6h',
      },
    ],
  },
  {
    id: '11',
    username: 'food_enthusiast',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    name: 'Food Enthusiast',
    bio: 'Exploring the world one bite at a time.',
    followers: 3000,
    following: 700,
    posts: [
      {
        id: '22',
        username: 'food_enthusiast',
        avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        caption: 'Delicious pasta!',
        likes: 110,
        comments: [
          { id: 'c43', text: 'Looks yummy!', likes: 20 },
          { id: 'c44', text: 'Where is this from?', likes: 15 },
        ],
        isVerified: false,
        timeAgo: '7h',
      },
      {
        id: '23',
        username: 'food_enthusiast',
        avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-3454-large.mp4',
        caption: 'Cooking something special!',
        likes: 85,
        comments: [
          { id: 'c45', text: 'Can’t wait to try this!', likes: 10 },
          { id: 'c46', text: 'Looks amazing!', likes: 8 },
        ],
        isVerified: false,
        timeAgo: '8h',
      },
    ],
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    username: 'john_doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: 'https://plus.unsplash.com/premium_photo-1663039978729-6f6775725f89?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Enjoying the beautiful outdoors!',
    likes: 15,
    comments: [
      { id: 'c1', text: 'Looks amazing!', likes: 3 },
      { id: 'c2', text: 'Wish I was there!', likes: 2 },
    ],
    isVerified: true,
    timeAgo: '34 min',
  },
  {
    id: '2',
    username: 'jane_doe',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    video: 'https://assets.mixkit.co/g4zty141nd86zf5hk0d2uxrdqwcg',
    caption: 'City vibes!',
    likes: 20,
    comments: [
      { id: 'c3', text: 'Love the view!', likes: 5 },
      { id: 'c4', text: 'Great shot!', likes: 4 },
    ],
    isVerified: false,
    timeAgo: '1h',
  },
  {
    id: '3',
    username: 'travel_guru',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    image: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    caption: 'Exploring the world one step at a time.',
    likes: 30,
    comments: [
      { id: 'c5', text: 'Incredible journey!', likes: 8 },
      { id: 'c6', text: 'Keep inspiring us!', likes: 6 },
    ],
    isVerified: true,
    timeAgo: '2h',
  },
  {
    id: '4',
    username: 'nature_lover',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    video: 'https://assets.mixkit.co/videos/34563/34563-720.mp4',
    caption: 'Nature is the best therapy!',
    likes: 25,
    comments: [
      { id: 'c7', text: 'So peaceful!', likes: 4 },
      { id: 'c8', text: 'I love this place!', likes: 3 },
    ],
    isVerified: true,
    timeAgo: '45 min',
  },
  {
    id: '5',
    username: 'foodie',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    caption: 'Delicious food at its best!',
    likes: 40,
    comments: [
      { id: 'c9', text: 'Yummy!', likes: 6 },
      { id: 'c10', text: 'Where is this place?', likes: 5 },
    ],
    isVerified: false,
    timeAgo: '2h',
  },
  {
    id: '6',
    username: 'adventure_seeker',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    video: 'https://www.w3schools.com/html/movie.mp4',
    caption: 'Adventures are the best way to learn!',
    likes: 50,
    comments: [
      { id: 'c11', text: 'So thrilling!', likes: 7 },
      { id: 'c12', text: 'I want to try this!', likes: 6 },
    ],
    isVerified: true,
    timeAgo: '3h',
  },
  {
    id: '7',
    username: 'pet_lover',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    caption: 'My furry friend!',
    likes: 60,
    comments: [
      { id: 'c13', text: 'So cute!', likes: 10 },
      { id: 'c14', text: 'Adorable!', likes: 8 },
    ],
    isVerified: false,
    timeAgo: '4h',
  },
  {
    id: '8',
    username: 'fitness_freak',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    video: 'https://assets.mixkit.co/videos/51500/51500-720.mp4',
    caption: 'Fitness is not a destination, it’s a way of life!',
    likes: 70,
    comments: [
      { id: 'c15', text: 'Inspiring!', likes: 12 },
      { id: 'c16', text: 'Great workout!', likes: 9 },
    ],
    isVerified: true,
    timeAgo: '5h',
  },
  {
    id: '9',
    username: 'art_enthusiast',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    image: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    caption: 'Art is freedom!',
    likes: 80,
    comments: [
      { id: 'c17', text: 'Beautiful!', likes: 15 },
      { id: 'c18', text: 'Amazing work!', likes: 10 },
    ],
    isVerified: true,
    timeAgo: '6h',
  },
  {
    id: '10',
    username: 'tech_guru',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    caption: 'Technology is the future!',
    likes: 90,
    comments: [
      { id: 'c19', text: 'So true!', likes: 20 },
      { id: 'c20', text: 'Great post!', likes: 18 },
    ],
    isVerified: true,
    timeAgo: '7h',
  },
  {
    id: '11',
    username: 'wanderlust',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    caption: 'Exploring the mountains!',
    likes: 45,
    comments: [
      { id: 'c21', text: 'Breathtaking view!', likes: 5 },
      { id: 'c22', text: 'I want to go there!', likes: 3 },
    ],
    isVerified: false,
    timeAgo: '8h',
  },
  {
    id: '12',
    username: 'city_life',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    caption: 'City lights at night!',
    likes: 35,
    comments: [
      { id: 'c23', text: 'So vibrant!', likes: 4 },
      { id: 'c24', text: 'Love this!', likes: 2 },
    ],
    isVerified: true,
    timeAgo: '9h',
  },
  {
    id: '13',
    username: 'beach_bum',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    caption: 'Relaxing at the beach!',
    likes: 50,
    comments: [
      { id: 'c25', text: 'So peaceful!', likes: 6 },
      { id: 'c26', text: 'I need a vacation!', likes: 4 },
    ],
    isVerified: true,
    timeAgo: '10h',
  },
  {
    id: '14',
    username: 'fitness_journey',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    video: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    caption: 'Workout time!',
    likes: 60,
    comments: [
      { id: 'c27', text: 'So motivating!', likes: 8 },
      { id: 'c28', text: 'Great energy!', likes: 5 },
    ],
    isVerified: true,
    timeAgo: '11h',
  },
  {
    id: '15',
    username: 'artsy_vibes',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    image: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    caption: 'Creating something new!',
    likes: 70,
    comments: [
      { id: 'c29', text: 'Beautiful work!', likes: 10 },
      { id: 'c30', text: 'So creative!', likes: 7 },
    ],
    isVerified: true,
    timeAgo: '12h',
  },
];

