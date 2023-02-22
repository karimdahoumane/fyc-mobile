import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textItem}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItem: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});


export default Splash;