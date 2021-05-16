import React from "react";
import {Image, Text, View} from "react-native";
import {styles} from "../../App";

export default function Film(props){

    return(

        <View>
            <Image source={{uri: props.Poster}} style={styles.imageStyle}/>
            <View style={styles.ratingAndTitleStyleView}>
                <Text style={styles.titleStyle}>{props.Title}</Text>
                <Text style={styles.ratingStyle}>{props.imdbRating}</Text>
            </View>
        </View>
    )
}
