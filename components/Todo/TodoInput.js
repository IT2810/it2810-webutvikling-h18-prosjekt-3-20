import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    paddingLeft: 10,
    width: 300,
    height: 40,
    backgroundColor: Colors.tabIconDefault,
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
  },
});

export default class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'useless placeholder' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          New TODO
        </Text>
        <TextInput
          style={styles.textInput}
          value={this.state.text}
        />
        <Button
          buttonStyle={styles.button}
          underlayColor={Colors.tabIconDefault}
          title = {'Add'}onPress={() => {}}/>
      </View>
    );
  }
}
