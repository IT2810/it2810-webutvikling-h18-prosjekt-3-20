import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  formContainer: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
  },
  textInput: {
    backgroundColor: Colors.tabIconDefault,
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    width: 250,
  },
  button: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 30,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
  },
});

export default class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  static propTypes = {
    onTodoAdd: PropTypes.func.isRequired,
  }

  changeTextHandler = (text) => {
    this.setState({ text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          New TODO
        </Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.changeTextHandler}
            value={this.state.text}
          />
          <Button
            buttonStyle={styles.button}
            underlayColor={Colors.tabIconDefault}
            title = {'Add'}
            onPress={() => {
              this.props.onTodoAdd({
                name: this.state.text,
                key: new Date().toString(),
              });
            }}
          />
        </View>
      </View>
    );
  }
}
