import React, { Component } from 'react'
import Weather from './Weather'

type locationData = {
    location: {
        lat: number,
        lon: number
    },
    weather: {
        name:string,
        kTemp: number,
        description: string,
        humidity: number
    }
}

type weatherData = {
    name:string,
    main: {temp:number, humidity:number},
    weather: [{description:string}]
}

let latitude: number;
let longitude: number;
class GeoLocation extends Component <{}, locationData> {
    constructor(props: {}) {
        super(props)
        this.state = {
            location: { lat: 0, lon: 0 },
            weather: {
                name: 'city',
                kTemp: 273,
                description: " ",
                humidity: 0}
        }

        this.location = this.location.bind(this)
        this.weather = this.weather.bind(this)
        this.weatherUpdate = this.weatherUpdate.bind(this)
    }

    componentDidMount() {
     if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                 (position) => {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    this.location(latitude, longitude);
                },
                function (error) {
                    console.error(error);
                }
            );
        }
    }

    location = (lat: number, lon: number): void => {
        this.setState({
            location: { lat: lat, lon: lon }
        }, ()=>{this.weather(lat,lon)})
    }

    weather = (
        latitude:number,
        longitude:number
        ): string => {
        let url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ca00932ed70dd6d7646d8c5e7511c174`
        fetch(url)
        .then(res => {return res.json()})
        .then((data: weatherData)=>{
            this.weatherUpdate(data)
            // console.log(data);
        })
        .catch(err=>console.log(err))
        return url
    }

    weatherUpdate = (data: weatherData):void => {
        this.setState({
            weather: {
                name: data.name,
                kTemp: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity
            }
        })
        // console.log(data);
    }

    render() {

        return (
            <div>
                <Weather
                name={this.state.weather.name}
                kTemp={this.state.weather.kTemp}
                description={this.state.weather.description}
                humidity={this.state.weather.humidity} />
            </div>
        )
    }
}
export default GeoLocation;