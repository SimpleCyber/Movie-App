// components/LoadingScreen.tsx
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary justify-center items-center">
      <ActivityIndicator size="large" color="#fff" />
    </SafeAreaView>
  );
};

export default LoadingScreen;