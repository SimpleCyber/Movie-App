import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

import { images } from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "@/constants/icons";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext(); // FIXED: Changed setIsLogged to setIsLoggedIn
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ---------------------------------------------------- 🌿🌿🌿🌿
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
      return; // Added return to prevent further execution
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true); // FIXED: Changed setIsLogged to setIsLoggedIn

      Alert.alert("Success", "User Signed In Successfully");
      router.replace("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      Alert.alert("Error", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  // ---------------------------------------------------- 🌿🌿🌿🌿

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Image source={images.bg} className="absolute w-full z-0" />
        {/* Added top padding to push content down */}
        <View className="w-full justify-center items-center min-h-[70vh] px-6 pt-16 pb-8">
          {/* Centered logo with additional top margin */}
          <View className="w-full items-center mb-8 mt-10">
            <TouchableOpacity
              onPress={() => router.replace("/")}
              className="w-full items-center mb-8 mt-10"
            >
              <Image
                source={icons.logo}
                resizeMode="contain"
                className="w-[150px] h-[45px]"
              />
            </TouchableOpacity>
          </View>

          {/* Centered heading with improved styling */}
          <Text className="text-3xl text-white font-bold mb-10 text-center">
            Sign In to Movies Flex
          </Text>

          {/* Form fields with more spacing */}
          <View className="w-full">
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mb-6"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mb-8"
            />

            {/* Wider button */}
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mb-8"
              isLoading={isSubmitting}
            />
          </View>

          {/* Better spaced sign up link */}
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-lg text-gray-300 font-regular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-bold text-white ml-2">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
