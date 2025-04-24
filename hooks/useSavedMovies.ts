// hooks/useSavedMovies.ts
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from "@/lib/appwrite";
import { fetchMovieById } from "@/services/api";

export const useSavedMovies = () => {
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

  return {
    savedMovies,
    loadingMovies,
    refreshing,
    onRefresh
  };
};