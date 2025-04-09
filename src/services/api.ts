import axios from 'axios';

const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

// Mock data as a fallback
const mockPosts = [
    {
        id: '1',
        username: 'travel_guru',
        avatar: 'https://via.placeholder.com/50',
        image: 'https://via.placeholder.com/600x400',
        caption: 'Exploring the mountains 🏔️ #adventure #travel',
        likes: 120,
        comments: 15,
    },
    {
        id: '2',
        username: 'foodie_life',
        avatar: 'https://via.placeholder.com/50',
        image: 'https://via.placeholder.com/600x400',
        caption: 'Delicious brunch at my favorite spot 🍳🥞 #foodie #brunch',
        likes: 200,
        comments: 30,
    },
    {
        id: '3',
        username: 'fitness_freak',
        avatar: 'https://via.placeholder.com/50',
        image: 'https://via.placeholder.com/600x400',
        caption: 'Morning workout grind 💪 #fitness #healthylifestyle',
        likes: 300,
        comments: 45,
    },
];


const mockProfile: UserProfile = {
    id: '12345',
    email: 'johndoe@example.com',
    name: 'John Doe',
    bio: 'Photographer | Traveler | Dreamer 🌍📸',
};

export const fetchPosts = async () => {
    try {
        if (!API_URL) {
            console.warn('API_URL is not defined. Returning mock data.');
            return mockPosts;
        }
        const response = await axios.get(`${API_URL}/posts`);
        return mockPosts;
    } catch (error) {
        console.error('Error fetching posts, returning mock data:', error);
        return mockPosts; // Return mock data as a fallback
    }
};

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Error logging in');
    }
};

interface SignupResponse {
    id: string;
    email: string;
    name: string;
}

export interface SignupData {
    username: string;
    email: string;
    password: string;
}

export const signup = async (userData: SignupData): Promise<SignupResponse> => {
    try {
        const response = await axios.post<SignupResponse>(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error signing up');
    }
};

interface UserProfile {
    id: string;
    email: string;
    name: string;
    bio?: string; // Optional field
    avatarUrl?: string; // Optional field
}

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
        const response = await axios.get<UserProfile>(`${API_URL}/users/${userId}`);
        return mockProfile;
    } catch (error) {
        throw new Error('Error fetching user profile');
    }
};