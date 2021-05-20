import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');


  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false)
  };

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredValue);
    if(isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99){
      Alert.alert("Invalid Number" , 'Number has to be a number between 1 and 99.',
                 [{text : "Okay" , style :"destructive" , onPress :resetInputHandler}])
      return ;
    }

    setSelectedValue(choosenNumber)
    setEnteredValue('');
    setConfirmed(true);
    Keyboard.dismiss()
  }

  let confirmedOutput ;

  if(confirmed){
    confirmedOutput = <Card style={styles.summaryContainer}>
                              <Text>You selected</Text>
                              <NumberContainer>{selectedValue}</NumberContainer>
                              <MainButton onPress={() => props.onStartGame(selectedValue)}>Start The Game</MainButton>
                      </Card> ;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text style={DefaultStyles.textBody}>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily : 'open-sans-bold'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer : {
    marginTop: 20,
    alignItems:"center"
  }
});

export default StartGameScreen;
