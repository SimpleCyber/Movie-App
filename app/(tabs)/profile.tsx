// Profile.tsx (Enhanced Main Page)
import { useEffect, Suspense, lazy } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, View } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants/images";
import { router } from "expo-router";
import { signOut } from "../../lib/appwrite";

// Custom Hooks
import { useProfileData } from "@/hooks/useProfileData";

// Core components (loaded immediately)
import LoadingScreen from "@/components/LoadingScreen";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import ErrorView from "@/components/ErrorView";

// Lazy loaded components
const ProfileHeader = lazy(() => import("@/components/profile/ProfileHeader"));
const ProfileActions = lazy(() => import("@/components/profile/ProfileActions"));
const MovieNotesList = lazy(() => import("@/components/profile/MovieNotesList"));
const LogoutButton = lazy(() => import("@/components/profile/LogoutButton"));

const Profile = () => {
  const { isLoading, isLoggedIn, setUser, setIsLoggedIn } = useGlobalContext();
  const { 
    profileData, 
    fetchingProfile, 
    fetchUserProfile, 
    error, 
    retryFetch 
  } = useProfileData();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/sign-in");
    }
  }, [isLoading, isLoggedIn]);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  const goToSavedMovies = () => {
    router.push("/saved");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <ErrorView 
        message="Failed to load profile data" 
        onRetry={retryFetch}
      />
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full"
        resizeMode="cover"
      />

      <ScrollView className="flex-1 px-6">
        {fetchingProfile ? (
          <ProfileSkeleton />
        ) : (
          <Suspense fallback={<ProfileSkeleton />}>
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
          </Suspense>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;