import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../App";

export default function IMDBFilm(props){
console.log("props", props)


    return(
        <View>
            {Object.keys(props).map((film,index) => {
                return (
                    <View key={index}>
                        <Image source={{uri: props[film].Poster}} style={styles.imageStyle}/>
                        <View style={styles.ratingAndTitleStyleView}>
                            <Text style={styles.titleStyle}>{props[film].Title}</Text>
                        </View>
                    </View>
                )
            })}
            </View>
        )
}
