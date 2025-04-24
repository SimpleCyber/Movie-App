// components/ProfileActions.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";

interface ProfileActionsProps {
  savedMoviesCount: number;
  onGoToSavedMovies: () => void;
}

const ProfileActions = ({ savedMoviesCount, onGoToSavedMovies }: ProfileActionsProps) => {
  return (
    <View className="mt-10">
      <TouchableOpacity 
        onPress={onGoToSavedMovies}
        className="flex-row items-center bg-gray-800 p-4 rounded-xl mb-3"
      >
        <Image source={icons.bookmark} className="w-6 h-6 mr-3" tintColor="#fff" />
        <Text className="text-white flex-1">Saved Movies</Text>
        <Text className="text-gray-400 mr-2">{savedMoviesCount}</Text>
        <Image source={icons.right} className="w-5 h-5" tintColor="#666" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileActions;