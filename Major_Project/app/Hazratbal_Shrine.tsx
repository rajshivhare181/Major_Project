import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';
import {  Dimensions } from 'react-native';
import { router, Stack } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");
const imgHeight = height * 0.4;

const Hazratbal_Shrine = () => {

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
    const openGoogleMaps = () => {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=26.231325,78.169496`;
      Linking.openURL(googleMapsUrl).catch(err => console.error("An error occurred", err));
    };
    const fullHistoryText = `Hazratbal Shrine, also known as Hazratbal Shrine Mosque, holds significant religious importance for Muslims in Kashmir. It is dedicated to Hazratbal, which means "Holy Place," and it is most famous for housing a relic believed by many to be a hair strand of the Prophet Muhammad (PBUH), known as "Moi-e-Muqqadas."
The shrine was originally built in the 17th century by the Mughal Emperor Shah Jahan's governor, Sadiq Khan, and was later renovated in the 19th century. The relic was brought to the shrine in 1699 and has remained an object of deep veneration and reverence. The shrine has been a center of spiritual and religious activity for centuries, attracting large numbers of pilgrims, especially during special occasions such as the Shab-e-Meraj and Eid festivals.`;
  
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
            <Animated.Image source={require('@/assets/images/Hazratbal_Shrine.png')} style={[styles.photo, imageAnimatedStyle]}/>
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
                <Text style={styles.text}>Timing :9 AM to 5 PM</Text>
                { 9 <= hour && 16 >= hour ? 
                <Text style={styles.time}>Open</Text> :
                <Text style={styles.time1}>Close</Text>
                }
            </View>
            <View style={styles.ticket}>
                <Text style={styles.text}>Ticket :no entry fee </Text>
                <TouchableOpacity activeOpacity={0.7} style = {styles.book}>
                    <Text style={styles.text}>Book</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.address}>
                <Text style={styles.text_address}>Address :Hazratbal Shrine, Srinagar, Jammu & Kashmir, 190006, India.</Text>
                <View style={styles.buttonWrapper}>
                <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={openGoogleMaps}>
                      <Text style={styles.text}>Show on map</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </Animated.ScrollView>
    </>
  )
}

export default Hazratbal_Shrine

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
      // width: '30%', // 30% of the parent's width for the smaller button
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