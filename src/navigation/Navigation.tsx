import React, { FC, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import UserLogin from '@features/auth/UserLogin';
import SignUp from '@features/auth/SignUp';
import AdminDashboard from '@features/screens/AdminDashboard';
import RiderDashboard from '@features/screens/RiderDashboard';
import UserDashboard from '@features/screens/UserDashboard';
import LoadingScreen from '@features/screens/LoadingScreen';
import { AuthContext } from '@features/auth/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext);

  // If context is still loading, show a loading screen
  if (!authContext || authContext.loading) {
    return <LoadingScreen />;
  }
  console.log(authContext);
  const { user, role } = authContext;

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
          <>
            {role === 'admin' && (
              <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            )}
            {role === 'rider' && (
              <Stack.Screen name="RiderDashboard" component={RiderDashboard} />
            )}
            {(!role || role === 'user') && (
              <Stack.Screen name="UserDashboard" component={UserDashboard} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
