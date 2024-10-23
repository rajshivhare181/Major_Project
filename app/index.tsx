// import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import {  Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  const onRegister = () => {
    router.navigate("/register");
  };
  const onLogin = () => {
    router.navigate("/login");
  };

  const [state, setState] = useState('');

  return (
    <View style={{backgroundColor: "#ccf5ff"}}>
      <View style={styles.main}>
        <TouchableOpacity activeOpacity={0.7} style = {styles.button} onPress={onRegister}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style = {styles.button} onPress={onLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <TextInput
          value={state}
          onChangeText={setState}
          placeholder="Enter Your State"
          style={styles.number}
        />
        <TouchableOpacity activeOpacity={0.7} style = {styles.btn}>
          <Text style={styles.text}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lang}>
        <Text style={styles.name}>Aao Mahare Desh</Text>
        <Text style={styles.name}>आओ हमारे देश</Text>
        <Text style={styles.name}>आवो म्हारे देश</Text>
      </View>
      {/* <BlurView intensity={100} tint="systemChromeMaterialLight" style={styles.blurview}>
        <Text style={{fontWeight: "bold", fontSize: 40,}}>Tourist Place 1</Text>
      </BlurView>
      <BlurView intensity={100} tint="systemChromeMaterialLight" style={styles.blurview}>
        <Text style={{fontWeight: "bold", fontSize: 40,}}>Tourist Place 2</Text>
      </BlurView>
      <BlurView intensity={100} tint="systemChromeMaterialLight" style={styles.blurview}>
        <Text style={{fontWeight: "bold", fontSize: 40,}}>Tourist Place 3</Text>
      </BlurView>
      <BlurView intensity={100} tint="systemChromeMaterialLight" style={styles.blurview}>
        <Text style={{fontWeight: "bold", fontSize: 40,}}>Tourist Place 4</Text>
      </BlurView>
      <BlurView intensity={100} tint="systemChromeMaterialLight" style={styles.blurview}>
        <Text style={{fontWeight: "bold", fontSize: 40,}}>Tourist Place 5</Text>
      </BlurView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: 'space-between', // Distribute buttons evenly
    paddingHorizontal: width * 0.05, // 5% padding on left and right
    marginVertical: height * 0.02, // Vertical margin based on screen height
  },
  lang: {
    backgroundColor: "#E9CE47",
    borderRadius: 20,
    // padding: height * 0.00, // Padding relative to screen height
    marginVertical: height * 0.02, // Vertical margin
    width: width * 0.9, // 90% of the screen width
    alignSelf: "center", // Center horizontally
  },
  button: {
    backgroundColor: "#8533ff",
    width: '48%', // Takes 48% of the parent's width
    height: height * 0.06, // 6% of screen height for button height       #ccf5ff bgcolor    #8533ff button   #FFE9D0 nav
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#8533ff",
    width: '30%', // 30% of the parent's width for the smaller button
    height: height * 0.06, // 6% of screen height
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: width * 0.04, // Font size relative to screen width
    color: "white",
    fontWeight: "bold",
  },
  number: {
    fontSize: width * 0.045, // Font size relative to screen width
    height: height * 0.06, // 6% of screen height for input box
    width: '65%', // Input width is 65% of its parent container
    borderColor: 'black', 
    borderWidth: 2, 
    borderRadius: 10,
    paddingLeft: width * 0.05, // Padding left relative to screen width
    backgroundColor: "white",
  },
  name: {
    fontSize: width * 0.075, // Text size based on screen width
    fontWeight: "bold",
    textAlign: "center", // Center the text
    paddingTop: height * 0.01, // Padding top relative to height
  },
  // blurview: {
  //   padding: 20,
  //   marginTop: 15,
  //   marginHorizontal: 15,
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   overflow: 'hidden',
  //   borderRadius: 20,
  // },
});
