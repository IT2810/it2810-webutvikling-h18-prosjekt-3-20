import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import SwipeOut from 'react-native-swipeout';
import Colors from '../../constants/Colors';

const createStyles = checked => StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    flex: 1,
  },
  name: {
    flex: 5,
    color: checked ? Colors.completedTodo : Colors.black,
    textDecorationLine: checked ? 'line-through' : 'none',
  },
  date: {
    flex: 2,
    color: checked ? Colors.completedTodo : Colors.black,
    textDecorationLine: checked ? 'line-through' : 'none',
  },
});

const checkboxWrapperStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    width: 40,
  },
});

export default class TodoItem extends Component {
  static propTypes = {
    onCheckBoxPress: PropTypes.func.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  };

  state = {
    checked: this.props.item.completed,
    activeItem: null,
  };

  render() {
    const styles = createStyles(this.state.checked);
    const swipeSettings = {
      autoClose: true,
      onClose: () => {
        if (this.props.item.id === this.state.activeItem && typeof direction !== 'undefined') {
          this.setState({ activeItem: null });
        }
      },
      onOpen: () => {
        this.setState({ activeItem: this.props.item });
      },
      right: [
        {
          onPress: () => {
            this.props.onRemoveTodo(this.state.activeItem);
          },
          text: 'Delete',
          type: 'delete',
        },
      ],
    };
    return (
      <SwipeOut {...swipeSettings}>
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
          <Text style={styles.name}>
            {this.props.item.name}
          </Text>
          <Text style={styles.date}>
            {this.props.item.date}
          </Text>
        </View>
      </SwipeOut>
    );
  }
}
