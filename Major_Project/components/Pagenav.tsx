import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");

const Pagenav = () => {
const router = useRouter();
  return (
    <View style={styles.stack}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: 10, padding: 4, marginLeft: width * 0.05 }}
        >
            <View style={styles.nav_icon}>
            <FontAwesome6 name='arrow-left-long' size={20} />
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default Pagenav

const styles = StyleSheet.create({
    stack: {
        position: "absolute",
        top: 10,
        width: "15%",
        zIndex: 10,
    },
    nav_icon: {
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 10,
    },
})