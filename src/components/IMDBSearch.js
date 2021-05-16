import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../../App";
import Film from "./Film";
import IMDBFilm from "./IMDBFilm";


export function IMDBSearch(props) {

    const [search, updateSearch]=useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [filter, showToFilter] = useState(false);
    const [year, updateYear] = useState('');

    const url = "http://www.omdbapi.com/?s="+ search +"&apikey=37b7d1fc"
    const urlYear = "http://www.omdbapi.com/?s="+ search + "&y="+ year + "&apikey=37b7d1fc"

    const emptyArr=[]
    function fetchData(){

     if (search.length >= 0 && year.length >= 0){
            fetch(urlYear)
                .then((response) => response.json())
                .then((data) => {
                    emptyArr.push(data)
                    setSearchResults(emptyArr)
                })
        }
     else{
         fetch(url)
             .then((response) => response.json())
             .then((data) => {
                 emptyArr.push(data)
                 setSearchResults(emptyArr)
             })
     }
    }

        useEffect( () => {
            fetchData()
        },[search, year])




    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData()
        console.log(searchResults)
    }

    const showFilter = () => {
        showToFilter(true)
    }


    return (

        <View style={styles.container}>
            <Text style={styles.mainTitleStyle}>Movies</Text>
            <View>
                <View style={{display: "flex", flexDirection:"row", marginBottom:15}}>
                <TextInput
                    style={{marginRight:15}}
                    type='search'
                    name='search'
                    value={search}
                    onChangeText={(event) => updateSearch(event)}
                    placeholder='title'
                />
                    <Button title="filter" type="submit"  value="Submit" onPress={showFilter}>
                        Filter
                    </Button>
                </View>
                <View id="filter" style={{display: filter === true ? 'flex' : 'none' }}>
                    <TextInput
                        type='search'
                        name='year'
                        value={year}
                        onChangeText={(event) => updateYear(event)}
                        placeholder='year'
                    />
                </View>
                <Button title="search" type="submit"  value="Submit" onPress={handleSubmit}>
                    Search
                </Button>
            </View>
          <FlatList
                renderItem={(obj) =>
                        <IMDBFilm key={obj.item.key} {...obj.item.Search} />
                }
                data = {searchResults}

            />

        </View>
    );
}

