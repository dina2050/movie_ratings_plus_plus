import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {films} from "../../movies.json";
import {styles} from "../../App";
import Film from "./Film";
import { AsyncStorage } from 'react-native';
import StorageMovie from "./StorageMovie";


export function StorageMovies(props) {

    const [search, updateSearch]=useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [filter, showToFilter] = useState(false);
    const [year, updateYear] = useState('');
    const [rating, updateRating] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const showFilter = () => {
        showToFilter(true)
    }

    const [storageResult, setStorageResults] = useState('');
    const getValueFunction = () => {
        AsyncStorage.getItem('movie').then(
            (value) =>
                setStorageResults(JSON.parse(value))
        );
        console.log("storageResult", storageResult)
    };
    const results=[];
    useEffect(() => {
        AsyncStorage.getItem('movie').then(
            (value) =>
                setStorageResults(JSON.parse(value))
        );

        results.push(storageResult)
        results.filter(film =>

            (search && film.filmTitle.includes(search)) ||
            (rating  && film.Default_Rating.includes(rating))

        )
        setSearchResults(results);
        console.log(searchResults)
    }, [search, year, rating] );


    return (

        <View style={styles.container}>
            <Text style={styles.mainTitleStyle}>Movies</Text>
            <View>
                <TextInput
                    type='search'
                    name='search'
                    value={search}
                    onChangeText={(event) => updateSearch(event)}
                    placeholder='Search'
                />
                <View id="filter" style={{display: filter === true ? 'flex' : 'none' }}>
                    <TextInput
                        type='search'
                        name='year'
                        value={year}
                        onChangeText={(event) => updateYear(event)}
                        placeholder='year'
                    />
                    <TextInput
                        type='search'
                        name='rating'
                        value={rating}
                        onChangeText={(event) => updateRating(event)}
                        placeholder='rating'
                    />
                </View>
                <Button title="submit" type="submit"  value="Submit" onPress={handleSubmit}>
                    Search
                </Button>
                <Button title="filter" type="submit"  value="Submit" onPress={showFilter}>
                    Filter
                </Button>
                <Button title="getvalue" type="submit"  value="Submit" onPress={getValueFunction}>
                    getvalue
                </Button>
            </View>

            <FlatList
                renderItem={(obj) =>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('SelectedFilm',obj.item)}}>
                        <StorageMovie key={obj.item.key} {...obj.item} />
                    </TouchableOpacity>
                }
                // data = {searchResults.length > 0 ? searchResults:films}
                data = {searchResults.length > 0 ? searchResults:results}
            />
        </View>
    );
}

