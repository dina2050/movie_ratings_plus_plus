import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../App";

export default function StorageMovie(props){

    return(

        <View>
            <Image source={{uri: props.imageLink}} style={styles.imageStyle}/>
            <View style={styles.ratingAndTitleStyleView}>
                <Text style={styles.titleStyle}>{props.filmTitle}</Text>
                <Text style={styles.ratingStyle}>{props.Default_Rating}</Text>
            </View>
        </View>
    )
}
