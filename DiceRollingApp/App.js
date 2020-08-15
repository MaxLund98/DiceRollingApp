import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
export default function App() {
  const [numDice, changeNumDice] = React.useState(0);
  const [numSides, changeNumSides] = React.useState(0);
  const [results, changeResults] = React.useState([]);
  const [totalVal, changeTotalVal] = React.useState(0);

  console.log(numDice);
  console.log(numSides);

  function rollDice() {
    const results = [];
    let totalVal = 0;
    for (let i = 0; i < numDice; i++) {
      const result = parseInt(Math.random()*numSides, 10) + 1;
      totalVal = totalVal + result;
      results.push(result);
    }
    changeResults(results);
    changeTotalVal(totalVal);
    console.log(results);
    console.log(totalVal);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle = {styles.container}>
      <Text style={styles.title}>Max's Dice App</Text>
      <FontAwesome5 name="dice-d20" size={75} color={"white"} />
      <View style={styles.textBoxView}> 
      <TextInput
      keyboardType = 'numeric' 
      onChangeText = {(tu)=> changeNumDice(tu)} 
      style={styles.textInput} />
      <Text style={styles.title}>d</Text>
      <TextInput
      keyboardType = 'numeric' 
      onChangeText = {(tx)=> changeNumSides(tx)}
      style={styles.textInput} />
      <StatusBar style="auto" /> 
      </View>
      <TouchableOpacity
      style={styles.rollButton}
      onPress = {rollDice}
      >
      <Text style={styles.buttonText}>Roll</Text>
      </TouchableOpacity>
      {results.map((number) => (
        <Text style={styles.title}>{number}</Text>
      ))}
      {totalVal > 0 && 
        <Text style={styles.title}>Total: {totalVal}</Text>
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a6868',
    alignItems: 'center',
  },
  scrollViewContainer: {
    paddingTop: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25,
    color: "white",
  },
  textInput: {
    fontSize: 16,
    width: "22%",
    backgroundColor: "white",
    color: "black",
    marginRight: 15,
    marginLeft: 15,
  },
  textBoxView: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  rollButton: {
    backgroundColor: 'white',
    width: "20%",
    marginTop: 30,
    alignItems: 'center'
  },
  buttonText: {
    color: "black",
  }
});
