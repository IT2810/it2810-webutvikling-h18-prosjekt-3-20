import React from 'react';
import { Text } from 'react-native';

// eslint-disable-next-line import/prefer-default-export
export class MonoText extends React.Component {
  render() {
    // eslint-disable-next-line react-native/no-inline-styles
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}
