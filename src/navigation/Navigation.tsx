import { StyleSheet } from 'react-native';
import React ,{FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { navigationRef } from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import UserLogin from '@features/auth/UserLogin';


const Stack = createNativeStackNavigator();
const Navigation:FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ animation: 'fade'}}/>
            <Stack.Screen name="UserLogin" component={UserLogin} options={{ animation: 'fade'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({})