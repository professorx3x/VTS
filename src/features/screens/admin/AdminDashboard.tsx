import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { getFirestore, collection, query, where, getDocs ,doc,updateDoc, setDoc} from 'firebase/firestore';
import CustomButton from '@components/ui/CustomButton';

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const db = getFirestore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPendingVehicles = useCallback(async ()=>{
    setLoading(true);
    try {
      const q = query(collection(db, 'vehicles'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const vehicleList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVehicles(vehicleList);
    } catch (error) {
      console.error('Error fetching pending vehicles:', error);
      Alert.alert('Failed to load vehicle data.');
    }
    setLoading(false);
  });
  const updateStatus = async (vehicleId: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'vehicles', vehicleId), {
        status: status,
      });
      Alert.alert(`Vehicle ${status}`);
      fetchPendingVehicles(); // Refresh list
    } catch (err) {
      console.error('Error updating status:', err);
      Alert.alert('Error updating status');
    }
  };
    const setSpeedLimit = async (newLimit) => {
      await setDoc(doc(db, 'settings', 'global'), {
        speedLimit: newLimit,
      });
    };
    useEffect(() => {
      fetchPendingVehicles();
    }, [fetchPendingVehicles]);
  return (
    <View >
        <View style={styles.subContainer}>
            <ImageBackground
            source={require('./../../../assets/images/vehicles.jpeg')}
            style={styles.headerBackground}
            imageStyle={styles.headerImageStyle}
          >
            <View style={styles.header}>
          <View>
            <Image
              style={styles.location}
              source={require('./../../../assets/images/profile.png')}
            />
          </View>
          <View>
            <Image
              style={styles.hamburger}
              source={require('./../../../assets/images/profile.png')}
            />
          </View>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <CustomText variant="h2" fontFamily={Fonts.Medium}>Welcome</CustomText>
              <CustomText variant="h1" fontFamily={Fonts.Bold} fontSize={30} style={styles.userInfo}>Admin...</CustomText>
            </View>
            <View>
              <Image
                style={styles.avatar}
                source={require('./../../../assets/images/profile.png')}
              />
            </View>
          </View>
          <View>
            <Text style={styles.text}>Review these riders :</Text>
          </View>
        </View>
          </ImageBackground>
        </View>
        <ScrollView style={styles.container}>

      {vehicles.map((vehicle) => (
        <View key={vehicle.id} style={styles.card}>
          <Text style={styles.label}>Rider Name: <Text style={styles.value}>{vehicle.riderName}</Text></Text>
          <Text style={styles.label}>Contact: <Text style={styles.value}>{vehicle.riderContactNumber}</Text></Text>
          <Text style={styles.label}>License: <Text style={styles.value}>{vehicle.riderLicenceNumber}</Text></Text>
          <Text style={styles.label}>Vehicle Number: <Text style={styles.value}>{vehicle.vehicleNumber}</Text></Text>
          <Text style={styles.label}>Vehicle Type: <Text style={styles.value}>{vehicle.vehicleType}</Text></Text>
          {vehicle.rcImageUrl && (
            <Image source={{ uri: vehicle.rcImageUrl }} style={styles.image} />
          )}
          <View style={styles.buttonRow}>
            <CustomButton
              title="Approve"
              onPress={() => updateStatus(vehicle.id, 'approved')}
              customStyles={styles.approveButton} disabled={false} loading={false}            />
            <CustomButton
              title="Reject"
              onPress={() => updateStatus(vehicle.id, 'rejected')}
              customStyles={styles.rejectButton} disabled={false} loading={false}            />
          </View>
        </View>
      ))}
    </ScrollView>
      </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
    marginBottom:300,
  },
  subContainer:{
    width:'100%',
  },
  headerBackground: {
      height: 300,
      width: '100%',
    },
    headerImageStyle: {
      opacity: 0.7,
      resizeMode: 'cover',
    },
  header: {
    height: 300,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 10,
    alignItems:'flex-end',
  },
  location: {
    borderColor: 'white',
    width: 10,
    height: 10,
    alignItems: 'flex-start',
  },
  hamburger: {
    borderColor: 'white',
    width: 10,
    height: 10,
    alignItems:'flex-end',
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Helvetica',
  },
  headtText: {
    fontFamily: 'Helvetica',
    color: 'grey',
    fontWeight: '600',
    alignItems:'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  SubjectText: {
    color: 'black',
    fontWeight: '300',
    fontSize: 16,
    fontFamily: 'Helvetica',
    alignItems:'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  userInfo: {
    color: 'white',
  },
  btn: {
    marginTop: 20,
    backgroundColor:Colors.primary,
    borderRadius: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
  },
  body: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    margin: 10,
  },
  RectangleShapeView: {
    marginTop: 10,
    width: '90%',
    height: 80,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 12,
    borderRadius: 8,
  },
  buttonRow: {
    marginTop: 2,
  },
  approveButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
});
