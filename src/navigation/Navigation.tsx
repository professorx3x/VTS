import React, { FC, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import UserLogin from '@features/auth/UserLogin';
import SignUp from '@features/auth/SignUp';
import LoadingScreen from '@features/screens/LoadingScreen';
import { AuthContext } from '@features/auth/AuthContext';
import CustomBottomTab from '@components/ui/CustomBottomTab';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext);

  // If context is still loading, show a loading screen
  if (!authContext || authContext.loading) {
    return <LoadingScreen />;
  }
  console.log(authContext);
  const { user} = authContext;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Show Authentication Screens If Not Logged In */}
        {!user ? (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="UserLogin" component={UserLogin} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          // Role-Based Navigation
          <Stack.Screen name="Main" component={CustomBottomTab} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
