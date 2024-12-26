import * as AuthSession from 'expo-auth-session';
import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Switch, ActivityIndicator, Alert, Linking, Platform } from "react-native";
import { Image } from 'expo-image';
import RNPickerSelect from 'react-native-picker-select';
import { Dimensions } from 'react-native';
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import * as Location from 'expo-location';
import { collection, getDocs, doc, getDoc, where, limit, query } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerScreenAnimation from "@/components/drawerScreenAnimation";
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer'; 
import Layout from './_layout';

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  type NavigationProps = DrawerNavigationProp<any, any>;
  const navigation = useNavigation<NavigationProps>();

  // Google Sign In
  // const redirectUri = "https://auth.expo.io/raj_shivhare/Major_Project" ;

  // // console.log('Generated Redirect URI:', redirectUri);
  //  // Use Google Authentication hook at the top level
  //  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: "404394659518-cr0m949cc5cvkdv4pd9fkndpsj4qp003.apps.googleusercontent.com",
  //   redirectUri: redirectUri,
  // });

  // // console.log('Redirect URI:', redirectUri);
  // // Handle the Google authentication response
  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { id_token } = response.params;

  //     // Create a credential with the ID token
  //     const credential = GoogleAuthProvider.credential(id_token);

  //     // Sign in with Firebase using the credential
  //     signInWithCredential(auth, credential)
  //       .then((result) => {
  //         console.log('User Info:', result.user); // Log user info
  //       })
  //       .catch((error) => {
  //         console.error('Error signing in with Google:', error); // Handle errors
  //       });
  //   }
  // }, [response]);

  const onRegister = () => {
    router.push("/register");
  };

  const onLogin = () => {
    router.push("/login");
  };

  const ongo = (item: any) => {
    if (user) {
      setFLoading(true);
      setTimeout(() => {
        router.push(item);
        setFLoading(false);
        console.log('Redirect to:',item);
      }, 1000);
    } else {
      Alert.alert("Please Login First");
      router.push("/login");
    }
  }

  const ongoRestaurant = (value: any) => {
    // console.log(value);
    if (user) {
      if (value == "Dineout") {
        const dnappUrl = 'dineout://';
        const dnplayStoreUrl = 'https://play.google.com/store/apps/details?id=com.dineout.book';
        const dnappStoreUrl = 'https://apps.apple.com/in/app/dineout-table-reservation/id510864930';

        Linking.openURL(dnappUrl).catch(() => {
          Alert.alert(
            'App Not Found',
            'It seems the Dineout app is not installed. Do you want to download it?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Download',
                onPress: () => {
                  // Redirect to the appropriate store based on the platform
                  const storeUrl = Platform.OS === 'ios' ? dnappStoreUrl : dnplayStoreUrl;
                  Linking.openURL(storeUrl);
                },
              },
            ],
          );
        });
      } else if (value == "EazyDiner") {
        const edappUrl = 'eazydiner://';
        const edplayStoreUrl = 'https://play.google.com/store/apps/details?id=com.eazydiner.eazydiner';
        const edappStoreUrl = 'https://apps.apple.com/in/app/eazydiner/id982865448';

        Linking.openURL(edappUrl).catch(() => {
          Alert.alert(
            'App Not Found',
            'It seems the EazyDiner app is not installed. Do you want to download it?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Download',
                onPress: () => {
                  // Redirect to the appropriate store based on the platform
                  const storeUrl = Platform.OS === 'ios' ? edappStoreUrl : edplayStoreUrl;
                  Linking.openURL(storeUrl);
                },
              },
            ],
          );
        });
      }else if (value == "nearbuy") {
        const nbappUrl = 'https://www.nearbuy.com/';

        Linking.openURL(nbappUrl).catch(err => console.error("An error occurred", err));
      }
    } else {
      Alert.alert("Please Login First");
      router.push("/login");
    }
  }

  const ongoHotel = async(value: any) => {
    // console.log(value);
    if (user) {
      if (value == "MakeMyTrip") {
        const mmtappUrl = 'https://www.makemytrip.com/';
        const mmtplayStoreUrl = 'https://play.google.com/store/apps/details?id=com.makemytrip';
        const mmtappStoreUrl = 'https://apps.apple.com/in/app/makemytrip-travel-booking/id530488336';

        await Linking.openURL(mmtappUrl).catch(() => {
          Alert.alert(
            'App Not Found',
            'It seems the MakeMyTrip app is not installed. Do you want to download it?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Download',
                onPress: async() => {
                  // Redirect to the appropriate store based on the platform
                  const storeUrl = Platform.OS === 'ios' ? mmtappStoreUrl : mmtplayStoreUrl;
                  await Linking.openURL(storeUrl);
                },
              },
            ],
          );
        });
      }else if (value == "Goibibo") {
        const gbbappUrl = 'goibibo://';
        const gbbplayStoreUrl = 'https://play.google.com/store/apps/details?id=com.goibibo';
        const gbbappStoreUrl = 'https://apps.apple.com/in/app/goibibo-flight-hotel-deals/id718697471';

        Linking.openURL(gbbappUrl).catch(() => {
          Alert.alert(
            'App Not Found',
            'It seems the Goibibo app is not installed. Do you want to download it?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Download',
                onPress: () => {
                  // Redirect to the appropriate store based on the platform
                  const storeUrl = Platform.OS === 'ios' ? gbbappStoreUrl : gbbplayStoreUrl;
                  Linking.openURL(storeUrl);
                },
              },
            ],
          );
        });
      }
    } else {
      Alert.alert("Please Login First");
      router.push("/login");
    }
  }

  const ongoCab = async(value: any) => {
    // console.log(value);
    if (user) {
      if (value == "Ola") {
        const olaappUrl = 'https://www.olacabs.com/';

        Linking.openURL(olaappUrl).catch(err => console.error("An error occurred", err));
      } else if (value == "Uber") {
        const uberappUrl = 'uber://';
        const uberplayStoreUrl = 'https://play.google.com/store/apps/details?id=com.ubercab';
        const uberappStoreUrl = 'https://apps.apple.com/us/app/uber-request-a-ride/id368677368';

        Linking.openURL(uberappUrl).catch(() => {
          Alert.alert(
            'App Not Found',
            'It seems the Uber app is not installed. Do you want to download it?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Download',
                onPress: () => {
                  // Redirect to the appropriate store based on the platform
                  const storeUrl = Platform.OS === 'ios' ? uberappStoreUrl : uberplayStoreUrl;
                  Linking.openURL(storeUrl);
                },
              },
            ],
          );
        });
      }else if (value == "Rapido") {
        const rapidoappUrl = 'https://rapido.bike/';

        await Linking.openURL(rapidoappUrl).catch(err => console.error("An error occurred", err));
      }
    } else {
      Alert.alert("Please Login First");
      router.push("/login");
    }
  }

  const [state, setState] = useState('');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [user, setUser] = useState<User | null>(null); // State for user, which can be a `User` or `null`
  const [isAutoFetch, setIsAutoFetch] = useState(false); // Toggle switch state
  const [issearch, setIsSearch] = useState(false);
  const [islocation, setIsLocation] = useState(false);
  const [region, setRegion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lloading, setLLoading] = useState(false);
  const [floading, setFLoading] = useState(false);
  const [isdisplay, setIsDisplay] = useState(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [userpreference, setUserPrefernce] = useState('');
  const [hotel, setHotel] = useState('');
  const [cab, setCab] = useState('');
  const [restaurant, setRestaurant] = useState('');


  const reload = async () => {
    const getUser = await AsyncStorage.getItem('user');
    // console.log('on home page:', getUser);
    setUser(getUser ? JSON.parse(getUser) : null);
  };

  useEffect(() => {
    reload();
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      fetchPreferences();
    });
    return unsubscribe;
  }, []);

  const autoFetch = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    try {
      // Define the type for locationSubscription
    const newLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    setLocation(newLocation); // Update location state
    const userLat = newLocation.coords.latitude;
    const userLon = newLocation.coords.longitude;
    // console.log(`Latitude: ${userLat}, Longitude: ${userLon}`);

        // Perform reverse geocoding
        try {
          setLLoading(true);
          const address = await Location.reverseGeocodeAsync({
            latitude: userLat,
            longitude: userLon,
          });

          if (address.length > 0) {
            const region: any = address[0].region; // Extract the state
            setRegion(region); // Update state in your component
            // console.log(`State: ${region}`);
            setSearchData([]);
            const querySnapshot = await getDocs(collection(db, region));
            const data: LocationData[] = querySnapshot.docs.map((doc) => ({
              ...doc.data() as LocationData, // Document data
            }));
            // Calculate distances and sort the data
            const fdata = data
            .map((item) => ({
              ...item,
              distance: haversineDistance(
                userLat,
                userLon,
                item.latitude,
                item.longitude
              ),
            }))
            .sort((a, b) => a.distance - b.distance);
            // console.log("Fetched All data:", data);
            // console.log("Query snapshot size:", querySnapshot.size);
            // console.log(searchData);
            // console.log(data);
            setSearchData(fdata);
            setIsDisplay(true);
            setIsLocation(true);
          } else {
            console.log('No address found');
          }
        } catch (error) {
          console.error('Error during reverse geocoding:', error);
        }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    } finally {
      setLLoading(false);
    }
  };

  const stopAutoFetch = () => {
    if (islocation) {
      try {
        setIsLocation(false);
        if (state || state.trim() !== ""){
          manullySearch();
        } else {
          setIsDisplay(false);
          fetchPreferences();
          setIsSearch(false);
          // console.log("Location updates stopped.");
        }
      } catch (error) {
        console.error("Error while unsubscribing from location updates:", error);
      }
    }
    setIsLocation(false);
  };

  // Listen for changes in the toggle (isAutoFetch)
  useEffect(() => {
    if (isAutoFetch) {
      autoFetch();
    } else {
      stopAutoFetch();
    }

    return () => {
      stopAutoFetch(); // Cleanup on unmount or when toggling off
    };
  }, [isAutoFetch]);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // console.log("User signed out successfully");
      AsyncStorage.removeItem('user');
      router.push("/");
      stopAutoFetch();
      setIsAutoFetch(false);
      setIsSearch(false);
      setIsDisplay(false);
      setState("");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Function to toggle Auto Fetch
  const toggleAutoFetch = () => {
    setIsAutoFetch(previousState => !previousState);
    // if (!isAutoFetch) {
    //   console.log('Auto Fetch ON, function called');
    // } else {
    //   console.log('Auto Fetch OFF, search bar and button displayed');
    // }
  };

  const fetchPreferences = async () => {
    try {
      const currentUser = auth.currentUser;
      const userId: string | null = auth.currentUser?.uid ?? null;
      // console.log('Current User:', currentUser);
      // console.log('User ID:', userId);
      if (!userId) {
        return;
      }
      if (currentUser && !isAutoFetch && !issearch) {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const { preferences } = userDoc.data();
          setUserPrefernce(preferences);
          fetchFilteredData(preferences);
          // console.log('Preferences:', preferences);
        }
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const fetchFilteredData = async (preferences: any) => {
    if (!preferences) {
      return;
    }
    try {
      setLLoading(true);
      const data: any[] = [];
      const type = preferences;
      setSearchData([]);
      const collections = ['Anbaman And Nicobar Islands', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi', 'Dadra and Nagar Havel', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalay', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',   'Uttar Pradesh'];
      for (const coll of collections) {
        // Reference each collection
        const collRef = collection(db, coll);
        const q = query(collRef, where('type', '==', type));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => data.push(doc.data()));
        
        // console.log("Preferences:", type);
        
        
      }
      setSearchData(data);
      setIsDisplay(true);
      // console.log("All Data:", data);
    } catch (error) {
      console.error('Error fetching filtered data:', error); 
    } finally {
      setLLoading(false);
    }
  };

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };
  
  interface LocationData {
    id: string;
    dname: string;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
  }


  // Manullay Search
  const manullySearch = async() => {

    if (!state) {
      Alert.alert("Please enter State Name");
      return;
    }
    const lname = state.trim().toLowerCase();
    const fname = lname.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    // console.log("State input:", state);
    // console.log("Formatted collection name:", fname);
    try {
      setLoading(true); // Show loading spinner
      setLLoading(true);
      setSearchData([]);
      const querySnapshot = await getDocs(collection(db, `${fname}`));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document data
      }));
      // console.log("Fetched All data:", data);
      // console.log("Query snapshot size:", querySnapshot.size);
      setSearchData(data);
      setIsDisplay(true);
      setIsSearch(true);
    } catch (error) {
      console.error("Error fetching all data:", error);
      Alert.alert("Error", "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false); // Hide loading spinner
      setLLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#009688" }}>
      <DrawerScreenAnimation>
        <View style={styles.stack}>
          <TouchableOpacity 
            onPress={() => navigation.openDrawer()} 
            style={{paddingTop: height * 0.018, marginLeft: width * 0.05, marginRight: width * 0.02 }}
          >
            <Entypo name='menu' size={26} />
          </TouchableOpacity>
          <Text style={{ color: 'black', paddingTop: height * 0.018, fontSize: width * 0.05, fontWeight: 'bold'}}>Home</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#F3F1F1' }}>
            {floading ? (
              <View style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',}}>
                <Image source={require('@/assets/images/Mr Bean.gif')} style={styles.gif} contentFit="contain"/>
                {/* <ActivityIndicator size="large" color="black" /> */}
              </View>
            ) : (
              <>
                <ScrollView showsVerticalScrollIndicator={false} 
                  style={{ backgroundColor: '#F3F1F1'}}
                >
                  {user ? (
                    <View style={styles.main}>
                        {/* Toggle switch visible when user is logged in */}
                        <View style={styles.toggleContainer}>
                          <Text style={styles.toggleLabel}>Auto Fetch</Text>
                          <Switch
                            trackColor={{ false: "red", true: "green" }}
                            thumbColor={isAutoFetch ? "white" : "white"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleAutoFetch}
                            value={isAutoFetch}
                          />
                        </View>
                        <TouchableOpacity style={styles.btn1} onPress={handleLogout}>
                          <Text style={styles.text}>Log out</Text>
                        </TouchableOpacity>
                      </View>
                  ) : (
                    <>
                      <View style={styles.main}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onRegister}>
                          <Text style={styles.text}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onLogin}>
                          <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                      </View>
                      {/* <View style={styles.gmain}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.guest} onPress={() => {promptAsync();}}>
                          <Text style={styles.gtext}><FontAwesome6 name="google" size={25}/>         Sign In With Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.guest} onPress={onfacebook}>
                          <Text style={styles.gtext}><FontAwesome6 name="facebook-f" size={25}/>      Sign In With Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.guest} onPress={ongithub}>
                          <Text style={styles.gtext}><FontAwesome6 name="github" size={25}/>         Sign In With GitHub</Text>
                        </TouchableOpacity>
                      </View> */}
                    
                    </>
                  )}
                  {/* Conditionally render search bar and button if Auto Fetch is OFF */}
                  {!isAutoFetch && (
                    <View style={styles.main}>
                      <TextInput
                        value={state}
                        onChangeText={setState}
                        placeholder="Enter State Name"
                        style={styles.number}
                      />
                      <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={manullySearch}>
                        {loading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <Text style={styles.text}>Search</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={styles.dropdownText}>
                    <Text>Restaurant</Text>
                    <Text>Hotel       </Text>
                    <Text>Cabs     </Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.dropdown}>
                      <RNPickerSelect
                        onValueChange={(value) => {setRestaurant(value); ongoRestaurant(value);}}
                        items={[
                          { label: 'Dineout', value: 'Dineout' },
                          { label: 'EazyDiner', value: 'EazyDiner' },
                          { label: 'Nearbuy', value: 'nearbuy' },
                        ]}
                        placeholder={{ label: 'Choose an option...', value: null }}
                        style={pickerSelectStyles}
                      />
                    </View>
                    <View style={styles.dropdown}>
                      <RNPickerSelect
                        onValueChange={(value) => {setHotel(value); ongoHotel(value);}}
                        items={[
                          { label: 'MakeMyTrip', value: 'MakeMyTrip' },
                          { label: 'Goibibo', value: 'Goibibo' },
                        ]}
                        placeholder={{ label: 'Choose an option...', value: null }}
                        style={pickerSelectStyles}
                      />
                    </View>
                    <View style={styles.dropdown}>
                      <RNPickerSelect
                        onValueChange={(value) => {setCab(value); ongoCab(value);}}
                        items={[
                          { label: 'Ola', value: 'Ola' },
                          { label: 'Uber', value: 'Uber' },
                          { label: 'Rapido', value: 'Rapido' },
                        ]}
                        placeholder={{ label: 'Choose an option...', value: null }}
                        style={pickerSelectStyles}
                      />
                    </View>
                  </View>

                  <View style={styles.lang1}>
                    <Text style={styles.name}>Aao Mahare Desh</Text>
                    <Text style={styles.name}>आओ हमारे देश</Text>
                    <Text style={styles.name}>आवो म्हारे देश</Text>
                  </View>
                  
                  {lloading? (
                    <View>
                      <Image source={require('@/assets/images/Mr Bean.gif')} style={styles.lgif} contentFit="contain"/>
                    </View>
                  ) : !isdisplay? (
                    <>
                      <View style={styles.lang2}>
                        <Text style={styles.name}>"Nature always</Text>
                        <Text style={styles.name}> wears the colors</Text>
                        <Text style={styles.name}> of the spirit"</Text>
                      </View>
                      <View style={styles.lang3}>
                        <Text style={styles.name}>"Adopt the peace</Text>
                        <Text style={styles.name}>of nature. Her</Text>
                        <Text style={styles.name}>secret is patience."</Text>
                      </View>
                      <View style={styles.lang1}>
                        <Text style={styles.name}>"The tans will fade,</Text>
                        <Text style={styles.name}>but the memories</Text>
                        <Text style={styles.name}>will last forever."</Text>
                      </View>
                      <View style={styles.lang2}>
                        <Text style={styles.name}>"Once a year, go</Text>
                        <Text style={styles.name}>someplace you've</Text>
                        <Text style={styles.name}>never been before."</Text>
                      </View>
                      <View style={styles.lang3}>
                        <Text style={styles.name}>"There's hope at</Text>
                        <Text style={styles.name}>the bottom of the</Text>
                        <Text style={styles.name}>biggest waterfall."</Text>
                      </View>
                    </>
                  ) : searchData.length > 0 ? (
                    <>
                      {searchData.map((item, index) => {
                        const stylesArray = [styles.lang2, styles.lang3, styles.lang1];
                        const currentStyle = stylesArray[index % stylesArray.length];

                        return (
                          <TouchableOpacity key={index} style={currentStyle} onPress={() => ongo(`${item.name}`)}>
                            <Text style={styles.name}>{item.dname}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  ) : (
                    <Text style={styles.noData}>No data available.</Text>
                  )}
                </ScrollView>
              </>
            )}
        </View>
      </DrawerScreenAnimation>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: 'space-between', // Distribute buttons evenly
    paddingHorizontal: width * 0.05, // 5% padding on left and right
    marginVertical: height * 0.02, // Vertical margin based on screen height
  },
  // gmain: {
  //   alignSelf: 'center',
  // },
  stack: {
    height: height * 0.07,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 5 }, // Offset for bottom shadow
        shadowOpacity: 0.2, // Shadow transparency
        shadowRadius: 8, // Shadow blur radius
      },
      android: {
        elevation: 5, // Elevation for Android
      },
    }),
  },
  btn1: {
    backgroundColor: "#8533ff",
    width: '80%',
    height: height * 0.06,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  toggleContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: width * 0.035,
    // marginRight: width * 0.02,
  },
  lang1: {
    backgroundColor: "#FFE9D0",
    borderRadius: 20,
    // padding: height * 0.00, // Padding relative to screen height
    marginVertical: height * 0.02, // Vertical margin
    width: width * 0.9, // 90% of the screen width
    alignSelf: "center", // Center horizontally
  },
  lang2: {
    backgroundColor: "#ccf5ff",
    borderRadius: 20,
    // padding: height * 0.00, // Padding relative to screen height
    marginVertical: height * 0.02, // Vertical margin
    width: width * 0.9, // 90% of the screen width
    alignSelf: "center", // Center horizontally
  },
  lang3: {
    backgroundColor: "#ffe6e6",
    borderRadius: 20,
    // padding: height * 0.00, // Padding relative to screen height
    marginVertical: height * 0.02, // Vertical margin
    width: width * 0.9, // 90% of the screen width
    alignSelf: "center", // Center horizontally
  },
  button: {
    backgroundColor: "#8533ff",
    width: '48%', // Takes 48% of the parent's width
    height: height * 0.06, // 6% of screen height for button height       
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#8533ff",
    width: '30%', // 30% of the parent's width for the smaller button
    height: height * 0.06, // 6% of screen height
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  // guest: {
  //   // backgroundColor: "#8533ff",
  //   width: width * 0.9, // Takes 48% of the parent's width
  //   height: height * 0.06, // 6% of screen height for button height       
  //   borderRadius: 10,
  //   borderColor: 'black',
  //   borderWidth: 3,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginVertical: height * 0.005,
  // },
  // gtext: {
  //   fontSize: width * 0.05,
  //   fontWeight: "bold",
  // },
  text: {
    fontSize: width * 0.04, // Font size relative to screen width
    color: "white",
    fontWeight: "bold",
  },
  number: {
    fontSize: width * 0.045, // Font size relative to screen width
    height: height * 0.06, // 6% of screen height for input box
    width: '65%', // Input width is 65% of its parent container
    borderColor: 'black', 
    borderWidth: 2, 
    borderRadius: 10,
    paddingLeft: width * 0.05, // Padding left relative to screen width
    backgroundColor: "white",
  },
  name: {
    fontSize: width * 0.075, // Text size based on screen width
    fontWeight: "bold",
    textAlign: "center", // Center the text
    paddingTop: height * 0.01, // Padding top relative to height
  },
  noData: {
    fontSize: width * 0.07,
    textAlign: "center", 
    paddingTop: height * 0.15,
  },
  gif: {
    width: width * 1,
    height: height ,
    alignSelf: "center",
    // marginTop: height * 0.8,
  },
  lgif: {
    width: width * 1,
    height: height ,
    alignSelf: "center",
    marginTop: -215,
  },
  dropdownText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: width * 0.06,
    marginBottom: height * 0.01,
  },
  dropdown: {
    // width: width * 0.02, // 90% of screen width
    // height: height * 0.06,
    marginHorizontal: width * 0.05, // 5% margin from left
    marginBottom: height * 0.02, // Dynamic margin
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'white',
    color: 'black',
  },
  // blurview: {
  //   padding: 20,
  //   marginTop: 15,
  //   marginHorizontal: 15,
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   overflow: 'hidden',
  //   borderRadius: 20,
  // },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: width * 0.04,
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
    fontSize: width * 0.04,
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



// #ccf5ff color1 #FFE9D0 color2 #ffe6e6 color3    #8533ff button   