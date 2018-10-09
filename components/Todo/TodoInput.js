import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Colors from '../../constants/Colors';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',

    marginLeft: '5%',
    marginRight: '5%',
    width: 'auto',
    paddingTop: 10,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '5%',
    marginRight: '5%',
    width: 'auto',
  },
  textInput: {
    backgroundColor: Colors.tabIconDefault,
    paddingLeft: 10,
    paddingRight: 10,
    height: 35,
    width: 250,
  },
  header: {

  },
  button: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 35,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
  },
  spacer: {
    width: 30,
    height: 30,
  },
});

export default class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      date: null,
    };
  }

  static propTypes = {
    onTodoAdd: PropTypes.func.isRequired,
  };

  changeTextHandler = (text) => {
    this.setState({ text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          New TODO
        </Text>
        <View style={styles.dateContainer}>
          <DatePicker
            mode='date'
            placeholder={this.state.date ? this.state.date.toString() : 'select date'}
            format='YYYY-MM-DD'
            minDate='2000-01-01'
            maxDate='2050-12-31'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            showIcon={true}
            onDateChange={(date) => {
              this.setState({ date });
            }}
          />
          <View style={styles.spacer}/>
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.changeTextHandler}
            value={this.state.text}
          />
          <Button
            buttonStyle={styles.button}
            underlayColor={Colors.tabIconDefault}
            title={'Add'}
            onPress={() => {
              this.props.onTodoAdd({
                name: this.state.text,
                date: this.state.date,
              });
            }}
          />
        </View>
      </View>
    );
  }
}
