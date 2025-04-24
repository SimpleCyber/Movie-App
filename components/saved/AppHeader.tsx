// components/AppHeader.tsx
import React from "react";
import { View, Image } from "react-native";
import { icons } from "@/constants/icons";

const AppHeader = () => {
  return (
    <View className="w-full items-center pt-10 z-10">
      <Image source={icons.logo} className="w-12 h-10 mt-10" />
    </View>
  );
};

export default AppHeader;