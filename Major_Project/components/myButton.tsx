import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const MyButton = ({title, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style = {styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#8533ff",
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});