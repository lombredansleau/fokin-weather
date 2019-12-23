import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import {Alert} from 'react-native';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "a981265582afe7f5687f9e14603d0a5a";

export default class extends React.Component {

 state = {
  isLoading : true
 };

 componentDidMount(){
   this.getLocation();
 };

 getWeather = async(latitude, longitude) => {
  const {
        data: {
          main: { temp },
          weather
        }
      } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`); 
  this.setState({isLoading : false, temp, condition: weather[0].main});
 };

 getLocation = async() =>  {
   const {isLoading} = this.state;
   try {
     await Location.requestPermissionsAsync();
     const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync();
     this.getWeather(latitude, longitude);

   } catch(error) {
     Alert.alert("Can't find you", "So Sad");

   }
 };

 render () {
   const {isLoading, temp, condition} = this.state;
   return (isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition}/>); 
 }
}
