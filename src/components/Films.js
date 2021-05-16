import React, {useEffect, useState} from "react";
import {Button, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import {films} from "../../movies.json";
import {styles} from "../../App";
import Film from "./Film";


export function Films(props) {

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

    useEffect(() => {

      const results = films.filter(film =>

         ( search && film.Title.includes(search)) ||
          (year && film.Year.includes(year)) ||
        (rating  && film.imdbRating.includes(rating))

        )

        setSearchResults(results);
        console.log(searchResults)
    }, [search, year, rating] );


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
                    <Button title="filter" type="submit"  value="Submit" onPress={showFilter} >
                        Filter
                    </Button>
                    </View>
                    <View id="filter" style={{display: filter === true ? 'flex' : 'none' }}>
                        <View  style={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
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
                    </View>
                    <Button  title="search" type="submit"  value="Submit" onPress={handleSubmit}>
                       Search
                    </Button>
                </View>

                     <FlatList
                    renderItem={(obj) =>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate('SelectedFilm',obj.item)}}>
                        <Film key={obj.item.key} {...obj.item} />
                         </TouchableOpacity>
                     }
                    data = {searchResults.length > 0 ? searchResults:films}
                />
            </View>
        );
    }

