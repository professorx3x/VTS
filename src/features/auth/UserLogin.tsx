import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, Roles } from '@utils/Constants';
import { navigate, replace, resetAndNavigate } from '@utils/NavigationUtils';

import { getDoc, doc } from 'firebase/firestore';
import { auth,db } from '@config/firebase.Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import CustomText from '@components/ui/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const userRole = userDoc.exists() ? userDoc.data().role : 'user';
        await AsyncStorage.setItem('userRole', userRole);
        Alert.alert('Success', `Logged in as ${userData.role}`);
        if (userData.role === Roles.Admin) {
          resetAndNavigate('AdminDashboard');
        } else if (userData.role === Roles.Rider) {
          resetAndNavigate('RiderDashboard');
        } else {
          resetAndNavigate('UserDashboard');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.log(error);
      }
    };
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign In to Continue</Text>
        <CustomInput
        onChangeText={(text)=>setEmail(text)}
        onClear={()=>setEmail('')}
        value={email}
        placeholder=" Email"
        inputMode="email"
        />
        <CustomInput
        onChangeText={(text)=>setPassword(text)}
        onClear={()=>setPassword('')}
        value={password}
        placeholder=" Password"
        inputMode="text"
        />
        <CustomButton
        onPress={handleLogin}
        disabled={loading}
        loading={loading}
        title="Sign In"
        />
        <CustomText variant="h6" >Doesn't have an account? <TouchableOpacity onPress={()=>replace('SignUp')} style={styles.login_btn}><Text style={styles.login_txt}>Sign Up</Text></TouchableOpacity></CustomText>
      </View>
    );
  };
  export default UserLogin;
  const styles = StyleSheet.create({
      container:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          padding:20,
          backgroundColor:'#f5f5f5',
      },
      header:{
          fontFamily:Fonts.Bold,
          fontSize:30,
      },
      login_btn:{
        shadowOpacity:0.8,
        shadowColor:'#000',
        shadowRadius:5,
      },
      login_txt:{
        color:Colors.primary,
        fontFamily:Fonts.Bold,
        fontSize:18,
        textDecorationLine:'underline',
      },
  });
