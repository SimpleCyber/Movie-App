import { useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants/icons";
import { router } from "expo-router";

import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/usefetch";
import { fetchMovieById } from "@/services/api";
import { getCurrentUser } from "@/lib/appwrite";

import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { useState } from "react";
import { images } from "@/constants/images";

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
      // fetchSavedMovies will be triggered by the savedMovieIds dependency in useEffect
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
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      {savedMovies.length === 0 ? (
        <View className="flex-1 relative">
          <Image
            source={images.bg}
            className="absolute w-full"
            resizeMode="cover"
          />

          <View className="w-full items-center pt-10 z-10">
            <Image source={icons.logo} className="w-12 h-10 mt-10" />
          </View>

          <View className="flex-1 justify-center items-center z-10">
            <Image
              source={icons.save}
              className="w-10 h-10"
              tintColor="#ffffff"
            />
            <Text className="text-gray-500 text-base mt-2">
              No Saved Movies
            </Text>
            <TouchableOpacity
              onPress={onRefresh}
              className="mt-4 bg-gray-800 px-4 py-2 rounded-lg"
            >
              <Text className="text-white">Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Image
            source={images.bg}
            className="absolute w-full"
            resizeMode="cover"
          />

          <ScrollView
            className="flex-1 px-5 "
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
          >
            <View className="w-full items-center pt-10 z-10">
              <Image source={icons.logo} className="w-12 h-10 mt-10" />
            </View>

            <View className="flex-row items-center justify-between mb-5 mt-7 px-5">
              <View className="flex-row items-center">
                <Image source={icons.bookmark} className="w-7 h-7" />
                <Text className="text-xl text-white font-bold px-2">
                  Saved Movies
                </Text>
              </View>

              <TouchableOpacity onPress={onRefresh}>
              <Image 
                source={icons.refresh || require('@/assets/icons/refresh.png')} 
                className="w-6 h-6" 
                tintColor="#ffffff"
              />
            </TouchableOpacity>

            </View>

            <FlatList
              data={savedMovies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32 px-6"
              scrollEnabled={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#ffffff"
                />
              }
            />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default saved;
