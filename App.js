import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

const Image = styled.Image`
  width: 200px;
  height: 200px;
`;

export default function App() {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri:'https://occ-0-1068-92.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQ87hjjLmqLIxNySIpqte-duXaDBha3_iBdaJtZ-zfIf_yuZQu338DN1Fdg_5kENOiP5XqqgYDPZcBrMlhM5b4KL9Ggm3gsr9MByixIVkkhjhwlO.jpg?r=978' }}
      />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
