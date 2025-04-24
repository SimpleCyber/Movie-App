// hooks/useProfileData.ts
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from "@/lib/appwrite";

interface ProfileData {
  name: string;
  email: string;
  avatarUrl: string;
  savedMoviesCount: number;
  joinDate: string;
  notes: string[];
}

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    avatarUrl: '',
    savedMoviesCount: 0,
    joinDate: '',
    notes: []
  });
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      setFetchingProfile(true);
      setError(null);
      
      const userData = await getCurrentUser();
      
      if (userData) {
        setProfileData({
          name: userData.username || userData.name || "",
          email: userData.email || "",
          avatarUrl: userData.avatarUrl || "",
          savedMoviesCount: userData.saved_movies?.length || 0,
          joinDate: formatDate(userData.$createdAt || new Date().toISOString()),
          notes: Array.isArray(userData.notes) ? userData.notes : [],
        });
      }
    } catch (err) {
      console.error("Failed to fetch profile data:", err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setFetchingProfile(false);
    }
  }, []);

  const retryFetch = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [retryCount]);

  return {
    profileData,
    fetchingProfile,
    fetchUserProfile,
    error,
    retryFetch
  };
};