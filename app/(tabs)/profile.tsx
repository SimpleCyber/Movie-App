import { useEffect, useState } from "react";  // Remove Suspense, lazy
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants/images";
import { router } from "expo-router";
import { signOut } from "../../lib/appwrite";

// Direct imports instead of lazy loading
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileActions from "@/components/profile/ProfileActions";
import MovieNotesList from "@/components/profile/MovieNotesList";
import LogoutButton from "@/components/profile/LogoutButton";
import LoadingScreen from "@/components/LoadingScreen";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import ErrorView from "@/components/ErrorView";

// Custom Hooks
import { useProfileData } from "@/hooks/useProfileData";

const Profile = () => {
  const { isLoading, isLoggedIn, setUser, setIsLoggedIn } = useGlobalContext();
  const [initialRender, setInitialRender] = useState(true);
  
  const { 
    profileData, 
    fetchingProfile, 
    fetchUserProfile, 
    error, 
    retryFetch 
  } = useProfileData();

  // Handle first render and navigation
  useEffect(() => {
    console.log("Profile: Auth state check:", { isLoading, isLoggedIn });
    
    // Add a slight delay for initial render to ensure we have correct auth state
    const timer = setTimeout(() => {
      setInitialRender(false);
      
      if (!isLoading && !isLoggedIn) {
        console.log("Not logged in, redirecting to sign-in");
        router.replace("/sign-in");
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isLoading, isLoggedIn]);
  
  // Only fetch profile data when we're sure user is logged in
  useEffect(() => {
    if (!isLoading && isLoggedIn && !initialRender) {
      console.log("Fetching user profile data");
      fetchUserProfile();
    }
  }, [isLoading, isLoggedIn, initialRender]);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  const goToSavedMovies = () => {
    router.push("/saved");
  };

  // Show loading during authentication check
  if (isLoading || initialRender) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Image
          source={images.bg}
          style={{position: 'absolute', width: '100%'}}
          resizeMode="cover"
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={{color: '#FFFFFF', marginTop: 10}}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
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

      <ScrollView 
      className="flex-1 px-6"
      contentContainerStyle={{  paddingBottom: 80 }}
      >
        {fetchingProfile ? (
          <ProfileSkeleton />
        ) : (
          <>
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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;