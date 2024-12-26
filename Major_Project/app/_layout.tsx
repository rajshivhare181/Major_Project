import 'react-native-gesture-handler';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome6, FontAwesome5, Entypo, Fontisto } from '@expo/vector-icons';
import Index from './';
import register from './register';
import login from './login';
import profile from './profile';
import setting from './setting';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Gwalior_Fort from './Gwalior_Fort';

const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");

export default function Layout() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const reload = async () => {
    const getUser = await AsyncStorage.getItem('user');
    setUser(getUser ? JSON.parse(getUser) : null);
  };

  useEffect(() => {
    reload();
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const userLoggedIn = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View style={{
                height: 200,
                width: "95%",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Image source={require('@/assets/images/user.png')} 
                  style={{
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                  }} />
              </View>
              <DrawerItemList {...props} />
              {/* <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                <Text style={styles.text}>Log out</Text>
              </TouchableOpacity> */}
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerType: "slide",
          headerShown: false,
          headerTitleStyle: { fontWeight: "bold" },
          drawerActiveTintColor: "#D20103",
          drawerLabelStyle: { color: "#111" },
          overlayColor: "transparent",
          drawerStyle: {
            width: "66%",
            backgroundColor: "#009688",
            paddingHorizontal: 10,
          },
        }}
      >
        <Drawer.Screen name='index' component={Index} options={{
          title: "Home", drawerLabel: "Home", drawerIcon: () => <FontAwesome6 name="house" size={18} color="black" />
        }} />
        <Drawer.Screen name='profile' component={profile} options={{
          title: "Profile", drawerLabel: "Profile", drawerIcon: () => <FontAwesome5 name="user-alt" size={18} color="black" />
        }} />
        <Drawer.Screen name='setting' component={setting} options={{
          title: "Setting", drawerLabel: "Setting", drawerIcon: () => <Fontisto name="player-settings" size={18} color="black" />
        }} />
        <Drawer.Screen name='Gwalior_Fort' component={Gwalior_Fort} options={{
          title: "Gwalior_Fort", drawerLabel: "Gwalior_Fort", drawerIcon: () => <Fontisto name="player-settings" size={18} color="black" />
        }} />
      </Drawer.Navigator>
    );
  };

  const userLoggedOut = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerType: "slide",
          headerShown: false,
          headerTitleStyle: { fontWeight: "bold" },
          drawerActiveTintColor: "#D20103",
          drawerLabelStyle: { color: "#111" },
          overlayColor: "transparent",
          drawerStyle: {
            width: "66%",
            backgroundColor: "#009688",
            paddingTop: 15,
          },
        }}
      >
        <Drawer.Screen name='index' component={Index} options={{
          title: "Home", drawerLabel: "Home", drawerIcon: () => <FontAwesome6 name="house" size={18} color="black" />
        }} />
        <Drawer.Screen name='register' component={register} options={{
          title: "Register", drawerLabel: "Register", drawerIcon: () => <Entypo name="add-user" size={18} color="black" />
        }} />
        <Drawer.Screen name='login' component={login} options={{
          title: "Login", drawerLabel: "Login", drawerIcon: () => <Entypo name="login" size={18} color="black" />
        }} />
      </Drawer.Navigator>
    );
  };

  return (
    <>
      {user ? 
        (<Drawer.Navigator
          drawerContent={(props) => {
            return (
              <SafeAreaView>
                <View style={{
                  height: 200,
                  width: "95%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <Image source={require('@/assets/images/user.png')} 
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: 65,
                    }} />
                </View>
                <DrawerItemList {...props} />
                {/* <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                  <Text style={styles.text}>Log out</Text>
                </TouchableOpacity> */}
              </SafeAreaView>
            );
          }}
          screenOptions={{
            drawerType: "slide",
            headerShown: false,
            headerTitleStyle: { fontWeight: "bold" },
            drawerActiveTintColor: "#D20103",
            drawerLabelStyle: { color: "#111" },
            overlayColor: "transparent",
            drawerStyle: {
              width: "66%",
              backgroundColor: "#009688",
              paddingHorizontal: 10,
            },
          }}
        >
          <Drawer.Screen name='index' component={Index} options={{
            title: "Home", drawerLabel: "Home", drawerIcon: () => <FontAwesome6 name="house" size={18} color="black" />
          }} />
          <Drawer.Screen name='profile' component={profile} options={{
            title: "Profile", drawerLabel: "Profile", drawerIcon: () => <FontAwesome5 name="user-alt" size={18} color="black" />
          }} />
          <Drawer.Screen name='setting' component={setting} options={{
            title: "Setting", drawerLabel: "Setting", drawerIcon: () => <Fontisto name="player-settings" size={18} color="black" />
          }} />
          <Drawer.Screen name='Gwalior_Fort' component={Gwalior_Fort} options={{ drawerItemStyle: { display: 'none' }}} />
        </Drawer.Navigator>
        ) : (<Drawer.Navigator
          screenOptions={{
            drawerType: "slide",
            headerShown: false,
            headerTitleStyle: { fontWeight: "bold" },
            drawerActiveTintColor: "#D20103",
            drawerLabelStyle: { color: "#111" },
            overlayColor: "transparent",
            drawerStyle: {
              width: "66%",
              backgroundColor: "#009688",
              paddingTop: 15,
            },
          }}
        >
          <Drawer.Screen name='index' component={Index} options={{
            title: "Home", drawerLabel: "Home", drawerIcon: () => <FontAwesome6 name="house" size={18} color="black" />
          }} />
          <Drawer.Screen name='register' component={register} options={{
            title: "Register", drawerLabel: "Register", drawerIcon: () => <Entypo name="add-user" size={18} color="black" />
          }} />
          <Drawer.Screen name='login' component={login} options={{
            title: "Login", drawerLabel: "Login", drawerIcon: () => <Entypo name="login" size={18} color="black" />
          }} />
        </Drawer.Navigator>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#8533ff",
    width: '100%',
    height: height * 0.06,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  text: {
    fontSize: width * 0.04,
    color: "white",
    fontWeight: "bold",
  },
});
