import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import AgendaItem from '../AgendaItem';

const mockedItems = [
  {
    name: 'Test',
    time: '09:30:00',
  },
  {
    name: 'Test',
  },
];

describe('<AgendaItem/>', () => {
  it('should render without failing', () => {
    const tree = renderer.create(<AgendaItem item={mockedItems[0]}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should render without failing', () => {
    const tree = renderer.create(<AgendaItem item={mockedItems[1]}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
