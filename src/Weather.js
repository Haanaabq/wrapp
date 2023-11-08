import React, { useState } from "react";
import axios from "axios";
import './weather.css';


export default function Weather(props) {
    const [weatherdata, setweatherdata] = useState({ ready: false });
    function handdleresp(response) {
        setweatherdata({
            ready: true,
            coordinates: response.data.coord,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: "sss",
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            wind: response.data.wind.speed,
            city: response.data.name,
        })
    }

    if (weatherdata.ready) {
        return (
            <div className="Weather">
                <form>
                    <div className="row">
                        <div className="col-9">
                            <input type="search" placeholder="enter a city..." className="form-control"></input>

                        </div>
                        <div className="col-3">
                            <input type="submit" value="search" className="btn btn-primary"></input>

                        </div>
                    </div>
                </form>
                <h2>{weatherdata.city}</h2>
                <ul>
                    <li>{weatherdata.date}</li>
                    <li>{weatherdata.description}</li>
                </ul>

                <div className="row">
                    <div className="col-6">
                        <div className="clearfix">
                            <img src={weatherdata.iconUrl} alt={weatherdata.description} className="float-left"></img>
                            <div className="float-left">
                                <span className="temperature">{Math.round(weatherdata.temperature)}</span>
                                <span className="unit">c</span>
                            </div>
                        </div></div>
                    <div className="col-6">
                        <ul>
                            <li>precipitaion: 15%</li>
                            <li>wind:{weatherdata.wind}</li>
                            <li>humidity:{weatherdata.humidity}</li>


                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    else {
        let city = "london";
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72bb9dab46b9ec3d65f423c63f27a9b8`;

        axios.get(api).then(handdleresp);
        return "loading...";
    }
}