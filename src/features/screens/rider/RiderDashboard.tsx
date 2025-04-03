import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@utils/Constants';

const RiderDashboad = () => {
  return (
    <View>
      <Text style={styles.text}>RiderDashboad</Text>
    </View>
  );
}

export default RiderDashboad;

const styles = StyleSheet.create({
  text:{
      justifyContent:'center',
      alignItems:'center',
      fontSize:20,
      color:Colors.primary,
    },
})