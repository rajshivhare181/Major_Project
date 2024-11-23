import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'react-native';

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Drawer screenOptions={{ headerStyle:{backgroundColor: "#fffff"}}}>
        <Drawer.Screen name='index' options={{title: "Home"}}/>
        <Drawer.Screen name='register' options={{title: "Register"}}/>
        <Drawer.Screen name='login' options={{title: "Login"}}/>
        <Drawer.Screen name="Gwalior_Fort" options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

// drawerStyle: {backgroundColor: "#FFE9D0"},