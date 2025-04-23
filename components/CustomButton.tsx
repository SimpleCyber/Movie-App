import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress?: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = '',
  textStyles = '',
  isLoading = false,
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`h-14 bg-accent rounded-lg justify-center items-center ${containerStyles} ${isLoading ? 'opacity-10' : ''} font-bold`}
      disabled={isLoading}
    >
      <Text className={`text-white font-bold text-xl ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
