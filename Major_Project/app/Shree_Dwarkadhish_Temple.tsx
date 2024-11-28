import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {  Dimensions } from 'react-native';
import { router, Stack } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");
const imgHeight = height * 0.4;

const Shree_Dwarkadhish_Temple = () => {

  const [showFullText, setShowFullText] = useState(false);
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: interpolate(scrollOffset.value, [-imgHeight, 0, imgHeight], [-imgHeight /2, 0, imgHeight * 0.75] )},
            {
                scale: interpolate(
                    scrollOffset.value,[-imgHeight, 0, imgHeight], [2, 1, 1]
                )
            }
        ]
        }
    });
    const fullHistoryText = `History :The Shree Dwarkadhish Temple, located in Dwarka, Gujarat, is one of the Char Dham pilgrimage sites, dedicated to Lord Krishna. It is believed to have been originally built by Lord Krishna’s grandson, Vajranabh, around 5,000 years ago, though the current structure dates back to the 15th-16th centuries. The temple is situated on the banks of the Gulf of Khambhat and is an important spiritual and cultural center. The temple's architecture reflects traditional Hindu temple designs, with intricate carvings and a 52-meter tall spire. Pilgrims visit to pay homage to Lord Krishna, who is said to have established his kingdom here.`;
  
    const truncatedHistoryText = `${fullHistoryText.substring(0, 150)}...`;
    const time = new Date();
    const hour = time.getHours();
  return (
    <>
        <Stack.Screen options={{ 
            headerTransparent: true,
            headerTitle: "",
            headerLeft: () => {
                return (  // Add return here
                <TouchableOpacity 
                  onPress={() => router.back()} 
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: 10, padding: 4, marginLeft: width * 0.05 }}
                >
                  <View style={styles.nav_icon}>
                    <FontAwesome6 name='arrow-left-long' size={20} />
                  </View>
                </TouchableOpacity>
              );
            }
        }}/>
        <Animated.ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
            <Animated.Image source={require('@/assets/images/Shree_Dwarkadhish_Temple.png')} style={[styles.photo, imageAnimatedStyle]}/>
            <View style={styles.history}>
              <Text style={styles.text}>
                {showFullText ? fullHistoryText : truncatedHistoryText}
              </Text>

              <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                <Text style={styles.readMoreText}>
                  {showFullText ? "Show Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timing}>
                <Text style={styles.text}>Timing :6 AM to 9 pm</Text>
                { 6 <= hour && 21 >= hour ? 
                <Text style={styles.time}>Open</Text> :
                <Text style={styles.time1}>Close</Text>
                }
            </View>
            <View style={styles.ticket}>
                <Text style={styles.text}>Ticket :Free
               </Text>
                <TouchableOpacity activeOpacity={0.7} style = {styles.book}>
                    <Text style={styles.text}>Book</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.address}>
                <Text style={styles.text_address}>Address : Shree Dwarkadhish Temple
Dwarka,
Gujarat,
India - 361335.</Text>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
                      <Text style={styles.text}>View on map</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </Animated.ScrollView>
    </>
  )
}

export default Shree_Dwarkadhish_Temple

const styles = StyleSheet.create({
    photo: {
        width: width,
        height: imgHeight,
    },
    nav_icon: {
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 10,
    },
    history: {
      backgroundColor: "#FFE9D0",
      borderRadius: 20,
      marginVertical: height * 0.02, // Vertical margin
      width: width * 0.9, // 90% of the screen width
      alignSelf: "center", // Center horizontally
    },
    timing: {
      backgroundColor: "#ccf5ff",
      flexDirection: "row",
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.02,
      borderRadius: 20,
      marginVertical: height * 0.02, // Vertical margin
      width: width * 0.9, // 90% of the screen width
      alignSelf: "center", // Center horizontally
    },
    ticket: {
      backgroundColor: "#ffe6e6",
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.02,
      marginVertical: height * 0.02, // Vertical margin
      width: width * 0.9, // 90% of the screen width
      alignSelf: "center", // Center horizontally
    },
    address: {
      backgroundColor: "#FFE9D0",
      borderRadius: 20,
      marginVertical: height * 0.02, // Vertical margin
      width: width * 0.9, // 90% of the screen width
      alignSelf: "center", // Center horizontally
    },
    text: {
      fontSize: width * 0.04, // Text size based on screen width
      paddingVertical: height * 0.01, // Padding top relative to height
      paddingHorizontal: width * 0.02,
      alignSelf: "center",
    },
    time: {
      fontSize: width * 0.04, // Text size based on screen width
      paddingVertical: height * 0.01, // Padding top relative to height
      paddingHorizontal: width * 0.02,
      color: "green",
      alignSelf: "center",
    },
    time1: {
      fontSize: width * 0.04, // Text size based on screen width
      paddingVertical: height * 0.01, // Padding top relative to height
      paddingHorizontal: width * 0.02,
      color: "red",
      alignSelf: "center",
    },
    text_address: {
      fontSize: width * 0.04, // Text size based on screen width
      paddingVertical: height * 0.01, // Padding top relative to height
      paddingHorizontal: width * 0.04,
    //   alignSelf: "center",
    },
    book: {
      backgroundColor: "#8533ff",
      width: '30%', // 30% of the parent's width for the smaller button
      height: height * 0.05, // 6% of screen height
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: height * 0.01
    },
    buttonWrapper: {
        justifyContent: 'center',
        alignItems: 'center', // Horizontally center the button
      },
    btn: {
      backgroundColor: "#8533ff",
      width: '30%', // 30% of the parent's width for the smaller button
      height: height * 0.05, // 6% of screen height
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: height * 0.01
    },
    readMoreText: {
      fontSize: width * 0.04,
      color: '#0066cc', // Color for the Read More/Show Less button
      paddingBottom: height * 0.01,
      paddingHorizontal: width * 0.02,
      textDecorationLine: 'underline',
      // textAlign: 'center',
    }
})