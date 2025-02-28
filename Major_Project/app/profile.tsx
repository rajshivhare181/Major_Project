import { StyleSheet, Text, View, TouchableOpacity, Platform, Image, TextInput, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import DrawerScreenAnimation from '@/components/drawerScreenAnimation';
import { Entypo } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db, storage } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from '@/components/myButton';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import RNPickerSelect from 'react-native-picker-select';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL, deleteObject, getStorage } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';


const { width, height } = Dimensions.get("window");

const Profile = () => {
  type NavigationProps = DrawerNavigationProp<any, any>;
  const navigation = useNavigation<NavigationProps>();

  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<any>({});
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  
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
    if (auth.currentUser) {
      const fetchUser = async () => {
        const userId = auth.currentUser?.uid;
        if (userId) {
          try {
            const userDoc = await getDoc(doc(db, "users", userId));
            const data = userDoc.data();
            setUserData(data || {});
            setEditedData(data || {});
            fetchImage();
            // console.log("userdata:", userData);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.warn("No user found for fetchUser");
        }
      };

      fetchUser();
      // console.log("user", user);
    }
    return unsubscribe;
  }, []);

  const fetchImage = useCallback(async () => {
    const userId = auth.currentUser?.uid;
    if (userId && userData?.profileImage) {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, `profileImages/${userId}`);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  }, [userData?.profileImage]);
  
  const handleImageOptions = () => {
    const options = [
      { text: "Take Photo", onPress: handleTakePhoto },
      { text: "Choose from Device", onPress: handleChoosePhoto },
    ];

    if (userData.profileImage) {
      options.push({ text: "Remove Photo", onPress: handleRemovePhoto });
    }

    Alert.alert("Profile Photo", "Choose an option", options.map((opt) => ({
      text: opt.text,
      onPress: opt.onPress,
    })));
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Camera access is required to take photos.");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct way to set media type
      allowsEditing: true,
      quality: 1,
    });
  
    if (result.canceled) {
      Alert.alert("No photo taken", "You did not take a photo.");
      return;
    }
  
    if (result.assets?.[0]?.uri) {
      uploadImage(result.assets[0].uri);  // Ensure proper handling of the URI
    } else {
      Alert.alert("Error", "Something went wrong while taking the photo.");
    }
  };
  
  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Media library access is required to choose photos.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct media type usage
      allowsEditing: true,
      quality: 1,
    });
  
    if (result.canceled) {
      Alert.alert("No photo selected", "You did not select a photo.");
      return;
    }
  
    if (result.assets?.[0]?.uri) {
      uploadImage(result.assets[0].uri); // Make sure the URI is passed correctly
    } else {
      Alert.alert("Error", "Something went wrong while selecting the photo.");
    }
  };

  const uploadImage = async (uri: string) => {
    if (user) {
      const userId = user.uid;
      const imageRef = ref(storage, `profileImages/${userId}`);
      const response = await fetch(uri);
      const blob = await response.blob();

      try {
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", userId), { profileImage: downloadURL });
        setProfileImage(downloadURL);
        fetchImage();
        Alert.alert("Success", "Profile image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleRemovePhoto = async () => {
    if (user) {
      const userId = user.uid;
      const imageRef = ref(storage, `profileImages/${userId}`);

      try {
        await deleteObject(imageRef);
        await updateDoc(doc(db, "users", userId), { profileImage: deleteField() });
        setProfileImage(null);
        Alert.alert("Success", "Profile image removed successfully!");
      } catch (error) {
        console.error("Error removing image:", error);
      }
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = async () => {
    if (user) {
      const userId = user.uid;
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, editedData);
        setUserData(editedData);
        setEditMode(false);
      } catch (error) {
        console.error("Error updating user details:", error);
      }
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setEditedData((prevState: any) => ({ ...prevState, [key]: value }));
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
          <Text style={{ color: 'black', paddingTop: height * 0.018, fontSize: width * 0.05, fontWeight: 'bold'}}>Profile</Text>
        </View>
        <View style={{ backgroundColor: '#F3F1F1', height: height }}>
          <View style={{
            height: height * 0.35,
            justifyContent: "center",
            alignItems: "center",
          }}>
            {imageUrl ? (
              <Image
              source={{ uri: imageUrl }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
            ) : (
              <Image source={require('@/assets/images/user.png')} 
              style={{
                height: 200,
                width: 200,
              }} 
            />
            )}
            
            <TouchableOpacity style={styles.imageButton} onPress={handleImageOptions}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {editMode ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editedData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  value={editedData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  placeholder="Email"
                />
                <View style={styles.dropdown}>
                    <RNPickerSelect
                      onValueChange={(value) => handleInputChange('preferences', value)}
                      items={[
                        { label: 'Temple', value: 'Temple' },
                        { label: 'Monuments', value: 'Monuments' },
                        { label: 'Mountain', value: 'Mountain' },
                        { label: 'Beach', value: 'Beach' },
                      ]}
                      placeholder={{ label: "Preferences", value: null }}
                      value={editedData.preferences}
                      style={pickerSelectStyles}
                    />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.input}>{userData?.name || "NA"}</Text>
                <Text style={styles.input}>{userData?.email || "NA"}</Text>
                <Text style={styles.input}>{userData?.phone || "NA"}</Text>
                <Text style={styles.input}>{userData?.preferences || "NA"}</Text>
              </>
            )}
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: height * 0.02 }}>
            {editMode ? (
              <MyButton title='Submit' onPress={handleSubmit} />
            ) : (
              <MyButton title='Edit' onPress={handleEdit} />
            )}
          </View>
        </View>
      </DrawerScreenAnimation>
    </View>
  );
};

export default Profile;

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
  imageButton: {
    marginTop: 10,
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 8,
  },
  input: {
    fontSize: width * 0.05,
    backgroundColor: "#ffffff",
    height: height * 0.06, 
    width: width * 0.9,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: height * 0.01,
    paddingLeft: width * 0.05,
    paddingVertical: height * 0.01,
  },
  dropdown: {
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    marginTop: height * 0.01,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'white',
    color: 'black',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: width * 0.05,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.003,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is not hidden
    marginHorizontal: width * 0.02, 
  },
  inputAndroid: {
    fontSize: width * 0.05,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.003,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is not hidden
    marginHorizontal: width * 0.02, 
  },
});
