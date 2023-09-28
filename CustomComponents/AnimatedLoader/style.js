import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      // flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    line: {
      width: 5,
      marginHorizontal: 4,
      borderRadius: 4,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    wavesContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    wave: {
      width: 40,
      height: 20,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    text: {
      fontWeight: 'bold',
      marginTop: 5,
      color: '#fff'
    },
  });