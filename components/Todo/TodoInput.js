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
import { getLocation } from '../../utils/geolocation';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // marginTop: '1%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'auto',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  dateContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
  },
  textInput: {
    backgroundColor: Colors.tabIconDefault,
    paddingLeft: 10,
    // paddingRight: 10,
    height: 35,
    width: 208,
  },
  header: {
    fontSize: 20,
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
});

export default class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      // Get today at YYYY-MM-DD format
      date: new Date().toISOString().slice(0, 10),
    };
  }

  static propTypes = {
    onTodoAdd: PropTypes.func.isRequired,
  };

  changeTextHandler = (text) => {
    this.setState({ text });
  };

  changeSelectedDate = (date) => {
    this.setState({ date });
  };

  createTodo = () => {
    getLocation().then((coordinates) => {
      this.props.onTodoAdd({
        coordinates: {
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        },
        name: this.state.text,
        date: this.state.date,
        completed: false,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>New TODO</Text>
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
            onDateChange={this.changeSelectedDate}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: 250 }}
          />        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.changeTextHandler}
            onSubmitEditing={this.createTodo}
            returnKeyType="done"
            value={this.state.text}
          />
          <Button
            buttonStyle={styles.button}
            underlayColor={Colors.tabIconDefault}
            title={'Add'}
            onPress={this.createTodo}
          />
        </View>
      </View>
    );
  }
}
