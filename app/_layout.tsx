import { Stack } from "expo-router";
import './globals.css'
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
    <StatusBar
            backgroundColor="#030013" // background color for Android
            barStyle="light-content" // content color: 'light-content' or 'dark-content'
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
  </Stack>
    </>
  )
}
