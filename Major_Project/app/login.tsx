import { View, Text, TextInput, StyleSheet, Dimensions, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from "expo-router";
import Mybutton from "@/components/myButton";
import PhoneInput from 'react-native-phone-number-input';
import { auth, app, db } from "../firebase";
import { useFocusEffect } from '@react-navigation/native';
import { getApps } from 'firebase/app';
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { collection, query, where, getDocs } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const Login = () => {
  const router = useRouter();

  const [userNumber, setUserNumber] = useState<string>('');
  const phoneInput = useRef<PhoneInput>(null);
  const [userotp, setUserotp] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutes

  useFocusEffect(
    React.useCallback(() => {
      // Reset all the states to initial values
      setUserNumber("");
      setUserotp('');
      setVerificationId(null);
      setIsEditable(true);
      setResendDisabled(true);
      setCountdown(300);
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // If the user is authenticated, navigate to the index screen
        router.push("/");
      }
    });
  
    return unsubscribe; // Clean up the auth state change listener when the component unmounts
  }, []);
  

  // const handleSignin = async () => {
  //   // console.log("Email:", email);
  //   // console.log("Password:", password);

  //   if (!userEmail || !password) {
  //     Alert.alert("Email and password must not be empty.");
  //     return;
  //   }

  //   return await signInWithEmailAndPassword(auth, userEmail, password)
  //     .then((userCredential) => {
  //       // User successfully signed in
  //       const user = userCredential.user;
  //       console.log("User signed in successfully:", user.email);
  //       return user;
  //     })
  //     .catch((error) => {
  //       console.error("Error signing in:", error.code, error.message);
  //       if (error.code === 'auth/network-request-failed') {
  //         alert("Network error: Please check your internet connection.");
  //       } else {
  //         alert(`Error: ${error.message}`);
  //       }
  //     });
  // };

  // Phone Verification
  const requestOTP = async (): Promise<void> => {
    if (!recaptchaVerifier.current) {
      console.log('Error', 'Recaptcha verifier is not ready. Please try again.');
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

      if (userQuerySnapshot.empty) {
        // Phone number does not exist
        Alert.alert('Register First', 'No account found for this number. Please register first.');
        return;
      }

      // Step 2: If the phone number exists, proceed with OTP verification
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
      AsyncStorage.setItem('user', JSON.stringify(result.user));
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
      <Text style= {styles.heading}>Login</Text>
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

      <Mybutton title={"Login"} onPress={verifyOtp} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: width * 0.08, // Dynamic font size
    marginBottom: height * 0.02, // Margin relative to screen height
  },
  input: {
    fontSize: width * 0.045, // Dynamic font size
    height: height * 0.06, // 6% of screen height
    width: width * 0.9, // 90% of screen width
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: height * 0.015, // Dynamic margin
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
  disabled: {
    opacity: 0.5
  },
  otp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.03, // Dynamic margin
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
});
