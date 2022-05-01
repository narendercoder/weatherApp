import React, { useEffect, useState } from "react";
import "./style.css";

const Weather = () => {
const [weatherState, setWeatherState] = useState("")
const [searchValue, setsearchValue] = useState("delhi");
const [tempInfo, setTempInfo] = useState({})
let hour = new Date().getHours();
let minute = new Date().getMinutes();
let am = "AM"; 

const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const d = new Date();
let monthName = month[d.getMonth()];

let day = new Date().getDate();
const weekday = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

const week  = new Date();
let weekDay = weekday[week.getDay()]

const [htime, setHtime] = useState(hour);
const [mtime, setMtime] = useState(minute);
const [ampm, setAMPM] = useState(am);

const updateTime = () => {
  am="AM";
  hour = new Date().getHours();
  minute = new Date().getMinutes();
  am = (hour>12)? (hour = hour-12, am ="PM") : am ;
  hour = (hour<10) ? `0${hour}`:hour;
  minute = (minute<10) ? `0${minute}`:minute;
  setHtime(hour);
  setMtime(minute);
  setAMPM(am);
};


setInterval(updateTime, 1000);

   const getWeather = async() => {
       try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=df46ab06550bc5f6c8ec265ed2cddfbd`;
        const res = await fetch(url);
        const data = await res.json();
        const{temp, humidity, pressure} = data.main;
        const {main:weathermood} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const {country, sunset} = data.sys;

        const myNew = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset,
        };
       
        setTempInfo(myNew);
       }
       catch(error){
       console.log(error);
       }
   };

   useEffect(() => {
    getWeather()
}, []);

useEffect(() => {
   if(tempInfo.weathermood){
       switch(tempInfo.weathermood){
           case "Clouds" : setWeatherState("wi-day-cloudy");
           break;
           case "Haze" : setWeatherState("wi-fog");
           break;
           case "Clear" : setWeatherState("wi-day-sunny");
           break;
           case "Mist" : setWeatherState("wi-dust");
           break;
           case "Dust" : setWeatherState("wi-dust");
           break;
           case "Thunderstorm" : setWeatherState("wi-day-thunderstorm");
           break;
           case "Rain" : setWeatherState("wi-day-thunderstorm");
           break;
           default:
           case "Clear" : setWeatherState("wi-day-sunny");
           break;
       }
   }
}, [tempInfo.weathermood]);

let sec = tempInfo.sunset;
let date = new Date(sec*1000);
let timeStr = `${date.getHours()}:${date.getMinutes()}`;

const num = tempInfo.temp;

const result = typeof num === 'number' ? num.toFixed(0) : num;


  return (
    <>
    <div className="container">
      <div className="box">
        <h1 className="heading">{htime}:{mtime} {ampm}</h1>
        <h3 className="date">{monthName} {day} {weekDay}</h3>
        <div className="search">
          <input
            className="searchTerm"
            autoFocus
            id="search"
            value={searchValue}
            onChange ={(e)=>setsearchValue(e.target.value)}
            placeholder="Search"
          ></input>
          <button className="searchButton" type="button" onClick={getWeather}>
            search
          </button>
        </div>
        <div className="widget">
        <div className="wrapper">
          <div className="weatherInfo">
            <span className="place">
              <i className="fa fa-location-dot"></i>{tempInfo.name},{tempInfo.country}
            </span>
            <br />
            <div className="weatherIcon">
            <i className={`wi ${weatherState}`}></i>
            </div>
            <h1 className="temperature">{result}°C</h1>
            <span className="weathercondition">{tempInfo.weathermood}</span>
          </div>
          </div>
          <div className="detail">
          <span className="span">Weather details</span>
            </div>
          <div className="extra-temp">
            <div className="temp-info-minmax">
              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-sunset"}></i>
                </p>
                <p className="extra-info-leftside">
                {timeStr} PM<br />
                  Sunset
                </p>
              </div>
              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-humidity"}></i>
                </p>
                <p className="extra-info-leftside">
                  {tempInfo.humidity} % <br />
                  Humidity
                </p>
              </div>
            </div>
            <div className="weather-extra-info">
              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-rain"}></i>
                </p>
                <p className="extra-info-leftside">
                {tempInfo.pressure} hpa <br />
                  Pressure
                </p>
              </div>
              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-strong-wind"}></i>
                </p>
                <p className="extra-info-leftside">
                {((tempInfo.speed)*3.6).toFixed(0)} km/h<br />
                  Speed
                </p>
              </div>
            </div>
          </div>
        </div>
      
        
      </div>
      </div>
    </>
  );
};
export default Weather;
