// components/EmptySavedState.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";

interface EmptySavedStateProps {
  onRefresh: () => void;
}

const EmptySavedState = ({ onRefresh }: EmptySavedStateProps) => {
  return (
    <View className="flex-1 relative">
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
  );
};

export default EmptySavedState;