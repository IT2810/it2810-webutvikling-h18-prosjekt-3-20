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

import { ErrorText } from '../StyledText';

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
  errorText: {
    maxWidth: 260,
  },
});

const fallbackLocation = {
  coords: {
    latitude: 63.419301,
    longitude: 10.402234,
  },
};

export default class TodoInput extends Component {
  static propTypes = {
    onTodoAdd: PropTypes.func.isRequired,
  };

  state = {
    text: '',
    error: null,
    // Get today at YYYY-MM-DD format
    date: new Date().toISOString().slice(0, 10),
  };

  changeTextHandler = (text) => {
    this.setState({ text });
  };

  changeSelectedDate = (date) => {
    this.setState({ date });
  };

  createTodo = async () => {
    if (this.state.text.length < 1) {
      this.setState({ error: 'Please enter a description' });
      return;
    }

    let location = null;
    let error = null;
    try {
      location = await getLocation();
    } catch (e) {
      error = `${e.message}. Your location will be mocket to Gløshaugen`;
      location = fallbackLocation;
    }

    const { latitude, longitude } = location.coords;

    this.props.onTodoAdd({
      coordinates: { latitude, longitude },
      name: this.state.text,
      date: this.state.date,
      completed: false,
    });

    this.setState({ error, text: '' });
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
          />
        </View>
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
        {this.state.error && <View>
          <ErrorText style={styles.errorText}>{this.state.error}</ErrorText>
        </View>}
      </View>
    );
  }
}
