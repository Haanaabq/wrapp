import React, { useState } from "react";
import axios from "axios";
import './weather.css';
import WeatherInfo from "./weatherinfo";


export default function Weather(props) {
    const [city, setcity] = useState(props.city);

    const [weatherdata, setweatherdata] = useState({ ready: false });
    function handdleresp(response) {
        setweatherdata({
            ready: true,
            coordinates: response.data.coord,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            wind: response.data.wind.speed,
            city: response.data.name,
        })
    }
    function search() {
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72bb9dab46b9ec3d65f423c63f27a9b8`;

        axios.get(api).then(handdleresp);
    }
    function handlesubmit(event) {
        event.preventDefault();
        search();
    }
    function handlecitychange(event) {
        setcity(event.target.value);

    }
    if (weatherdata.ready) {
        return (
            <div className="Weather">
                <form onSubmit={handlesubmit}>
                    <div className="row">
                        <div className="col-9">
                            <input type="search" placeholder="enter a city..." className="form-control" onChange={handlecitychange}></input>

                        </div>
                        <div className="col-3">
                            <input type="submit" value="search" className="btn btn-primary"></input>

                        </div>
                    </div>
                </form>
                <WeatherInfo data={weatherdata} />
            </div>
        );
    }
    else {
        search();
        return "loading...";
    }
}