import { View, Text, StyleSheet, TextInput, Button, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import Mybutton from "@/components/myButton";

const { width, height } = Dimensions.get("window");
const register = () => {
    const router = useRouter();

  const onRegister = () => {
    router.back();
  };

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userotp, setUserotp] = useState('');
  const [preference, setPrefernce] = useState({
    waterfall: false,
    mountain: false,
    beach: false,
    other: false,
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
        <View style={styles.preferenceRow}>
          <TouchableOpacity onPress={() => setPrefernce({...preference, waterfall: !preference.waterfall})} style={styles.checkbox}>
            <View style={[styles.checkboxCircle, preference.waterfall && styles.checkboxChecked]} />
            <Text style={styles.checkboxText}>Waterfall</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPrefernce({...preference, beach: !preference.beach})} style={styles.checkbox}>
            <View style={[styles.checkboxCircle, preference.beach && styles.checkboxChecked]} />
            <Text style={styles.checkboxText}>Beach</Text>
           </TouchableOpacity>
        </View>
        <View style={styles.preferenceRow}>
          <TouchableOpacity onPress={() => setPrefernce({...preference, mountain: !preference.mountain})} style={styles.checkbox}>
            <View style={[styles.checkboxCircle, preference.mountain && styles.checkboxChecked]} />
           <Text style={styles.checkboxText}>Mountain</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPrefernce({...preference, other: !preference.other})} style={styles.checkbox}>
            <View style={[styles.checkboxCircle, preference.other && styles.checkboxChecked]} />
            <Text style={styles.checkboxText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Mybutton title={"Register"} onPress={onRegister}/>
      {/* <link href='/login'>If</link> */}
    </View>
  )
}

export default register

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: width * 0.08, // Dynamic font size
    marginBottom: height * 0.02, // Margin relative to screen height
},
subheading: {
    fontWeight: "600",
    fontSize: width * 0.045, // Dynamic font size
    alignSelf: "flex-start", // Align to start (left)
    marginLeft: width * 0.05, // 5% margin from left
    marginTop: height * 0.01,
},
input: {
    fontSize: width * 0.045, // Dynamic font size
    height: height * 0.06, // 6% of screen height
    width: width * 0.9, // 90% of screen width
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: height * 0.015, // Dynamic margin
    paddingLeft: width * 0.05, // 5% padding left
},
number: {
    fontSize: width * 0.045, // Dynamic font size
    height: height * 0.06, // 6% of screen height
    width: width * 0.65, // 65% of screen width
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: height * 0.015, // Dynamic margin
    paddingLeft: width * 0.05, // 5% padding left
},
otp: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: height * 0.02, // Space between OTP inputs
},
button: {
  backgroundColor: "blue",
  width: width * 0.25, // Button width is 25% of screen width
  height: height * 0.06, // Button height is 6% of screen height
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: width * 0.02, // 2% margin between number input and button
},
text: {
  fontSize: width * 0.04, // Dynamic font size
  color: "white",
  fontWeight: "bold",
},
preferenceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: width * 0.8, // 90% of screen width
  paddingVertical: height * 0.015, // Padding based on screen height
},
checkbox: {
  flexDirection: 'row',
  alignItems: 'center',
},
checkboxCircle: {
  height: width * 0.06, // Dynamic size for checkbox
  width: width * 0.06, // Dynamic size for checkbox
  borderRadius: (width * 0.06) / 2, // Circular checkbox
  borderColor: 'gray',
  borderWidth: 2,
  marginRight: width * 0.03, // Space between checkbox and text
},
checkboxChecked: {
  backgroundColor: 'blue',
},
checkboxText: {
  fontSize: width * 0.045, // Dynamic font size
},
});