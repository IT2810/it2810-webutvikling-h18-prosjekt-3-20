import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

const createStyles = checked => StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    flex: 1,
  },
  text: {
    flex: 4,
    paddingLeft: 10,
    color: checked ? Colors.completedTodo : Colors.black,
    textDecorationLine: checked ? 'line-through' : 'none',
  },
});

const checkboxWrapperStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    borderWidth: 0,
  },
});

export default class TodoItem extends Component {
  static propTypes = {
    onCheckBoxPress: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  };

  state = {
    checked: this.props.item.completed,
  };

  render() {
    const styles = createStyles(this.state.checked);
    return (
      <View style={styles.container}>
        <CheckBox
          style={styles.checkbox}
          checked={this.props.item.completed}
          containerStyle={checkboxWrapperStyle.container}
          onPress={() => {
            this.props.onCheckBoxPress(this.props.item);
            this.setState({ checked: !this.state.checked });
          }}
        />
        <Text style={styles.text}>
          {this.props.item.name}
        </Text>
        <Text style={styles.text}>
          {this.props.item.date}
        </Text>
      </View>
    );
  }
}
