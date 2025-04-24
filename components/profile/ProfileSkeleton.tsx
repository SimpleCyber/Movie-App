// components/profile/ProfileSkeleton.tsx
import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

const ProfileSkeleton = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const skeletonStyle = {
    opacity: fadeAnim,
    backgroundColor: "#333",
  };

  return (
    <View className="flex-1">
      {/* Avatar skeleton */}
      <View className="items-center mt-16">
        <Animated.View 
          style={skeletonStyle} 
          className="w-24 h-24 rounded-full"
        />
        
        {/* Name skeleton */}
        <Animated.View 
          style={skeletonStyle} 
          className="h-6 w-40 rounded-md mt-4"
        />
        
        {/* Email skeleton */}
        <Animated.View 
          style={skeletonStyle} 
          className="h-4 w-56 rounded-md mt-2"
        />
        
        {/* Date skeleton */}
        <Animated.View 
          style={skeletonStyle} 
          className="h-3 w-32 rounded-md mt-1"
        />
      </View>
      
      {/* Action item skeleton */}
      <Animated.View 
        style={skeletonStyle} 
        className="h-16 rounded-xl mt-10"
      />
      
      {/* Notes title skeleton */}
      <Animated.View 
        style={skeletonStyle} 
        className="h-6 w-48 rounded-md mt-6 mb-4"
      />
      
      {/* Notes input skeleton */}
      <View className="flex-row mb-4">
        <Animated.View 
          style={skeletonStyle} 
          className="flex-1 h-12 rounded-l-xl"
        />
        <Animated.View 
          style={skeletonStyle} 
          className="w-16 h-12 rounded-r-xl"
        />
      </View>
      
      {/* Notes list skeleton */}
      {[1, 2, 3].map((item) => (
        <Animated.View 
          key={item}
          style={skeletonStyle} 
          className="h-16 rounded-xl mb-2"
        />
      ))}
      
      {/* Logout button skeleton */}
      <Animated.View 
        style={skeletonStyle} 
        className="h-14 rounded-xl mt-10 mb-8"
      />
    </View>
  );
};

export default ProfileSkeleton;