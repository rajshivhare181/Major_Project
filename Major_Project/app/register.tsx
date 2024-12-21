import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "expo-router";
import Mybutton from "@/components/myButton";
import PhoneInput from 'react-native-phone-number-input';
import { auth, app } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getApps } from 'firebase/app';

const { width, height } = Dimensions.get("window");
const register: React.FC = () => {
    const router = useRouter();

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


  const requestOTP = async (): Promise<void> => {
    if (!recaptchaVerifier.current) {
      console.log('Error', 'Recaptcha verifier is not ready. Please try again.');
      return;
    }

    // console.log(userNumber);
    try {
      setLoading(true); // Show loading indicator
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        userNumber,
        recaptchaVerifier.current as any
      );
      setVerificationId(verificationId);
      Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
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
      console.log('User signed in:', result.user);
      Alert.alert('Success', 'Phone number verified successfully!');
      // You can redirect the user to the next screen here
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState<string>('');
  const [userotp, setUserotp] = useState('');
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [preference, setPrefernce] = useState({
    waterfall: false,
    mountain: false,
    beach: false,
    other: false,
  });
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
      <PhoneInput
          ref={phoneInput}
          defaultValue={userNumber}
          defaultCode="IN"
          layout="first"
          placeholder='User Number'
          onChangeFormattedText={setUserNumber}
          containerStyle={styles.number}
          textContainerStyle={styles.phoneInputText}
        />
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={requestOTP}>
            {loading ? (
              <ActivityIndicator size='small' color='white' />
            ) : (
              <Text style={styles.text}>Send</Text>
            )}
          </TouchableOpacity>
      </View>

      {verificationId && (
        <>
          <TextInput
            value={userotp}
            onChangeText={setUserotp}
            placeholder="Enter Your OTP"
            style={styles.input}
            keyboardType="phone-pad"
          />
        </>
      )}

      <Text style= {styles.subheading}>Preference(Optional)</Text>
      <View>
        <View style={styles.preferenceRow}>
          <TouchableOpacity onPress={() => setPrefernce({...preference, waterfall: !preference.waterfall})} style={styles.checkbox}>
            <View style={[styles.checkboxCircle, preference.waterfall && styles.checkboxChecked]} />
            <Text style={styles.checkboxText}>Waterfall</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPrefernce({...preference, beach: !preference.beach})} style={styles.checkbox}>
            <View style={[styles.checkboxCircle, preference.beach && styles.checkboxChecked]} />
            <Text style={styles.checkboxText}>Beach</Text>
           </TouchableOpacity>
        </View>
        <View style={styles.preferenceRow}>
          <TouchableOpacity onPress={() => setPrefernce({...preference, mountain: !preference.mountain})} style={styles.checkbox}>
            <View style={[styles.checkboxCircle, preference.mountain && styles.checkboxChecked]} />
           <Text style={styles.checkboxText}>Mountain</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPrefernce({...preference, other: !preference.other})} style={styles.checkbox}>
            <View style={[styles.checkboxCircle, preference.other && styles.checkboxChecked]} />
            <Text style={styles.checkboxText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
      
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
    alignSelf: "flex-start", // Align to start (left)
    marginLeft: width * 0.05, // 5% margin from left
    marginTop: height * 0.01,
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
    width: width * 0.70, // 65% of screen width
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: width * 0.05, // 5% padding left
},
otp: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: height * 0.01, // Dynamic margin
},
phoneInputText: {
  paddingVertical: 0,
  paddingLeft: width * 0.05,
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
});