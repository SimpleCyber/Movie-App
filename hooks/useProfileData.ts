// hooks/useProfileData.ts
import { useState, useEffect } from 'react';
import { getCurrentUser } from "@/lib/appwrite";

export const useProfileData = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatarUrl: '',
    savedMoviesCount: 0,
    joinDate: '',
    notes: [] as string[]
  });
  const [fetchingProfile, setFetchingProfile] = useState(true);

  const fetchUserProfile = async () => {
    try {
      setFetchingProfile(true);
      const userData = await getCurrentUser();
      if (userData) {
        setProfileData({
          name: userData.username || userData.name || '',
          email: userData.email || '',
          avatarUrl: userData.avatarUrl || '',
          savedMoviesCount: userData.saved_movies?.length || 0,
          joinDate: formatDate(userData.$createdAt || new Date().toISOString()),
          notes: Array.isArray(userData.notes) ? userData.notes : []
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setFetchingProfile(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    profileData,
    fetchingProfile,
    fetchUserProfile
  };
};