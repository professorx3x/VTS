import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import uuid from 'react-native-uuid';
import CustomButton from '@components/ui/CustomButton';

const VehicleRegistrationForm = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [RiderLicenceNumber, setRiderLicenceNumber] = useState('');
  const [RiderContactNumber, setRiderContactNumber] = useState('');
  const [rcImage, setRcImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets?.length) {
      setRcImage(result.assets[0]);
    }
  };

  const uploadRcImage = async () => {
    if (!rcImage?.uri) {
      throw new Error('RC image not selected');
    }

    const storage = getStorage();
    const imageRef = ref(storage, `rcImages/${uuid.v4()}`);

    try {
      const response = await fetch(rcImage.uri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!vehicleNumber || !vehicleType || !rcImage || !RiderContactNumber || !RiderLicenceNumber) {
      Alert.alert('Please fill all fields');
      return;
    }

    setLoading(true);
    const auth = getAuth();
    const db = getFirestore();

    try {
      const rcImageUrl = await uploadRcImage();
      await addDoc(collection(db, 'vehicles'), {
        riderId: auth.currentUser?.uid,
        riderName: auth.currentUser?.displayName || '',
        vehicleNumber,
        vehicleType,
        riderLicenceNumber: RiderLicenceNumber,
        riderContactNumber: RiderContactNumber,
        rcImageUrl,
        status: 'pending',
        submittedAt: serverTimestamp(),
      });

      Alert.alert('Vehicle submitted for verification.');
    } catch (err) {
      console.error('Error submitting vehicle:', err);
      Alert.alert('Error submitting vehicle. Please try again.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register Your Vehicle</Text>

      <CustomInput
        onChangeText={(text) => setRiderLicenceNumber(text)}
        onClear={() => setRiderLicenceNumber('')}
        value={RiderLicenceNumber}
        placeholder="Your License No."
        inputMode="text"
      />
      <CustomInput
        onChangeText={(text) => setRiderContactNumber(text)}
        onClear={() => setRiderContactNumber('')}
        value={RiderContactNumber}
        placeholder="Contact Number"
        inputMode="text"
      />
      <CustomInput
        onChangeText={(text) => setVehicleNumber(text)}
        onClear={() => setVehicleNumber('')}
        value={vehicleNumber}
        placeholder="Vehicle Number"
        inputMode="text"
      />
      <CustomInput
        onChangeText={(text) => setVehicleType(text)}
        onClear={() => setVehicleType('')}
        value={vehicleType}
        placeholder="Vehicle Type"
        inputMode="text"
      />

      <TouchableOpacity onPress={pickImage}>
        <Text>Select RC Image</Text>
      </TouchableOpacity>

      {rcImage && <Image source={{ uri: rcImage.uri }} style={styles.rcImage} />}

      <CustomButton onPress={handleSubmit} disabled={loading} loading={loading} title="Submit" />
    </View>
  );
};

export default VehicleRegistrationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 60,
  },
  header: {
    fontFamily: Fonts.SemiBold,
    fontSize: 30,
    marginBottom: 20,
  },
  rcImage: {
    width: 200,
    height: 200,
    margin: 20,
  },
});
