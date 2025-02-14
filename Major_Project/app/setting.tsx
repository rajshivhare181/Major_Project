import { StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import DrawerScreenAnimation from '@/components/drawerScreenAnimation';
import { Dimensions } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import { db, storage } from '@/firebase';
import { deleteDoc, doc, updateDoc, deleteField } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, User, deleteUser, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject, getStorage } from 'firebase/storage';

const { width, height } = Dimensions.get("window");

const setting = () => {
  const router = useRouter();
  type NavigationProps = DrawerNavigationProp<any, any>;
  const navigation = useNavigation<NavigationProps>();

  const onHome = () => {
    router.push("/");
  }
  const onProfile = () => {
    router.push("/profile");
  }
  const onAbout = () => {
    router.push("/about");
  }

  const openFeedback = async () => {
    const feedbackUrl = "https://heyform.net/f/NMswARsv"; // Replace with your actual Google Form link
    await WebBrowser.openBrowserAsync(feedbackUrl);
  };    

  const [user, setUser] = useState<User | null>(null);
   
  useEffect(() => {
    const reload = async () => {
      const getUser = await AsyncStorage.getItem('user');
      setUser(getUser ? JSON.parse(getUser) : null);
      // console.log("user2", user);
    };
    reload();
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const reconfirm = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteUserAuth(),
        },
      ]
    );
  };

  const deleteUserAuth = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      try {
        if (user) {
          const imageRef = ref(storage, `profileImages/${userId}`);
          
          try {
            await deleteObject(imageRef);
            await updateDoc(doc(db, "users", userId), { profileImage: deleteField() });
          } catch (error) {
            console.error("Error removing image:", error);
          }
        }
        // Delete document from Firestore
        await deleteDoc(doc(db, "users", userId)); 
        // console.log("Document deleted successfully");
        await signOut(auth);
        AsyncStorage.removeItem('user');
        router.push("/register");
      } catch (error) {
        console.error("Error deleting user and document:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFE9D0" }}>
      <DrawerScreenAnimation>
        <View style={styles.stack}>
          <TouchableOpacity 
            onPress={() => navigation.openDrawer()} 
            style={{ paddingTop: height * 0.018, marginLeft: width * 0.05, marginRight: width * 0.02 }}
          >
            <Entypo name='menu' size={26} />
          </TouchableOpacity>
          <Text style={{ color: 'black', paddingTop: height * 0.018, fontSize: width * 0.05, fontWeight: 'bold'}}>Setting</Text>
        </View>
        <View style={{ backgroundColor: '#F3F1F1', height: height }}>
          <ScrollView showsVerticalScrollIndicator={false} 
            style={{ backgroundColor: '#F3F1F1'}}
          >
            <TouchableOpacity activeOpacity={0.7} style={styles.lang1} onPress={onHome}>
              <Text style={styles.name}>Go To Home</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.lang2} onPress={onProfile}>
              <Text style={styles.name}>Go To Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.lang3} onPress={onAbout}>
              <Text style={styles.name}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.lang1} onPress={openFeedback}>
              <Text style={styles.name}>Feedback</Text>
            </TouchableOpacity>
            <View style={styles.faq}>
              <Text style={styles.name}>FAQ</Text>
              <Text style={styles.question}>Q.1</Text>
              <Text style={styles.question}>Ans.</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.lang3} onPress={reconfirm}>
              <Text style={styles.name}>Delete Profile</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </DrawerScreenAnimation>
    </View>
  )
}

export default setting

const styles = StyleSheet.create({
  stack: {
    height: height * 0.07,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  lang1: {
    backgroundColor: "#FFE9D0",
    borderRadius: 20,
    marginVertical: height * 0.02, // Vertical margin
    width: width * 0.9, // 90% of the screen width
    alignSelf: "center", // Center horizontally
  },
  lang2: {
    backgroundColor: "#ccf5ff",
    borderRadius: 20,
    marginVertical: height * 0.02, // Vertical margin
    width: width * 0.9, // 90% of the screen width
    alignSelf: "center", // Center horizontally
  },
  lang3: {
    backgroundColor: "#ffe6e6",
    borderRadius: 20,
    marginVertical: height * 0.02,
    width: width * 0.9,
    alignSelf: "center",
  },
  faq: {
    backgroundColor: "#ccf5ff",
    borderRadius: 20,
    marginVertical: height * 0.02,
    width: width * 0.9,
    alignSelf: "center",
    paddingBottom: height * 0.01,
  },
  name: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
  },
  question: {
    fontSize: width * 0.045,
    paddingHorizontal: width * 0.05,
  },
})