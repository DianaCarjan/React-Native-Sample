import React from 'react';
import {  Text, View, StyleSheet } from 'react-native';

const Test = (props) => {
    const {name} = props;
    const favActivity = 'test';

    return (
        <View>
            <Text style={styles.text}>Hi there! My name is {name}</Text>
            <Text style={styles.text}>Getting started with React Native</Text>
            <Text >My favorite activity is {favActivity} </Text>
        </View>
    );
};

export default Test;

const styles = StyleSheet.create({
    text: {
        color:'blue'
    }
});
