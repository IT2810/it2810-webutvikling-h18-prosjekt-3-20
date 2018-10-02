import React from 'react';
import { Icon } from 'expo';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

const tabStyles = {
  marginBottom: -3,
};

export default class TabBarIcon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    focused: PropTypes.bool,
  };

  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={tabStyles}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
