import { initializeApp } from "firebase/app";
import { getFirestore,doc,getDoc } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// React Native Firebase Messaging
import messaging from "@react-native-firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBKQV2eZ2N4okGPlygcCvpPqS_RbOFNwK0",
  authDomain: "vehicle.firebaseapp.com",
  projectId: "vehicle-5eba5",
  storageBucket: "vehicle-5eba5.firebasestorage.app",
  messagingSenderId: "367428700551",
  appId: "1:367428700551:android:078b2e225644520cb66b22",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Cloud Messaging (FCM) for React Native
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("FCM Permission granted");
  }
};

// Get FCM Token (Use this in your app)
const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};
const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().role; // Assuming the Firestore document has a "role" field
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
  }
  return null;
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully!');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export { auth, db, messaging, requestUserPermission, getFCMToken,getUserRole ,clearStorage};
