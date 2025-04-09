import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/api';

const Profile: React.FC = () => {
    interface UserProfile {
        name: string;
        bio?: string;
    }

    const mockProfile: UserProfile = {
        name: 'John Doe',
        bio: 'Photographer | Traveler | Dreamer 🌍📸',
    };

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const userId = '123'; // Replace '123' with the actual user ID
                const userData = await fetchUserProfile(userId);
                setUser(userData);
            } catch (err) {
                console.error('Failed to fetch user profile:', err);
                setError('Failed to fetch user profile');
                setUser(mockProfile); // Set mock profile as fallback
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, []);

    const handleEditProfile = () => {
        // Logic for editing user profile
        console.log('Edit Profile clicked');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <p>Showing mock profile as fallback:</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{user?.name}</h1>
            <p>{user?.bio}</p>
            <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
    );
};

export default Profile;