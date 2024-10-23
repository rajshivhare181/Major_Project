import { View, Text, StyleSheet, TextInput, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import Mybutton from "@/components/myButton";

const register = () => {
    const router = useRouter();

  const onRegister = () => {
    router.navigate("/login");
  };

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userotp, setUserotp] = useState('');
  const [preference, setPrefernce] = useState({
    waterfall: false,
    mountain: false,
    beach: false
  });
  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text style= {styles.heading}>Register</Text>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="Enter Your Name"
        style={styles.input}
      />
      <TextInput
        value={userEmail}
        onChangeText={setUserEmail}
        placeholder="Enter Your Email"
        style={styles.input}
      />
      <View style={styles.otp}>
        <TextInput
          value={userNumber}
          onChangeText={setUserNumber}
          placeholder="Enter Your Phone No."
          style={styles.number}
          keyboardType="phone-pad"
        />
        <TouchableOpacity activeOpacity={0.7} style = {styles.button}>
          <Text style={styles.text}>Send</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.otp}>
        <TextInput
          value={userotp}
          onChangeText={setUserotp}
          placeholder="Enter Your OTP"
          style={styles.number}
          keyboardType="phone-pad"
        />
        <TouchableOpacity activeOpacity={0.7} style = {styles.button}>
          <Text style={styles.text}>Verify</Text>
        </TouchableOpacity>

      </View>
      <Text style= {styles.subheading}>Preference(Optional)</Text>
      <View>
        {/* <CheckBox preference={preference.waterfall} 
        onClick={() => setPrefernce({...preference, waterfall: !preference.waterfall})}
        rightText= "Waterfall"
        rightTextStyle={{fontsize:18, }}
        checkedCheckBoxColor= "blue"
        /> */}
      </View>
      
      <Mybutton title={"Register"} onPress={onRegister}/>
    </View>
  )
}

export default register

const styles = StyleSheet.create({
    heading: {
        fontWeight: "bold",
        fontSize: 30,
    },
    subheading: {
        fontWeight: "600",
        fontSize: 18,
        marginLeft: -170,
    },
    input: {
        fontSize: 18,
        height: 40,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black', 
        borderWidth: 2, 
        borderRadius: 10,
        marginVertical: 10,
        paddingLeft: 25,
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
        marginVertical: 10,
        paddingLeft: 20,
    },
    otp:{
      flexDirection : 'row',
      
    },
    button: {
      backgroundColor: "blue",
      width: 90,
      height: 40,
      borderRadius: 10,
      marginLeft: 5,
      marginVertical: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      color: "white",
      fontWeight: "bold",
    },
    
});