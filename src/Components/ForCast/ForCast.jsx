import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "../../apikeys";
import ReactAnimatedWeather from "react-animated-weather";
import styles from "./ForCast.module.css";

const ForCast = () => {
  const [query, setQuery] = useState("");
  const [weathername, setWeathername] = useState("");
  const [icon, setIcon] = useState("");
  const [weatherr, setWeatherr] = useState({});
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");

  const searchCity = async (city) => {
    const res = await axios.get(
      `${apiKeys.base}weather?q=${
        city != "[object Object]" ? city : query
      }&units=metric&APPID=${apiKeys.key}`
    );

    const data = await res.data;
    setWeatherr(data);
    setWeathername(data.weather[0].main);
    console.log(data);
    setWind(data.wind);
    setTemperature(data.main.temp);
    setHumidity(data.main.humidity);
    switch (data.weather[0].main) {
      case "Haze":
        setIcon("CLEAR_DAY");
        break;
      case "Clouds":
        setIcon("CLOUDY");
        break;
      case "Rain":
        setIcon("RAIN");
        break;
      case "Snow":
        setIcon("SNOW");
        break;
      case "Dust":
        setIcon("WIND");
        break;
      case "Drizzle":
        setIcon("SLEET");
        break;
      case "Fog":
        setIcon("FOG");
        break;
      case "Smoke":
        setIcon("FOG");
        break;
      case "Tornado":
        setIcon("WIND");
        break;
      default:
        setIcon("CLEAR_DAY");
    }
  };

  useEffect(() => {
    searchCity("Delhi");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.firsthalf}>
        <ReactAnimatedWeather
          icon={icon}
          color="#FFD700"
          size={64}
          animate={true}
        />
        <h4>{weathername}</h4>
        <hr/>
        <input
          className={styles.searchbar}
          placeholder="Search any city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className={styles.imgbox}>
          {" "}
          <img
            onClick={searchCity}
            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
          />
        </span>
      </div>
      <div className={styles.secondhalf}>
        <h3>{weatherr.name}</h3>
        <hr/>
        <ul className={styles.list}>
          <li>{`${temperature} temp °C`}</li>
          <hr/>
          <li>{`${humidity} humidity %`}</li>
          <hr/>
          <li>{weatherr.visibility}</li>
          <hr/>
          <li>{`Wind: ${wind.speed} m/s, direction ${wind.deg}° `}</li>
        </ul>
      </div>
    </div>
  );
};

export default ForCast;
