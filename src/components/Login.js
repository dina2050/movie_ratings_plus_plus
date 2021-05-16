import {Button, Text, TextInput, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {styles} from "../../App";
import { AsyncStorage } from 'react-native';
import {useFocusEffect} from "@react-navigation/native";

export function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(null);
    const err1 = "Please enter your username"
    const err2 = "Password must be more than 5 caracteres long"
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!username){
            setUsernameError(err1)
        }
        else if(!password){
            setPasswordError(err2)
        }
        else{
            const data = {
                name:username,
                pass:password
            }
          //  const userData = JSON.stringify(data)
            saveValueFunction(data)
            let logData={
                userIsLogged:true
            }
            props.navigation.navigate('Home', logData)
        }

    }

   const saveValueFunction = (textInputValue) => {
        //function to save the value in AsyncStorage
        if (textInputValue) {
            AsyncStorage.setItem('user', textInputValue);

        } else {
            console.log('error')
        }
    };

    const textInput = React.useRef();
    const passInput = React.useRef();
    const clearInput = () => (textInput.current.value = "");
    const clearPass = () => (passInput.current.value = "");

    useFocusEffect(
        useCallback(() => {
            clearInput()
            clearPass()

            return () => {

            };
        }, [])
    );







    return(
        <View style={styles.container}>
            <TextInput
                ref={textInput}
                style={styles.input}
                type='text'
                onChangeText={(text) => text.length > 0 ? setUsername(text):null}
                value={username}
                placeholder='Enter a username'
            />
            <Text style={{color:"#ff0000", fontSize:12}}>{usernameError}</Text>
            <TextInput
                ref={passInput}
                style={styles.input}
                type='text'
                onChangeText={(text) => text.length > 5 ? setPassword(text):null}
                placeholder='Enter a password'
            />
            <Text style={{color:"#ff0000", fontSize:12}}>{passwordError}</Text>
            <Button title="submit" type="submit"  value="Submit" onPress={handleSubmit}>
                Submit
            </Button>
        </View>
    )
}
