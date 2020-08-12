import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Max's Dice App</Text>
      <FontAwesome5 name="dice-d20" size={75} color={"white"} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a6868',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25,
    color: "white",
  }
});
