import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import DrawerScreenAnimation from '@/components/drawerScreenAnimation';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");

const about = () => {
  const router = useRouter();
  type NavigationProps = DrawerNavigationProp<any, any>;
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={{ flex: 1, backgroundColor: "#FFE9D0" }}>
      <DrawerScreenAnimation>
        <View style={styles.stack}>
          <TouchableOpacity 
            onPress={() => navigation.openDrawer()} 
            style={{ paddingTop: height * 0.018, marginLeft: width * 0.05, marginRight: width * 0.02 }}
          >
            <Entypo name='menu' size={26} />
          </TouchableOpacity>
          <Text style={{ color: 'black', paddingTop: height * 0.018, fontSize: width * 0.05, fontWeight: 'bold'}}>About</Text>
        </View>
        <View style={{ backgroundColor: '#F3F1F1', height: height }}>
          <ScrollView showsVerticalScrollIndicator={false} 
            style={{ backgroundColor: '#F3F1F1'}}
          >
            <View style={styles.container}>
              <Text style={styles.heading}>About Us</Text>
              <Text style={styles.text}>We're passionate about making travel experience seamless, exciting, and unforgettable.
              </Text>
              <Text style={styles.text}>Our app is designed to help you plan, book, and enjoy every step of your journey accommodations to local activities and experience. Whether you're a seasoed globetrotter or embarking on your first adventure, we're here to provide the tools and insights to make every trip easier and more enjoyable.</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.heading}>Our Mission</Text>
              <Text style={styles.text}>Our goal is to simplify the travel process for everyone. We believe that travel should be stress-free, empowering, and full of opportunities to explore new places, cultures, and experiences. By offering a user-friendly platform that connects you to the best travel deals, personalized itineraries, and exclusive recommendations. Our aim to inspire you to travel more and discover the world at your own pace.</Text>
            </View>
          </ScrollView>
        </View>
      </DrawerScreenAnimation>
    </View>
  )
}

export default about

const styles = StyleSheet.create({
  stack: {
    height: height * 0.07,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  container: {
    marginVertical: height * 0.03,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: width * 0.07,
  },
  text: {
    fontSize: width * 0.05,
    // paddingLeft: width * 0.02,
    textAlign: "center",
  }
})