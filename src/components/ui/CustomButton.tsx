import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';


interface CustomButtonProps{
    onPress: ()=> void;
    title: string;
    disabled: boolean;
    loading: boolean;
    customStyles ?: any;
}
const CustomButton:FC<CustomButtonProps> = ({onPress,loading,title,disabled,customStyles}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
    style={[styles.btn,{backgroundColor:disabled ? Colors.disabled : Colors.primary},customStyles]}>
        {
            loading ?
            <ActivityIndicator size="small" color="#fff"/> :
            <CustomText style={styles.text} variant="h6" fontFamily={Fonts.SemiBold}>
                {title}
            </CustomText>
        }
    </TouchableOpacity>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
    btn:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical:15,
        width: '100%',
    },
    text:{
        color:'#fff',
    },
});