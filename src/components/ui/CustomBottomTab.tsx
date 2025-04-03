import React, { FC, useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import UserDashboad from '@features/screens/user/UserDashboard';
import AdminDashboard from '@features/screens/admin/AdminDashboard';
import RiderDashboad from '@features/screens/rider/RiderDashboard';
import UserTripHistory from '@features/screens/user/UserTripHistory';
import UserNotification from '@features/screens/user/UserNotification';
import RiderJourneyHistory from '@features/screens/rider/RiderJourneyHistory';
import VehicleRegistration from '@features/screens/rider/VehicleRegistration';
import { Colors, Fonts, Roles } from '@utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@features/auth/AuthContext';
import CustomSafeArea from '@components/global/CustomSafeArea';
import LoadingScreen from '@features/screens/LoadingScreen';


const Tab = createBottomTabNavigator();


const CustomBottomTab: FC = () => {
    const authContext = useContext(AuthContext);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (authContext?.role) {
        setRole(authContext.role);
      } else {
        const storedRole = await AsyncStorage.getItem('role');
        if (storedRole) {setRole(storedRole);}
      }
      setLoading(false);
    };

    fetchRole();
  }, [authContext?.role]); // Runs when context role updates

  if (loading) {return LoadingScreen;} // Prevent rendering until role is loaded
    return (
        <CustomSafeArea>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor:Colors.primary, height: 70 },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: Colors.disabled,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: Fonts.SemiBold,
            marginBottom: 5,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size ,focused}) => {
            let iconName = '';
            if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'History') {
                iconName = focused ? 'time' : 'time-outline';
              } else if (route.name === 'Notification') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              } else if (route.name === 'Register') {
                iconName = focused ? 'car' : 'car-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        {role === Roles.Admin ? (
          <>
            <Tab.Screen name="Home" component={AdminDashboard} />
          </>
        ) : role === Roles.Rider ? (
          <>
            <Tab.Screen name="Home" component={RiderDashboad} />
            <Tab.Screen name="History" component={RiderJourneyHistory} />
            <Tab.Screen name="Register" component={VehicleRegistration} />
          </>
        ) : role === Roles.User ? (
          <>
            <Tab.Screen name="Home" component={UserDashboad} />
            <Tab.Screen name="History" component={UserTripHistory} />
            <Tab.Screen name="Notification" component={UserNotification} />
          </>
        ) :
        (<Tab.Screen name= "loading" component={LoadingScreen} />)
        }
      </Tab.Navigator>
      </CustomSafeArea>
    );
  };
  export default CustomBottomTab