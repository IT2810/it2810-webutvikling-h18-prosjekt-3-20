import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Todo from '../components/Todo/index';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    getTodos: PropTypes.func.isRequired,
  };

  state = {
    currentDate: new Date().toString(),
    todos: [],
  };

  addTodoItem = (item) => {
    const { todos } = this.state;
    todos.push(item);
    this.setState({ todos });
  };

  componentDidMount() {
    this.props.getTodos().then(todos => this.setState({ todos }));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Todo onTodoAdd={this.addTodoItem} todos={this.state.todos}/>
        </ScrollView>
      </View>
    );
  }
}
