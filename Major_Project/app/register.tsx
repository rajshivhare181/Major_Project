import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import Mybutton from "../components/myButton";
import { useFocusEffect } from "@react-navigation/native";

import { auth, db } from "../firebase";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [ispreference, setIspreference] = useState(false);
  const [preferenceValue, setPreferenceValue] = useState("");

  // Reset form whenever registration screen gets focus
  useFocusEffect(
    useCallback(() => {
      setUserName("");
      setUserEmail("");
      setUserNumber("");
      setPassword("");
      setConfirmPassword("");
      setIspreference(false);
      setPreferenceValue("");
      setLoading(false);
    }, [])
  );

  // ----------------------------------------------------
  // REGISTER USER
  // ----------------------------------------------------
  const handleRegister = async () => {
    Keyboard.dismiss();

    const name = userName.trim();
    const email = userEmail.trim().toLowerCase();
    const phone = userNumber.trim();

    // Basic validation
    if (!name) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    if (!email) {
      Alert.alert("Required", "Please enter your email address.");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!phone) {
      Alert.alert("Required", "Please enter your phone number.");
      return;
    }

    if (!password) {
      Alert.alert("Required", "Please enter a password.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Required", "Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // ------------------------------------------------
      // Check whether phone number already exists
      // ------------------------------------------------
      const usersRef = collection(db, "users");

      const phoneQuery = query(
        usersRef,
        where("phone", "==", phone)
      );

      const phoneSnapshot = await getDocs(phoneQuery);

      if (!phoneSnapshot.empty) {
        Alert.alert(
          "Phone Number Already Registered",
          "This phone number is already associated with an account."
        );

        setLoading(false);
        return;
      }

      // ------------------------------------------------
      // Create Firebase Email/Password account
      // ------------------------------------------------
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // ------------------------------------------------
      // Send Firebase Email Verification
      // ------------------------------------------------
      await sendEmailVerification(user);

      // ------------------------------------------------
      // Save user profile in Firestore
      // ------------------------------------------------
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        phone: phone,
        preferences: preferenceValue,
      });

      // ------------------------------------------------
      // Save basic user information locally
      // ------------------------------------------------
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          name: name,
          email: email,
          phone: phone,
          emailVerified: false,
        })
      );

      setLoading(false);

      // ------------------------------------------------
      // Go to email verification screen
      // ------------------------------------------------
      router.replace({
        pathname: "/verify-email",
        params: {
          email: email,
        },
      });
    } catch (error: any) {
      console.log("Registration Error:", error);

      setLoading(false);

      // Firebase error handling
      switch (error?.code) {
        case "auth/email-already-in-use":
          Alert.alert(
            "Email Already Registered",
            "An account already exists with this email address."
          );
          break;

        case "auth/invalid-email":
          Alert.alert(
            "Invalid Email",
            "Please enter a valid email address."
          );
          break;

        case "auth/weak-password":
          Alert.alert(
            "Weak Password",
            "Please choose a stronger password."
          );
          break;

        case "auth/network-request-failed":
          Alert.alert(
            "Network Error",
            "Please check your internet connection and try again."
          );
          break;

        case "auth/operation-not-allowed":
          Alert.alert(
            "Authentication Error",
            "Email/Password authentication is not enabled in Firebase."
          );
          break;

        default:
          Alert.alert(
            "Registration Failed",
            error?.message || "Something went wrong. Please try again."
          );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Create Account</Text>

          {/* NAME */}
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#777"
            value={userName}
            onChangeText={setUserName}
            autoCapitalize="words"
          />

          {/* EMAIL */}
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#777"
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* PHONE NUMBER */}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={userNumber}
            onChangeText={setUserNumber}
            maxLength={15}
          />

          {/* PASSWORD */}
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#777"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* CONFIRM PASSWORD */}
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#777"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* PREFERENCE */}
          <View style={styles.preference}>
            <Text style={styles.preferenceText}>
              Do you want to select your preference?
            </Text>

            <Switch
              value={ispreference}
              onValueChange={(value) => {
                setIspreference(value);

                if (!value) {
                  setPreferenceValue("");
                }
              }}
            />
          </View>

          {/* PREFERENCE DROPDOWN */}
          {ispreference && (
            <View style={styles.dropdown}>
              <RNPickerSelect
                onValueChange={(value) => setPreferenceValue(value)}
                value={preferenceValue}
                placeholder={{
                  label: "Select your preference",
                  value: "",
                }}
                items={[
                  {
                    label: "Historical Places",
                    value: "Historical Places",
                  },
                  {
                    label: "Natural Places",
                    value: "Natural Places",
                  },
                  {
                    label: "Religious Places",
                    value: "Religious Places",
                  },
                  {
                    label: "Adventure Places",
                    value: "Adventure Places",
                  },
                  {
                    label: "All",
                    value: "All",
                  },
                ]}
                style={pickerSelectStyles}
              />
            </View>
          )}

          {/* REGISTER BUTTON */}
          <View style={styles.buttonContainer}>
            <Mybutton
              title={loading ? "Registering..." : "Register"}
              onPress={handleRegister}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

// ====================================================
// STYLES
// ====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 35,
    paddingBottom: 50,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#222",
  },

  input: {
    width: "90%",
    height: 52,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#fff",
  },

  preference: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },

  preferenceText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },

  dropdown: {
    width: "90%",
    height: 52,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
  },

  buttonContainer: {
    width: "90%",
    marginTop: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#222",
  },

  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: "#222",
  },
});