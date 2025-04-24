// components/ProfileHeader.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "@/constants/icons";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl: string;
  joinDate: string;
}

const ProfileHeader = ({ name, email, avatarUrl, joinDate }: ProfileHeaderProps) => {
  return (
    <View className="items-center mt-16">
      {avatarUrl ? (
        <Image 
          source={{ uri: avatarUrl }} 
          className="w-24 h-24 rounded-full"
          defaultSource={icons.person}
        />
      ) : (
        <View className="w-24 h-24 rounded-full bg-gray-800 justify-center items-center">
          <Image source={icons.person} className="w-12 h-12" tintColor="#fff" />
        </View>
      )}
      
      <Text className="text-white text-2xl font-bold mt-4">{name}</Text>
      <Text className="text-gray-400">{email}</Text>
      <Text className="text-gray-500 text-sm mt-1">Member since {joinDate}</Text>
    </View>
  );
};

export default ProfileHeader;