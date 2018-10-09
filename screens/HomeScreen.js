import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { TodoContext } from '../utils/TodoContext';

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

  // eslint-disable-next-line class-methods-use-this
  render() {
    return <View style={styles.container}>
      <TodoContext.Consumer>
        {({ todos, pushTodo }) => <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <Todo onTodoAdd={pushTodo} todos={todos}/>
        </ScrollView>}
      </TodoContext.Consumer>
    </View>;
  }
}
