// Profile.tsx (Main Page)
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants/images";
import { router } from "expo-router";
import { signOut, getCurrentUser } from "../../lib/appwrite";

// Imported Components
import LoadingScreen from "@/components/LoadingScreen";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileActions from "@/components/profile/ProfileActions";
import MovieNotesList from "@/components/profile/MovieNotesList";
import LogoutButton from "@/components/profile/LogoutButton";

const Profile = () => {
  const { isLoading, isLoggedIn, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatarUrl: "",
    savedMoviesCount: 0,
    joinDate: "",
    notes: [] as string[],
  });
  const [fetchingProfile, setFetchingProfile] = useState(true);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/sign-in");
    } else if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoading, isLoggedIn]);

  const fetchUserProfile = async () => {
    try {
      setFetchingProfile(true);
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
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setFetchingProfile(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  const goToSavedMovies = () => {
    router.push("/saved");
  };

  if (isLoading || fetchingProfile) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full"
        resizeMode="cover"
      />

      <ScrollView className="flex-1 px-6">
        <ProfileHeader
          name={profileData.name}
          email={profileData.email}
          avatarUrl={profileData.avatarUrl}
          joinDate={profileData.joinDate}
        />

        <ProfileActions
          savedMoviesCount={profileData.savedMoviesCount}
          onGoToSavedMovies={goToSavedMovies}
        />

        <MovieNotesList
          notes={profileData.notes}
          onRefresh={fetchUserProfile}
        />

        <LogoutButton onLogout={logout} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
