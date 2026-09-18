import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Mybutton from "@/components/myButton";

import { auth } from "../firebase";

import {
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // ----------------------------------------------------
  // LOGIN
  // ----------------------------------------------------
  const handleLogin = async () => {
    const email = userEmail.trim().toLowerCase();

    if (!email) {
      Alert.alert("Required", "Please enter your email address.");
      return;
    }

    if (!password) {
      Alert.alert("Required", "Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // Firebase Email/Password Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // ------------------------------------------------
      // Check Email Verification
      // ------------------------------------------------

      // Refresh user information from Firebase
      await reload(user);

      const currentUser = auth.currentUser;

      if (!currentUser?.emailVerified) {
        setLoading(false);

        Alert.alert(
          "Email Not Verified",
          "Please verify your email before continuing.",
          [
            {
              text: "Verify Email",
              onPress: () => {
                router.replace({
                  pathname: "/verify-email",
                  params: {
                    email: email,
                  },
                });
              },
            },
            {
              text: "Cancel",
              style: "cancel",
              onPress: async () => {
                await signOut(auth);
              },
            },
          ]
        );

        return;
      }

      // ------------------------------------------------
      // Login Successful
      // ------------------------------------------------

      setLoading(false);

      router.replace("/");
    } catch (error: any) {
      console.log("Login Error:", error);

      setLoading(false);

      switch (error?.code) {
        case "auth/invalid-credential":
          Alert.alert(
            "Login Failed",
            "Incorrect email or password."
          );
          break;

        case "auth/wrong-password":
          Alert.alert(
            "Login Failed",
            "Incorrect password."
          );
          break;

        case "auth/user-not-found":
          Alert.alert(
            "Account Not Found",
            "No account exists with this email address."
          );
          break;

        case "auth/invalid-email":
          Alert.alert(
            "Invalid Email",
            "Please enter a valid email address."
          );
          break;

        case "auth/user-disabled":
          Alert.alert(
            "Account Disabled",
            "This account has been disabled."
          );
          break;

        case "auth/too-many-requests":
          Alert.alert(
            "Too Many Attempts",
            "Too many login attempts. Please try again later."
          );
          break;

        case "auth/network-request-failed":
          Alert.alert(
            "Network Error",
            "Please check your internet connection and try again."
          );
          break;

        default:
          Alert.alert(
            "Login Failed",
            error?.message ||
              "Something went wrong. Please try again."
          );
      }
    }
  };

  // ----------------------------------------------------
  // FORGOT PASSWORD
  // ----------------------------------------------------
  const handleForgotPassword = async () => {
    const email = userEmail.trim().toLowerCase();

    if (!email) {
      Alert.alert(
        "Email Required",
        "Please enter your email address first."
      );
      return;
    }

    try {
      setForgotLoading(true);

      await sendPasswordResetEmail(auth, email);

      setForgotLoading(false);

      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email and follow the password reset link to create a new password."
      );
    } catch (error: any) {
      console.log("Forgot Password Error:", error);

      setForgotLoading(false);

      switch (error?.code) {
        case "auth/user-not-found":
          Alert.alert(
            "Account Not Found",
            "No account exists with this email address."
          );
          break;

        case "auth/invalid-email":
          Alert.alert(
            "Invalid Email",
            "Please enter a valid email address."
          );
          break;

        case "auth/network-request-failed":
          Alert.alert(
            "Network Error",
            "Please check your internet connection and try again."
          );
          break;

        default:
          Alert.alert(
            "Error",
            error?.message ||
              "Unable to send password reset email."
          );
      }
    }
  };

  // ----------------------------------------------------
  // RESEND VERIFICATION EMAIL
  // ----------------------------------------------------
  const handleResendVerification = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        "Login Required",
        "Please login first."
      );
      return;
    }

    try {
      setResendLoading(true);

      await sendEmailVerification(user);

      setResendLoading(false);

      Alert.alert(
        "Verification Email Sent",
        "A new verification link has been sent to your email."
      );
    } catch (error: any) {
      console.log(
        "Resend Verification Error:",
        error
      );

      setResendLoading(false);

      if (error?.code === "auth/too-many-requests") {
        Alert.alert(
          "Please Wait",
          "Too many verification emails have been requested. Please try again later."
        );
      } else {
        Alert.alert(
          "Error",
          error?.message ||
            "Unable to send verification email."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      {/* EMAIL */}
      <TextInput
        value={userEmail}
        onChangeText={setUserEmail}
        placeholder="Enter Email"
        placeholderTextColor="#777"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* PASSWORD */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        placeholderTextColor="#777"
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* FORGOT PASSWORD */}
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={handleForgotPassword}
        disabled={forgotLoading}
      >
        {forgotLoading ? (
          <ActivityIndicator
            size="small"
            color="#007BFF"
          />
        ) : (
          <Text style={styles.forgotText}>
            Forgot Password?
          </Text>
        )}
      </TouchableOpacity>

      {/* LOGIN */}
      <Mybutton
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
      />

      {/* REGISTER */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text style={styles.registerLink}>
            Register
          </Text>
        </Text>
      </TouchableOpacity>

      {/* RESEND VERIFICATION */}
      <TouchableOpacity
        style={styles.resendVerificationButton}
        onPress={async () => {
          if (!auth.currentUser) {
            Alert.alert(
              "Login Required",
              "Please login first before requesting a verification email."
            );
            return;
          }

          await handleResendVerification();
        }}
        disabled={resendLoading}
      >
        {resendLoading ? (
          <ActivityIndicator
            size="small"
            color="#007BFF"
          />
        ) : (
          <Text style={styles.resendVerificationText}>
            Resend Verification Email
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;

// ====================================================
// STYLES
// ====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },

  heading: {
    fontWeight: "bold",
    fontSize: width * 0.08,
    marginBottom: height * 0.03,
  },

  input: {
    fontSize: width * 0.045,
    height: height * 0.06,
    width: width * 0.9,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: height * 0.01,
    paddingLeft: width * 0.05,
    color: "black",
  },

  forgotButton: {
    width: width * 0.9,
    alignItems: "flex-end",
    marginTop: height * 0.005,
    marginBottom: height * 0.02,
  },

  forgotText: {
    color: "#007BFF",
    fontSize: 15,
    textDecorationLine: "underline",
  },

  registerButton: {
    marginTop: height * 0.025,
  },

  registerText: {
    fontSize: 15,
    color: "#555",
  },

  registerLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },

  resendVerificationButton: {
    marginTop: height * 0.02,
    padding: 8,
  },

  resendVerificationText: {
    color: "#007BFF",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});