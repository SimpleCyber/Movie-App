// components/SavedMoviesList.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl } from "react-native";
import { icons } from "@/constants/icons";
import MovieCard from "@/components/MovieCard";

interface SavedMoviesListProps {
  savedMovies: Movie[];
  onRefresh: () => void;
  refreshing: boolean;
}

const SavedMoviesList = ({ savedMovies, onRefresh, refreshing }: SavedMoviesListProps) => {
  return (
    <ScrollView
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
    >
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
  );
};

export default SavedMoviesList;