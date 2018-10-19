import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const textStyles = StyleSheet.create({
  mono: {
    fontFamily: 'space-mono',
  },
  error: {
    color: Colors.noticeColor,
  },
});

/**
 * Simple styled text in mono format
 * */
export const MonoText = props => <Text {...props} style={[props.style, textStyles.mono]}/>;

/**
 * Text used to print errors
 * */
export const ErrorText = props => <MonoText {...props} style={[props.style, textStyles.error]}/>;
