import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { MonoText, ErrorText } from '../StyledText';


describe('<MonoText/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('<ErrorText/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ErrorText>Some error text</ErrorText>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
