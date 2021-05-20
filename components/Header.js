import React from 'react'
import {StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors'

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
}

export default Header ;

const styles = StyleSheet.create({
   header : {
       width : "100%" ,
       height : 90 ,
       justifyContent : "center",
       alignItems : "center",
       paddingTop :36 , 
       backgroundColor: Colors.primary,
   },
   headerText :{
    color: 'black',
    fontSize: 18,
    fontFamily : 'open-sans-bold'
   }
});

