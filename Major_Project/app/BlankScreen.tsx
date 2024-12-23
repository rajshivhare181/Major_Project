import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path based on your file structure

const BlankScreen = () => {
  const [uid, setUid] = useState<string>(""); // State to hold UID input
  const [userData, setUserData] = useState<{ dname?: string; latitude?: number; longitude?: number; name?: string; type?: string } | null>(null); // State to hold fetched data
  const [loading, setLoading] = useState(false); // State for loading spinner

  // Function to fetch user data by UID
  const fetchUserData = async (uid: string) => {
    try {
      setLoading(true); // Show loading spinner
      const userDoc = await getDoc(doc(db, "Gujrat", uid)); // Fetch user document from Firestore
      if (userDoc.exists()) {
        const data = userDoc.data(); // Extract user data
        console.log("Fetched User Data:", data); // Log fetched data
        setUserData(data); // Set user data to state
      } else {
        console.log("No user found with the provided UID.");
        Alert.alert("Error", "No user found with the provided UID.");
        setUserData(null); // Clear user data state
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleFetchUser = () => {
    if (!uid.trim()) {
      Alert.alert("Error", "Please enter a UID.");
      return;
    }
    fetchUserData(uid); // Call fetch function with input UID
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fetch User Data</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UID"
        value={uid}
        onChangeText={setUid}
      />
      <Button title="Fetch Data" onPress={handleFetchUser} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
      ) : userData ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Name: {userData.name || "N/A"}</Text>
          <Text style={styles.dataText}>Email: {userData.dname || "N/A"}</Text>
          <Text style={styles.dataText}>Phone: {userData.type || "N/A"}</Text>
          <Text style={styles.dataText}>Phone: {userData.latitude || "N/A"}</Text>
          <Text style={styles.dataText}>Phone: {userData.longitude || "N/A"}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default BlankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dataContainer: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  dataText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
