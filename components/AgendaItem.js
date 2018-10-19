import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const bckColor = '#fff';
const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
    backgroundColor: bckColor,
    marginTop: 18,
  },
  time: {
    fontWeight: 'bold',
  },
});

const AgendaItem = ({ item }) => <View style={[styles.item, { height: item.height }]}>
  {item.time && <Text style={styles.time}>{item.time}</Text>}
  <Text>{item.name}</Text>
</View>;

AgendaItem.propTypes = {
  item: PropTypes.shape({
    time: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default AgendaItem;
