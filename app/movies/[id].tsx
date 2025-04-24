import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
  StatusBar,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { getCurrentUser, databases, account, appWriteConfig } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";


import { icons } from "@/constants/icons";
import useFetch from "@/services/usefetch";
import { fetchMovieDetails } from "@/services/api";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);




const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext(); 
  const [isSaved, setIsSaved] = useState(false);



  useEffect(() => {
    const checkIfSaved = async () => {
      const user = await getCurrentUser();
      if (user?.saved_movies?.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    };
  
    if (id) {
      checkIfSaved();
    }
  }, [id]);


  const handleToggle = async () => {
    await toggleSaveMovie(id as string);
    setIsSaved(prev => !prev);
  };
  
  
  

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const handlePlayTrailer = async () => {
    try {
      setLoadingTrailer(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
          },
        }
      );

      const trailer = res.data.results.find(
        (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer?.key) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        console.warn("No YouTube trailer found.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setFullScreenMode(false);
  };

  const toggleFullScreen = () => {
    setFullScreenMode(!fullScreenMode);
  };

  const toggleSaveMovie = async (id: string | number) => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not logged in');
  
      let updatedSavedMovies = [...user.saved_movies];
      const index = updatedSavedMovies.indexOf(id);
  
      if (index === -1) {
        // Add movie
        updatedSavedMovies.push(id);
        console.log(`Movie with ID ${id} added to saved_movies`);
      } else {
        // Remove movie
        updatedSavedMovies.splice(index, 1);
        console.log(`Movie with ID ${id} removed from saved_movies`);
      }
  
      // Update the user document in Appwrite
      await databases.updateDocument(
        appWriteConfig.databaseId,
        appWriteConfig.userCollectionId,
        user.$id,
        {
          saved_movies: updatedSavedMovies,
        }
      );
  
    } catch (error) {
      console.error('Error toggling movie save:', error);
    }
  };


  
  

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      {/* Full screen modal */}
      <Modal
        visible={fullScreenMode && showTrailer}
        onRequestClose={() => setFullScreenMode(false)}
        animationType="fade"
        statusBarTranslucent
        supportedOrientations={["landscape"]}
      >
        <View className="flex-1 bg-black">
          <StatusBar hidden />

          {trailerKey && (
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&playsinline=0`,
              }}
              style={{ flex: 1 }}
              javaScriptEnabled
              domStorageEnabled
              allowsFullscreenVideo
              mediaPlaybackRequiresUserAction={false}
            />
          )}

          <TouchableOpacity
            className="absolute top-10 right-5 bg-black/50 rounded-full p-2"
            onPress={() => setFullScreenMode(false)}
          >
            <Text className="text-white text-xl font-bold">✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          {showTrailer && trailerKey ? (
            <View className="w-full h-[550px] relative">
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`,
                }}
                className="w-full h-full"
                javaScriptEnabled
                domStorageEnabled
              />

              <TouchableOpacity
                className="absolute top-5 right-5 bg-black/50 rounded-full p-2"
                onPress={closeTrailer}
              >
                <Text className="text-white text-xl font-bold">✕</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="absolute bottom-5 right-5 bg-black rounded-full p-2"
                onPress={toggleFullScreen}
              >
                <Image
                  source={icons.fullscreen}
                  className="size-5"
                  tintColor="#fff"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          )}

          {!showTrailer && (
            <TouchableOpacity
              className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center"
              onPress={handlePlayTrailer}
              disabled={loadingTrailer}
            >
              {loadingTrailer ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <Image
                  source={icons.play}
                  className="w-6 h-7 ml-1"
                  resizeMode="stretch"
                />
              )}
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className="flex-row justify-between w-[22.3rem]">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>

            <TouchableOpacity onPress={handleToggle}>
              <Image
                source={isSaved ? icons.bookmark : icons.save}
                className="w-7 h-7 ml-1"
                resizeMode="stretch"
              />
            </TouchableOpacity>

          </View>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
