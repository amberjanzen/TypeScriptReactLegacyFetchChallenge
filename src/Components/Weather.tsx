import React from 'react'

type displayWeather = {
    name: string,
    kTemp: number,
    description: string, 
    humidity: number
}

const Weather: React.FunctionComponent<displayWeather> = (props) => {
    console.log(props);
    const tempConverter = (kTemp: number) => {

        let fHeight: number = parseInt(((kTemp-273.15)*9/5+32).toFixed(0))
        return [fHeight]
    }
    const results = () => {
        let [fHeight] = tempConverter(props.kTemp)

        return (<ul>

            <li>Current Location: {props.name}</li>
            <li>{`It is currently ${fHeight}°F`}</li>
            <li>{props.description}</li>
            <li>Humidity: {props.humidity} %</li>
        </ul>)
    }
    return (
        <div>

            {props ? results() : null}

        </div>
    )
}
export default Weather;