import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useGlobalContext } from '../../context/GlobalProvider';

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  return (
    <>
      <Stack>
        <Stack.Screen 
          name="sign-in" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="sign-up" 
          options={{ headerShown: false }} 
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
