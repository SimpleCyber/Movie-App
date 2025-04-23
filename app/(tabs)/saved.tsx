import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants/icons";
import { router } from "expo-router";



const saved = () => {
  const { isLoading, isLoggedIn, setUser, setIsLoggedIn } = useGlobalContext();

  useEffect(() => {
    // Once loading is done, check login status
    if (!isLoading && !isLoggedIn) {
      router.replace("/sign-in");
    }
  }, [isLoading, isLoggedIn]);



  // Optionally, show nothing or a loader while loading user data
  if (isLoading) return null;

  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 text-base">Saved Movies</Text>
      </View>
    </SafeAreaView>
  );
};

export default saved;
