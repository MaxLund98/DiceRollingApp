import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, CheckBox } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";

export default function App() {
  const [numDice, changeNumDice] = React.useState(0);
  const [numSides, changeNumSides] = React.useState(0);
  const [results, changeResults] = React.useState([]);
  const [totalVal, changeTotalVal] = React.useState(0);
  const [addMod, changeMod] = React.useState(0);
  const [rerollVal, changeRerollVal] = React.useState(0);
  const [rerollSelected, changeReroll] = React.useState(false);
  const [dropSelected, changeDrop] = React.useState(false);
  let dropMinFound = false;

  console.log(rerollSelected);
  console.log(dropSelected);

  function rollDice() {
    const results = [];
    let totalVal = 0;
    let dropVal = 0;
    for (let i = 0; i < numDice; i++) {
      let result = parseInt(Math.random()*numSides, 10) + 1;
      if (rerollSelected) {
        while (result === parseInt(rerollVal)) {
          result = parseInt(Math.random()*numSides, 10) + 1;
        }
      }
      totalVal = totalVal + result;
      results.push(result);
    }
    dropVal = Math.min(...results);
    if (dropSelected) {
      totalVal= totalVal-dropVal;
    }
    changeResults(results);
    changeTotalVal(totalVal+parseInt(addMod));
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
        <Text style={styles.title}> + </Text>
        <TextInput
          keyboardType = 'numeric'
          onChangeText = {(addTx)=> changeMod(addTx)}
          style={styles.textInput} />
      </View>
      <TouchableOpacity
        style={styles.rollButton}
        onPress = {rollDice}
      >
      <Text style={styles.buttonText}>Roll</Text>
      </TouchableOpacity>
      <View style={styles.textBoxView}>
      <CheckBox
        checkedIcon = 'dot-circle-o'
        uncheckedIcon = 'circle-o'
        checkedColor='black'
        value={rerollSelected}
        title='Select value to reroll:'
        onChange={()=> changeReroll(!rerollSelected)}
      />
      <Text style={styles.label}>Select value to reroll:</Text>
      {rerollSelected &&
      <TextInput
      keyboardType = 'numeric'
      onChangeText = {(rrTx)=> changeRerollVal(rrTx)}
      style={styles.textInput} />
      }
      </View>
      <View style={styles.textBoxView}>
       <CheckBox
        checkedIcon = 'dot-circle-o'
        uncheckedIcon = 'circle-o'
        checkedColor='black'
        value={dropSelected}
        title='Drop lowest value'
        onChange={()=> changeDrop(!dropSelected)}
      />
      <Text style={styles.label}>Drop lowest value</Text>
      </View>
      {dropSelected ? (
      <View>
        {results.map((number) => (
          <View>
            {!dropMinFound && number === Math.min(...results) ? (
              <View>
              <Text style={styles.drop}>{number}</Text>
              {dropMinFound = true}
              </View>
            ) :
            (
              <Text style={styles.title}>{number}</Text>
            )
            }
          </View>
        ))}
      </View>
      ) : (
        <View>
        {results.map((number) => (
          <Text style={styles.title}>{number}</Text>
        ))}
        </View>
      )
      }
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
  drop: {
    fontSize: 30,
    fontWeight: "italic",
    marginTop: 25,
    color: "red",
  },
  label: {
    fontSize: 16,
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
