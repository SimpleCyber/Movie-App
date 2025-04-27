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
import { createUser } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      Alert.alert("Error", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image source={images.bg} className="absolute w-full z-0" />
        <View className="w-full justify-center items-center min-h-[85vh] px-6 my-6">
          {/* Replaced TouchableOpacity with Link component for smoother navigation */}
          <View className="w-full items-center mb-8">
            <Link href="/" asChild>
              <TouchableOpacity className="w-full items-center">
                <Image
                  source={icons.logo}
                  resizeMode="contain"
                  className="w-[150px] h-[45px]"
                />
              </TouchableOpacity>
            </Link>
          </View>

          <Text className="text-3xl text-white font-bold mb-10 text-center">
            Sign Up to Movies Flex
          </Text>

          <View className="w-full">
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mb-6"
            />

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
              secureTextEntry={true}
            />

            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mb-8"
              isLoading={isSubmitting}
            />
          </View>

          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-lg text-gray-300 font-regular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-bold text-white ml-2">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;