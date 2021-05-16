import React, {useEffect, useState, useLayoutEffect } from 'react';
import {Button, FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import { AsyncStorage } from 'react-native';
import {Films} from "./src/components/Films";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AddFilm} from "./src/components/AddFilm";
import {OneFilm} from "./src/components/OneFilm";
import {SelectedFilm} from "./src/components/SelectedFilm";
import {IMDBSearch} from "./src/components/IMDBSearch";
import {Login} from "./src/components/Login";
import {navigationRef} from "./src/components/RootNavigation";
import  * as RootNavigation from "./src/components/RootNavigation";
import {Parametrages} from "./src/components/Parametrages";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const url = "http://www.omdbapi.com/?i=tt3896198&apikey=37b7d1fc"

export const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  input: {
    height: 30,
    width:200,
    margin: 5,
    borderWidth: 1,
    textAlign:"center"
  },

  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom:30
  },

  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },

  imageStyle: {
    width:250,
    height:250,
    marginBottom:10
  },

  ratingStyle: {
    fontWeight:'bold',
    marginBottom:30,
    fontSize:15,
    color:'#FFA500'
  },

  titleStyle: {
    fontWeight:'bold',
    marginBottom:30,
    fontSize:15,
  },

  mainTitleStyle:{
    fontWeight:'bold',
    marginBottom:30,
    fontSize:30,
    textAlign:'center'
  },

  ratingAndTitleStyleView: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },

})
function Home(props) {
/*
    const [user, setUser] = useState(null)
  let isMounted = useMountedState()
 useEffect(() => {
 AsyncStorage.getItem('user').then((value) =>{
   if(isMounted) {
       setUser(value)
   }});



  }, [user]);
*/

  return (
      <Tab.Navigator>
        <Tab.Screen name="Films" component={Films} />
        <Tab.Screen name="AddFilm" component={AddFilm} />
        <Tab.Screen name="OneFilm" component={OneFilm}/>
        <Tab.Screen name="SelectedFilm" component={SelectedFilm}/>
        <Tab.Screen name="IMDBSearch" component={IMDBSearch}/>
      </Tab.Navigator>);
}
export default function App(props) {
  const clearAsyncStorage = async() => {
    await AsyncStorage.clear();
  }
  const LogOut = () => {
    clearAsyncStorage().then(r => console.log(r));
    RootNavigation.navigate('Login', {userIsLogged:false})
  }

  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home}  options={{
            headerTitle: "Home",
            headerRight: () => (
                <Button
                    onPress={LogOut}
                    title="Logout"
                    color="#000000"/>)}}/>
          <Stack.Screen name="Parametrages" component={Parametrages} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
