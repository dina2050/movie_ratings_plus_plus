import React from "react";
import {Button, Text, TextInput, View, TouchableOpacity, Image} from "react-native";
import { AsyncStorage } from 'react-native';
import {styles} from "../../App";
import {OneFilm} from "./OneFilm";

export class AddFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmTitle: '',
            resume: '',
            imdbLink:'',
            imageLink:'',
            Default_Rating: null,
            Max_Rating: 5,
            films:[],
            isSubmitted:false,
            error:null
        };
        //Filled Star.
        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        //Empty Star.
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }

     saveValueFunction = (textInputValue) => {
        //function to save the value in AsyncStorage
        if (textInputValue) {
            AsyncStorage.setItem('movie', textInputValue);
        } else {
            console.log('error');

        }
    };



    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.filmTitle.length!==0 && this.state.imageLink.length!==0 && this.state.imdbLink.length!==0 && this.state.resume.length!==0) {
            const navigationOptions = {
                filmTitle: this.state.filmTitle,
                resume: this.state.resume,
                imdbLink: this.state.imdbLink,
                imageLink: this.state.imageLink,
                Default_Rating: this.state.Default_Rating,
            };
            const filmToSave = JSON.stringify(navigationOptions)
            this.saveValueFunction(filmToSave)
            this.props.navigation.navigate("OneFilm",navigationOptions)
        }

        else {
            this.setState({
                error:"Please fill all required fields"
            })
        }
        console.log(this.state.films)

    }

    render() {
        let React_Native_Rating_Bar = [];

        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.container}>
                {this.state.isSubmitted === true &&
                <OneFilm data={this.state}/>
                }
                <View style={{display: this.state.isSubmitted === true ? 'none' : 'flex' }}>
                    <Text style={styles.mainTitleStyle}>Add a movie</Text>
                    <Text style={{display: this.state.error !== null ? 'flex' : 'none' , color:'#ff0000'}}>{this.state.error}</Text>
                    <TextInput
                        style={styles.input}
                        type='text'
                        name='filmTitle'
                        onChangeText={(text) => text.length > 0 ? this.setState({filmTitle: text}):null}
                        placeholder='Enter a title'
                    />

                    <TextInput
                        style={styles.input}
                        type='text'
                        name='resume'
                        onChangeText={(text) => text.length > 0 ? this.setState({resume: text}):null}
                        placeholder='Enter a description'
                    />
                    <TextInput
                        style={styles.input}
                        type='text'
                        name='imageLink'
                        onChangeText={(text) => text.length > 0 ? this.setState({imageLink: text}):null}
                        placeholder='Enter an imdb image link'
                    />
                    <TextInput
                        style={styles.input}
                        type='text'
                        name='imdbLink'
                        onChangeText={(text) => text.length > 0 ? this.setState({imdbLink: text}):null}
                        placeholder='Enter an imdb link'
                    />
                    <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                    <Button title="submit" type="submit"  value="Submit" onPress={this.handleSubmit}>
                        Add a film
                    </Button>
                </View>
            </View>
        );
    }
}
