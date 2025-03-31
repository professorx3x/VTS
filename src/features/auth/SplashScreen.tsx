import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import React, { FC, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  replace } from '@utils/NavigationUtils';
import { auth } from '@config/firebase.Config';
import { Colors } from '@utils/Constants';
import Logo from '@assets/images/logo.png';
import { screenHeight, screenWidth } from '@utils/Scaling';

const SplashScreen: FC = () => {
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        // Get Firebase Auth user
        const currentUser = auth.currentUser;

        if (!currentUser) {
          // If user is not logged in, navigate to login screen
          replace('UserLogin');
          return;
        }

        // Get stored user role
        const userRole = await AsyncStorage.getItem('userRole');

        if (userRole === 'admin') {
          replace('AdminDashboard');
        } else if (userRole === 'rider') {
          replace('RiderDashboard');
        } else {
          replace('UserDashboard');
        }
      } catch (error) {
        console.error('Error in SplashScreen:', error);
        replace('UserLogin'); // Redirect to login if error occurs
      }
    };

    // Delay for a better UX
    const timeoutId = setTimeout(checkUserLogin, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
      <ActivityIndicator size="large" color="white" style={styles.loader} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.4,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
  loader: {
    marginTop: 20,
  },
});

