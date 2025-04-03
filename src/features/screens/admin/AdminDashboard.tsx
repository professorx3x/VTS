import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants';

const AdminDashboard = () => {
  return (
    <View>
      <Text style={styles.text}>AdminDashboard</Text>
    </View>
  )
}

export default AdminDashboard;

const styles = StyleSheet.create({
  text:{
      justifyContent:'center',
      alignItems:'center',
      fontSize:20,
      color:Colors.primary,
    },
})