import React from 'react';
import Navigation from './src/navigation/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@features/auth/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation/>
    </GestureHandlerRootView>
    </AuthProvider>
  );
}
;
export default App;
