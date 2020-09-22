import React from "react";
import { Text, StyleSheet } from "react-native";

// class Cat extends Component {
//   render() {
//     return <Text>Hi there! I am Kitty!</Text>;
//   }
// }

const Cat = ({ name }) => {
  return <Text style={styles.text}>Hi there! My name is {name}!</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40
  }
});

export default Cat;
