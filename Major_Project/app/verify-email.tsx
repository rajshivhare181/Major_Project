import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import {
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

const VerifyEmail = () => {
  const router = useRouter();

  const params = useLocalSearchParams();
  const email = params.email as string;

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // ----------------------------------------------------
  // Check whether user is logged in
  // ----------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });

    return unsubscribe;
  }, []);

  // ----------------------------------------------------
  // Resend verification email
  // ----------------------------------------------------
  const handleResendEmail = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        "Session Expired",
        "Please register or login again."
      );
      router.replace("/login");
      return;
    }

    try {
      setResending(true);

      await sendEmailVerification(user);

      Alert.alert(
        "Email Sent",
        "A new verification link has been sent to your email address."
      );
    } catch (error: any) {
      console.log("Resend Verification Error:", error);

      if (error?.code === "auth/too-many-requests") {
        Alert.alert(
          "Please Wait",
          "Too many verification emails have been requested. Please try again later."
        );
      } else {
        Alert.alert(
          "Error",
          error?.message ||
            "Unable to send verification email. Please try again."
        );
      }
    } finally {
      setResending(false);
    }
  };

  // ----------------------------------------------------
  // Check email verification status
  // ----------------------------------------------------
  const handleCheckVerification = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        "Session Expired",
        "Please login again."
      );
      router.replace("/login");
      return;
    }

    try {
      setLoading(true);

      // Refresh Firebase user information
      await reload(user);

      // Get updated user
      const updatedUser = auth.currentUser;

      if (updatedUser?.emailVerified) {
        Alert.alert(
          "Email Verified",
          "Your email has been successfully verified.",
          [
            {
              text: "Continue",
              onPress: () => router.replace("/"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Not Verified",
          "Your email is not verified yet. Please open the verification email and click the verification link."
        );
      }
    } catch (error: any) {
      console.log("Verification Check Error:", error);

      Alert.alert(
        "Error",
        error?.message ||
          "Unable to check verification status. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // Logout
  // ----------------------------------------------------
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error: any) {
      Alert.alert(
        "Error",
        "Unable to logout. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>📧</Text>

        <Text style={styles.heading}>
          Verify Your Email
        </Text>

        <Text style={styles.description}>
          We have sent a verification link to:
        </Text>

        <Text style={styles.email}>
          {email || auth.currentUser?.email}
        </Text>

        <Text style={styles.description}>
          Please open your email and click on the verification
          link to verify your account.
        </Text>

        {/* Check Verification */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleCheckVerification}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>
              I Have Verified My Email
            </Text>
          )}
        </TouchableOpacity>

        {/* Resend Email */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleResendEmail}
          disabled={resending}
        >
          {resending ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.secondaryButtonText}>
              Resend Verification Email
            </Text>
          )}
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyEmail;

// ====================================================
// STYLES
// ====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    alignItems: "center",
    padding: 25,
  },

  icon: {
    fontSize: 60,
    marginBottom: 15,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 10,
  },

  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
    textAlign: "center",
  },

  primaryButton: {
    width: "100%",
    minHeight: 52,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 15,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  secondaryButton: {
    width: "100%",
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 15,
  },

  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  logoutButton: {
    marginTop: 25,
    padding: 10,
  },

  logoutText: {
    color: "#777",
    fontSize: 15,
  },
});