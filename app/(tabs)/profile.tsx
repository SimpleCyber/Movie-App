import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants/icons";
import { router } from "expo-router";
import { signOut } from "../../lib/appwrite"; // Import signOut function

const Profile = () => {
  const { isLoading, isLoggedIn, setUser, setIsLoggedIn } = useGlobalContext();

  useEffect(() => {
    // Once loading is done, check login status
    if (!isLoading && !isLoggedIn) {
      router.replace("/sign-in");
    }
  }, [isLoading, isLoggedIn]);

  // Logout function
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  // Optionally, show nothing or a loader while loading user data
  if (isLoading) return null;

  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        {/* Profile Image */}
        <Image source={icons.person} className="size-10" tintColor="#fff" />

        {/* Profile Text */}
        <Text className="text-gray-500 text-base">Profile</Text>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={logout}
          className="mt-4 p-3 bg-red-500 rounded-lg"
        >
          <Text className="text-white text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
