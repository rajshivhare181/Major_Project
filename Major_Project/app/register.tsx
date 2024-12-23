import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert, ActivityIndicator, Switch } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "expo-router";
import RNPickerSelect from 'react-native-picker-select';
import Mybutton from "@/components/myButton";
import PhoneInput from 'react-native-phone-number-input';
import { useFocusEffect } from '@react-navigation/native';
import { auth, app, db } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { getApps } from 'firebase/app';
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

const { width, height } = Dimensions.get("window");
const register: React.FC = () => {
    const router = useRouter();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState<string>('');
  const phoneInput = useRef<PhoneInput>(null);
  // const [password, setPassword] = useState('');

  // Used in phone verification
  const [userotp, setUserotp] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [ispreference, setIsPreference] = useState(false);
  const [preferenceValue, setPreferenceValue] = useState('');
  


  // Reset state when navigating to this page
  useFocusEffect(
    React.useCallback(() => {
      // Reset all the states to initial values
      setUserName('');
      setUserEmail('');
      setUserNumber("");
      setUserotp('');
      setVerificationId(null);
      setIsEditable(true);
      setResendDisabled(true);
      setCountdown(300); // Reset the countdown timer
      setPreferenceValue('');
      return () => {};
    }, [])
  );


   // Countdown Timer for Resend Button
   useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, countdown]);

    // console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
  // console.log(getApps());
  // console.log('Auth Instance:', auth);
  // console.log('Firebase App Options:', app.options);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.navigate("/");
      }
    });
    return unsubscribe;
  }, []);


  // // Email Verification
  // const handleSignup = async () => {
  //   // Ensure that you're using the state values for email and password
  //   // console.log("Email:", userEmail); // state variable
  //   // console.log("Password:", password); // state variable
    
  //   if (!userEmail || !password || !userName || !userNumber) {
  //     Alert.alert('All Credentials are required.');
  //     return;
  //   }

  //   return await createUserWithEmailAndPassword(auth, userEmail, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log("User created successfully:", user.email);
  //       return user;
  //     })
  //     .catch((error) => {
  //       console.error("Error creating user:", error.code, error.message);
  //       if (error.code === 'auth/network-request-failed') {
  //         console.error("Network error: Please check your internet connection.");
  //       }
  //     });
  // };


  // Phone Verification
  const requestOTP = async (): Promise<void> => {
    if (!recaptchaVerifier.current) {
      console.log('Error', 'Recaptcha verifier is not ready. Please try again.');
      return;
    }

    if (!userName || !userEmail){
      Alert.alert('All Credentials are required.');
      return;
    }

    if (!userNumber) {
      Alert.alert('Phone Number is required.');
      return;
    }

    // console.log(userNumber);
    try {
      setLoading(true); // Show loading indicator
      setVerificationId(null); // Clear the previous verificationId

      // Step 1: Check if the phone number exists in the 'users' collection
      const usersCollection = collection(db, 'users');

      // console.log("Checking phone number:", userNumber);

      // Check if the phone number exists in Firestore
      const userQuery = query(usersCollection, where('phone', '==', userNumber));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        // Phone number does not exist
        Alert.alert('You are already registered', 'Go to login.');
        return;
      }

      // Step 2: If the phone number doesn't exists, Send OTP
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        userNumber,
        recaptchaVerifier.current
      );
      // console.log('New verificationId:', newverificationId);
      setVerificationId(verificationId); // Set a new verificationId
      setIsEditable(false); // Disable phone number input
      setResendDisabled(true); // Disable resend button
      setCountdown(300); // Reset countdown
      Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const editPhoneNumber = (): void => {
    setIsEditable(true); // Enable phone number input
    setVerificationId(null); // Invalidate the previous OTP
  };

  const verifyOtp = async (): Promise<void> => {
    if (!verificationId) {
      Alert.alert('Error', 'Please request an OTP first.');
      return;
    }

    if (!userotp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }

    try {
      setLoading(true); // Show loading indicator
      const credential = PhoneAuthProvider.credential(verificationId, userotp);
      const result = await signInWithCredential(auth, credential);
      // Use Firestore to save user data
      const userDocRef = doc(collection(db, 'users'), result.user.uid);
      await setDoc(userDocRef, {
          name: userName,
          email: userEmail,
          phone: userNumber,
          preferences: preferenceValue,
      });
      AsyncStorage.setItem('user', JSON.stringify(result.user));
      // console.log('User data saved to Firestore:', result.user);
      // console.log('Preference:', preferenceValue);
      // console.log('User signed in:', result.user);
      // Alert.alert('Success', 'Phone number verified successfully!');
      // You can redirect the user to the next screen here
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const toggleAutoFetch = () => {
    setIsPreference(previousState => !previousState);
    
  };


  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification={true}
      />
      <Text style= {styles.heading}>Register</Text>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="Enter Your Name"
        style={styles.input}
      />
      <TextInput
        value={userEmail}
        onChangeText={setUserEmail}
        placeholder="Enter Your Email"
        style={styles.input}
      />
      <View style={styles.otp}>
        <View style={[!isEditable && styles.disabled]} pointerEvents={!isEditable ? 'none' : 'auto'}>
          <PhoneInput
            ref={phoneInput}
            value={userNumber}
            defaultCode="IN"
            layout="first"
            placeholder="Enter Number"
            onChangeFormattedText={(Text) => isEditable && setUserNumber(Text)}
            textContainerStyle={styles.phoneInputText}
            containerStyle={styles.number}
          />
        </View>
        {isEditable ? (
          <TouchableOpacity style={styles.button} onPress={requestOTP}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Send</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={editPhoneNumber}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

        {verificationId && (
          <>
            <TextInput
              value={userotp}
              onChangeText={setUserotp}
              placeholder="Enter OTP"
              style={styles.input}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={[styles.resendButton, resendDisabled && styles.disabled]}
              onPress={requestOTP}
              disabled={resendDisabled}
            >
              <Text style={styles.resendText}>
                {resendDisabled ? `Resend OTP in ${Math.floor(countdown / 60)}:${countdown % 60}` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </>
        )}

      {/* <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Enter Password"
        secureTextEntry={true}
        style={styles.input}
      /> */}

      <View style={{alignSelf: "flex-start", flexDirection: "row"}}>
        <Text style= {styles.subheading}>Preference(Optional)</Text>
        <View  style={{alignItems: 'center'}}>          
          <Switch
            trackColor={{ false: "red", true: "green" }}
            thumbColor={ispreference ? "white" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleAutoFetch}
            value={ispreference}
          />
        </View>
      </View>
      {ispreference? (
        <View style={styles.dropdown}>
          <RNPickerSelect
            onValueChange={(value) => setPreferenceValue(value)}
            items={[
              { label: 'Temple', value: 'Temple' },
              { label: 'Monuments', value: 'Monuments' },
              { label: 'Mountain', value: 'Mountain' },
              { label: 'Beach', value: 'Beach' },
            ]}
            placeholder={{ label: 'Choose an option...', value: null }}
            style={pickerSelectStyles}
          />
      </View>
      ) : <Text></Text>}
      
      
      <Mybutton title={"Register"} onPress={verifyOtp}/>
      {/* <link href='/login'>If</link> */}
    </View>
  )
}

export default register

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: width * 0.08, // Dynamic font size
    marginBottom: height * 0.02, // Margin relative to screen height
  },
  subheading: {
    fontWeight: "600",
    fontSize: width * 0.045, // Dynamic font size
    marginHorizontal: width * 0.05, // 5% margin from left
    marginVertical: height * 0.01,
  },
  input: {
    fontSize: width * 0.045, // Dynamic font size
    height: height * 0.06, // 6% of screen height
    width: width * 0.9, // 90% of screen width
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: height * 0.01, // Dynamic margin
    paddingLeft: width * 0.05, // 5% padding left
  },
  number: {
    fontSize: width * 0.045, // Dynamic font size
    height: height * 0.06, // 6% of screen height
    width: width * 0.70, // 90% of screen width
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    // paddingLeft: width * 0.05, // 5% padding left
  },
  // numberInput: {
  //   flex: 1,
  //   height: 50,
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   borderRadius: 8,
  //   marginRight: 10,
  // },
  // phoneInputText: {
  //   backgroundColor: "white",
  //   borderRadius: 8,
  //   height: 50,
  //   paddingHorizontal: 10,
  // },
  disabled: {
    opacity: 0.5
  },
  otp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.01, // Dynamic margin
  },
  phoneInputText: {
    paddingVertical: 0,
    // paddingLeft: width * 0.05,
    borderRadius: 10, // Ensure rounded corners
    // backgroundColor: 'transparent', // Adjust background to avoid styling conflicts
  },
  button: {
    backgroundColor: "#8533ff",
    width: width * 0.20, // Button width is 20% of screen width
    height: height * 0.06, // Button height is 6% of screen height
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width * 0.02, // 2% margin between number input and button
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#FFA500",
  },
  resendButton: {
    alignSelf: "center",
    marginVertical: 10,
  },
  resendText: {
    color: "#007BFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  text: {
    fontSize: width * 0.04, // Dynamic font size
    color: "white",
    fontWeight: "bold",
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8, // 90% of screen width
    paddingVertical: height * 0.015, // Padding based on screen height
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxCircle: {
    height: width * 0.06, // Dynamic size for checkbox
    width: width * 0.06, // Dynamic size for checkbox
    borderRadius: (width * 0.06) / 2, // Circular checkbox
    borderColor: 'black',
    borderWidth: 2,
    marginRight: width * 0.03, // Space between checkbox and text
  },
  checkboxChecked: {
    backgroundColor: '#8533ff',
  },
  checkboxText: {
    fontSize: width * 0.045, // Dynamic font size
  },
  dropdown: {
    width: width * 0.9, // 90% of screen width
    // height: height * 0.06,
    marginHorizontal: width * 0.05, // 5% margin from left
    marginBottom: height * 0.02, // Dynamic margin
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'white',
    color: 'black',
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
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
    fontSize: 16,
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