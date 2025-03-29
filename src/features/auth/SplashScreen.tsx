import { StyleSheet,  View,Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '@utils/Constants';
import Logo from '@assets/images/logo.png';
import { screenHeight, screenWidth } from '@utils/Scaling';
import { navigate } from '@utils/NavigationUtils';
const SplashScreen:FC = () => {
    // Add your SplashScreen logic here
    // For example, you can use useEffect to fetch data or perform any other operations
    // Once the data is fetched, you can navigate to the main screen using navigation.navigate('MainScreen')
    useEffect(()=>{
        const navigateUser = async()=>{
            try{
                navigate('UserLogin');
            }catch (error){
                console.log(error);
            }
        };
        const timeoutId = setTimeout(navigateUser,1000);
        return ()=>clearTimeout(timeoutId);
    },[]);
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.primary,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    logoImage:{
        height: screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode:'contain',
    }
});