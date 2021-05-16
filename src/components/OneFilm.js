import React, {useState} from "react";
import {Button, Image, Text, TextInput, View} from "react-native";
import {styles} from "../../App";

export function OneFilm ({route}) {

    if(route.params){
        return (
            <View style={styles.container}>
                <View>
                    <Image source={{uri: route.params.imageLink}} style={styles.imageStyle}/>
                    <View style={styles.ratingAndTitleStyleView}>
                        <Text style={styles.titleStyle}>{route.params.filmTitle}</Text>
                        <Text style={styles.ratingStyle}>{route.params.Default_Rating}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{width:370}}>{route.params.resume}</Text>
                    <Text style={{color: '#0000ff'}}>{route.params.imdbLink}</Text>
                </View>
            </View>

        );
    }else{
        return <View></View>
    }
}


