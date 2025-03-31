import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert ,StyleSheet, TouchableOpacity} from 'react-native';
import { db,auth } from '@config/firebase.Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Colors, Fonts, Roles } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomText from '@components/ui/CustomText';
import ModalDropdown from '@components/ui/ModalDropdown';
import CustomButton from '@components/ui/CustomButton';
import { navigate, replace, resetAndNavigate } from '@utils/NavigationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(Roles.User);
  const [loading, setLoading] = useState(false);
  const roles = [Roles.Admin,Roles.User,Roles.Rider];

  const handleRegister = async () => {
    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Save user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: role,
      });
      await AsyncStorage.setItem('userRole',role);

      Alert.alert('Success', 'Account created successfully!');
      resetAndNavigate('UserLogin');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up to Continue</Text>
      <CustomInput
      onChangeText={(text)=>setName(text)}
      onClear={()=>setName('')}
      value={name}
      placeholder=" Name"
      inputMode="text"
      />
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
      <ModalDropdown
      data={roles}
      onSelect={(selectedItem: any
      )=>{
        console.log(selectedItem);
        setRole(selectedItem);
      }}
      />

      <CustomButton
      onPress={handleRegister}
      disabled={loading}
      loading={loading}
      title="Register"
      />
      <CustomText variant="h6" >Already have an account? <TouchableOpacity onPress={()=>replace('UserLogin')} style={styles.login_btn}><Text style={styles.login_txt}>Login</Text></TouchableOpacity></CustomText>
    </View>
  );
};

export default SignUp;
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
