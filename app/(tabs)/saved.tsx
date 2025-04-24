import { useEffect } from "react";
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
  FlatListComponent,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { images } from "@/constants/images";

const Saved = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  const [savedMovieIds, setSavedMovieIds] = useState<string[]>([]);
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  useEffect(() => {
    const fetchSavedMovieIds = async () => {
      const user = await getCurrentUser();
      if (user?.saved_movies && Array.isArray(user.saved_movies)) {
        setSavedMovieIds(user.saved_movies);
      } else {
        setSavedMovieIds([]);
      }
    };
    fetchSavedMovieIds();
  }, []);

  useEffect(() => {
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
          </View>
        </View>
      ) : (
        <>

          <Image
            source={images.bg}
            className="absolute w-full"
            resizeMode="cover"
          />

          <View className="w-full items-center pt-10 z-10">
            <Image source={icons.logo} className="w-12 h-10 mt-10" />
          </View>


          <View className="flex-row items-center mb-5 mt-7">
            
            <Image source={icons.bookmark} className="w-7 h-7 ml-5" />
            <Text className="text-xl text-white font-bold px-2">
              Saved Movies
            </Text>
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
            scrollEnabled={true}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Saved;
