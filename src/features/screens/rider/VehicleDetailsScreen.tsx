import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import VehicleRegistrationForm from './VehicleRegistrationForm';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';

const VehicleDetailsScreen = () => {
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {return;}

    const db = getFirestore();
    const q = query(
      collection(db, 'vehicles'),
      where('riderId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        setVehicleData(docData);
      } else {
        setVehicleData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleFormSuccess = (data: any) => {
    setVehicleData(data);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  const shouldShowForm = !vehicleData || vehicleData.status === 'rejected';

  return (
    <View style={styles.container}>
      {shouldShowForm ? (
        <VehicleRegistrationForm onSuccess={handleFormSuccess} />
      ) : (
        <View style={styles.container}>
            <ImageBackground
            source={require('./../../../assets/images/vehicles.jpeg')} // Your image path
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
              <CustomText variant="h1" fontFamily={Fonts.Bold} fontSize={30} style={styles.userInfo}>Shubham</CustomText>
            </View>
            <View>
              <Image
                style={styles.avatar}
                source={require('./../../../assets/images/profile.png')}
              />
            </View>
          </View>
          <View>
            <Text style={styles.text}>Your details :</Text>
          </View>
        </View>

          </ImageBackground>
        <View style={styles.body}>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Vehicle Number</Text>
            <Text style={styles.SubjectText}>{vehicleData.vehicleNumber}</Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Vehicle Type</Text>
            <Text style={styles.SubjectText}>{vehicleData.vehicleType} </Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>License Number</Text>
            <Text style={styles.SubjectText}>{vehicleData.riderLicenceNumber} </Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Contact Number</Text>
            <Text style={styles.SubjectText}>{vehicleData.riderContactNumber} </Text>
          </Pressable>
          <View>
            <Pressable style={styles.btn}>
              <Text style={styles.text}>{vehicleData.status.toUpperCase()}</Text>
            </Pressable>
          </View>
        </View>
      </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
    headerBackground: {
        height: 300,
        width: '100%',
      },
      headerImageStyle: {
        opacity: 0.7, // This controls the image opacity
        resizeMode: 'cover', // or 'contain' depending on your needs
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
  });

export default VehicleDetailsScreen;
