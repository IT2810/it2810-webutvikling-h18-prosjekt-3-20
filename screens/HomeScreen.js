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
  // eslint-disable-next-line
  render() {
    return <View style={styles.container}>
      <TodoContext.Consumer>
        {({ todos, pushTodo, editCompletedState }) => <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <Todo onTodoAdd={pushTodo} todos={todos} onCheckBoxPress={editCompletedState}/>
        </ScrollView>}
      </TodoContext.Consumer>
    </View>;
  }
}
