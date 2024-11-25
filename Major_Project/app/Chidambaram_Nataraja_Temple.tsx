import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {  Dimensions } from 'react-native';
import { router, Stack } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");
const imgHeight = height * 0.4;

const Chidambaram_Nataraja_Temple = () => {

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
    const fullHistoryText = ` The Chidambaram Nataraja Temple, located in Chidambaram, Tamil Nadu, is one of the oldest and most revered temples dedicated to Lord Shiva in his Nataraja (Lord of Dance) form. The temple's origins date back to the 2nd century BCE, with significant contributions from the Chola dynasty during the 10th to 13th centuries. The temple is unique for its cosmic dance depiction of Shiva and its association with the five elements, representing space (akasha). It is a key pilgrimage site and is considered one of the Pancha Bhuta Stalas (temples dedicated to the five elements).`;
  
    const truncatedHistoryText = `${fullHistoryText.substring(0, 150)}...`;
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
            <Animated.Image source={require('@/assets/images/Chidambaram_Nataraja_Temple.png')} style={[styles.photo, imageAnimatedStyle]}/>
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
                <Text style={styles.text}>Timing :6:00 AM to 12:00 PM</Text>
                <Text style={styles.text}>Open</Text>
            </View>
            <View style={styles.ticket}>
                <Text style={styles.text}>Ticket :no entry fee</Text>
                <TouchableOpacity activeOpacity={0.7} style = {styles.book}>
                    <Text style={styles.text}>Book</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.address}>
                <Text style={styles.text_address}>Address :Chidambaram Nataraja Temple, Chidambaram, Tamil Nadu, India.</Text>
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

export default Chidambaram_Nataraja_Temple

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