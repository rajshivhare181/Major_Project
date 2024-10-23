import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "FFE9D0" }}>
      <Drawer>
        <Drawer.Screen name='index' options={{title: "Home"}}/>
        <Drawer.Screen name='register' options={{title: "Register"}}/>
        <Drawer.Screen name='login' options={{title: "Login"}}/>
      </Drawer>
    </GestureHandlerRootView>
  );
}