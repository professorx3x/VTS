import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC, ReactNode } from 'react';

interface CustomSafeAreaViewProps {
    children:ReactNode,
    style?:ViewStyle
}
const CustomSafeArea:FC<CustomSafeAreaViewProps> = ({children,style}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView/>
      {children}
    </View>
  );
};

export default CustomSafeArea;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    }
})