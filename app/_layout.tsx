import { Stack } from "expo-router";
import './globals.css'
import { StatusBar } from "react-native";
import GlobalProvider from "../context/GlobalProvider";

export default function RootLayout() {
  return (
    <>
    <GlobalProvider>
    <StatusBar
            backgroundColor="#030013" 
            barStyle="light-content" 
      />
      <Stack>
    
    <Stack.Screen 
      name="(tabs)"
      options={{headerShown:false}}
    />
    <Stack.Screen
      name="movies/[id]"
      options={{headerShown:false}}
    />
    <Stack.Screen 
      name="(auth)"
      options={{headerShown:false}}
    />
  </Stack>
  </GlobalProvider>
    </>
  )
}
