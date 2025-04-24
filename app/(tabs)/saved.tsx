// saved.tsx (Main Page)
import { useEffect, useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { getCurrentUser } from "@/lib/appwrite";
import { fetchMovieById } from "@/services/api";
import { ActivityIndicator, Image, View } from "react-native";
import { images } from "@/constants/images";

// Imported Components
import LoadingScreen from "@/components/LoadingScreen";
import EmptySavedState from "@/components/saved/EmptySavedState";
import SavedMoviesList from "@/components/saved/SavedMoviesList";

const saved = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  const [savedMovieIds, setSavedMovieIds] = useState<string[]>([]);
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSavedMovieIds = async () => {
    const user = await getCurrentUser();
    if (user?.saved_movies && Array.isArray(user.saved_movies)) {
      setSavedMovieIds(user.saved_movies);
    } else {
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
      const moviePromises = savedMovieIds.map((id) => fetchMovieById({ id }));
      const movies = await Promise.all(moviePromises);

      setSavedMovies(movies);
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
    fetchSavedMovieIds();
  }, []);

  useEffect(() => {
    fetchSavedMovies();
  }, [savedMovieIds]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/sign-in");
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading || loadingMovies) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full"
        resizeMode="cover"
      />

      {savedMovies.length === 0 ? (
        <EmptySavedState onRefresh={onRefresh} />
      ) : (
        <>
          
          <SavedMoviesList
            savedMovies={savedMovies}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default saved;
