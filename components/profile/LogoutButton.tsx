// components/LogoutButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={onLogout}
      className="bg-red-500 p-4 rounded-xl mt-10 items-center mb-8"
    >
      <Text className="text-white text-base font-medium">Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;