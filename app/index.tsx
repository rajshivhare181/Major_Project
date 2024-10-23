// import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";

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
    <View style={{backgroundColor: "#4CD9E4"}}>
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
          <Text style={styles.text}>Verify</Text>
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
  },
  lang: {
    backgroundColor: "#E9CE47",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "blue",
    width: 180,
    height: 40,
    borderRadius: 10,
    marginLeft: 8,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "blue",
    width: 100,
    height: 40,
    borderRadius: 10,
    marginLeft: 8,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  number: {
    fontSize: 18,
    height: 40,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black', 
    borderWidth: 2, 
    borderRadius: 10,
    marginVertical: 5,
    paddingLeft: 20,
    marginLeft: 10,
    backgroundColor: "white",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 60,
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
