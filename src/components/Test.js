import React from "react";
import {Button, View} from "react-native";
import {OneFilm} from "./OneFilm";


export function Test(props){
    return(
        <View>
            <Button title="submit" onPress={()=>{props.navigation.navigate('OneFilm',{params:"vide"})}}/>
        </View>
    )
}
