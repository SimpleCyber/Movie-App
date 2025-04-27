import { useEffect, useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { getCurrentUser } from "@/lib/appwrite";
import { fetchMovieById } from "@/services/api";
import { ActivityIndicator, Image, View, Text } from "react-native";
import { images } from "@/constants/images";

// Imported Components
import LoadingScreen from "@/components/LoadingScreen";
import EmptySavedState from "@/components/saved/EmptySavedState";
import SavedMoviesList from "@/components/saved/SavedMoviesList";

// Add Movie interface to avoid type errors
interface Movie {
  id: number; // Note: Using number instead of string since that seems to be the issue
  title: string;
  poster_path?: string;
  backdrop_path?: string;
  adult?: boolean;
  genre_ids?: number[];
  original_language?: string;
  overview?: string;
  popularity?: number;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  // Add any other fields you need
}

const Saved = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  const [initialRender, setInitialRender] = useState(true);

  const [savedMovieIds, setSavedMovieIds] = useState<string[]>([]);
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Handle initial auth check and navigation
  useEffect(() => {
    console.log("Saved: Auth state check:", { isLoading, isLoggedIn });
    
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
  
  // Only fetch saved movies when we're sure user is logged in
  useEffect(() => {
    if (!isLoading && isLoggedIn && !initialRender) {
      console.log("Fetching saved movie IDs");
      fetchSavedMovieIds();
    }
  }, [isLoading, isLoggedIn, initialRender]);

  const fetchSavedMovieIds = async () => {
    try {
      console.log("Getting current user data");
      const user = await getCurrentUser();
      console.log("User data received:", user ? "User exists" : "No user");
      
      if (user?.saved_movies && Array.isArray(user.saved_movies)) {
        console.log(`Found ${user.saved_movies.length} saved movies`);
        setSavedMovieIds(user.saved_movies);
      } else {
        console.log("No saved movies found");
        setSavedMovieIds([]);
      }
    } catch (error) {
      console.error("Error fetching saved movie IDs:", error);
      setSavedMovieIds([]);
    }
  };

  const fetchSavedMovies = async () => {
    if (!savedMovieIds.length) {
      setSavedMovies([]);
      setLoadingMovies(false);
      return;
    }

    try {
      setLoadingMovies(true);
      console.log(`Fetching details for ${savedMovieIds.length} movies`);
      
      const movieResults: Movie[] = [];
      
      // Fetch movies one by one to handle individual failures
      for (const id of savedMovieIds) {
        try {
          const movie = await fetchMovieById({ id });
          movieResults.push(movie);
        } catch (err) {
          console.error(`Failed to fetch movie ID ${id}:`, err);
        }
      }
      
      console.log(`Successfully fetched ${movieResults.length} movies`);
      setSavedMovies(movieResults);
    } catch (err) {
      console.error("Failed to fetch saved movies", err);
    } finally {
      setLoadingMovies(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchSavedMovieIds();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (savedMovieIds.length > 0) {
      console.log("Movie IDs updated, fetching details");
      fetchSavedMovies();
    } else if (savedMovieIds.length === 0 && !initialRender) {
      console.log("No movie IDs to fetch");
      setSavedMovies([]);
      setLoadingMovies(false);
    }
  }, [savedMovieIds, initialRender]);

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
          <Text style={{color: '#FFFFFF', marginTop: 10}}>Loading saved movies...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loadingMovies) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full"
        resizeMode="cover"
      />

      {savedMovies.length < 1 ? (
        <EmptySavedState onRefresh={onRefresh} />
      ) : (
        <SavedMoviesList
          savedMovies={savedMovies as any}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </SafeAreaView>
  );
};

export default Saved;