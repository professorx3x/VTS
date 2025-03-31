import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants';

const UserDashboad = () => {
  return (
    <View>
      <Text style={styles.text}>UserDashboad</Text>
    </View>
  )
}

export default UserDashboad;

const styles = StyleSheet.create({
  text:{
    justifyContent:'center',
    alignItems:'center',
    fontSize:20,
    color:Colors.primary,
  },
})