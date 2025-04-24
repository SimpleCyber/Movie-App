// components/ErrorView.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <SafeAreaView className="flex-1 bg-primary justify-center items-center px-6">
      <Image 
        source={icons.error || require('@/assets/icons/error.png')} 
        className="w-16 h-16 mb-4" 
        tintColor="#ff6b6b"
      />
      <Text className="text-white text-lg text-center mb-4">{message}</Text>
      <TouchableOpacity
        onPress={onRetry}
        className="bg-blue-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-medium">Try Again</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ErrorView;