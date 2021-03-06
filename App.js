import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  AppLoading,
  Asset,
  Font,
  Icon,
} from 'expo';
import PropTypes from 'prop-types';
import guid from './utils/guid';
import { TodoContext, context } from './utils/TodoContext';

import AppNavigator from './navigation/AppNavigator';
import colors from './constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});

/**
 * Assigns a Global Unique IDentifier to item if it doesn't already have one
 * */
const assignGuidIfNull = (item) => {
  if (!item.id) {
    // eslint-disable-next-line no-param-reassign
    item.id = guid();
  }

  return item;
};

export default class App extends React.Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  };

  state = {
    /**
     * Used by TodoContext.Provider
     * @var {array} Array of todos registered for the application
     * */
    todos: [],

    isLoadingComplete: false,
  };

  componentDidMount() {
    // Fetch any stored todos from the context or storage
    context.getTodos().then(todos => this.setState({ todos }));
  }

  /**
   * Pushes a new todo onto the stored todos,
   * and saves it
   * @param: {object} todo
   * @return {Promise}
   * */
  pushTodo = async (todo) => {
    // eslint-disable-next-line no-param-reassign
    todo = assignGuidIfNull(todo);

    const savedTodos = await context.saveTodos(this.state.todos.concat([todo]));
    this.setState({ todos: savedTodos });
    return savedTodos;
  };

  removeTodo = async (todo) => {
    const newTodos = this.state.todos.filter(e => e.id !== todo.id);
    await context.saveTodos(newTodos);
    this.setState({ todos: newTodos });
  };

  editCompletedState = async (todoItem) => {
    const item = this.state.todos.find(obj => obj.id === todoItem.id);
    item.completed = !item.completed;
    this.setState(this.state.todos);
    await context.saveTodos(this.state.todos);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return <AppLoading
        startAsync={this.loadResourcesAsync}
        onError={this.handleLoadingError}
        onFinish={this.handleFinishLoading}
      />;
    }

    return <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
      <TodoContext.Provider value={{
        todos: this.state.todos,
        pushTodo: this.pushTodo,
        removeTodo: this.removeTodo,
        editCompletedState: this.editCompletedState,
      }}>
        <AppNavigator/>
      </TodoContext.Provider>
    </View>;
  }

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      // eslint-disable-next-line global-require
      require('./assets/images/robot-dev.png'),
      // eslint-disable-next-line global-require
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Icon.Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free
      // to remove this if you are not using it in your app
      // eslint-disable-next-line global-require
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
