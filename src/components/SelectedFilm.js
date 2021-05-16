import React from "react";
import { Image, Text, View} from "react-native";
import {styles} from "../../App";

export function SelectedFilm ({route}) {

    console.log(route.params);
    if(route.params){
    return (
        <View style={styles.container}>
            <View>
                <Image source={{uri: route.params.Poster}} style={styles.imageStyle}/>
                <View style={styles.ratingAndTitleStyleView}>
                    <Text style={styles.titleStyle}>{route.params.Title}</Text>
                    <Text style={styles.ratingStyle}>{route.params.imdbRating}</Text>
                </View>
            </View>
            <View>
                <Text style={{width:370}}>{route.params.Plot}</Text>
                <Text style={{color: '#0000ff'}}>{'https://www.imdb.com/title/' + route.params.imdbID}</Text>
            </View>
        </View>

    );}else{
        return <View></View>
    }
}

