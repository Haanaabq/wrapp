import React from "react";
import axios from "axios";

export default function Weather(props) {
    function handdleresp(response) {
        alert(`the weather in ${response.data.name} is ${response.data.main.temp}`);
    }
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=72bb9dab46b9ec3d65f423c63f27a9b8`;

    axios.get(api).then(handdleresp);

    return <h2>ddd</h2>;

}