import { useEffect, useState } from 'react'
import './App.css'

// images
import searchIcon from './assets/search.png';
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/clouds.png';
import drizzleIcon from './assets/drizzle.png';
import rainIcon from './assets/rain.png';
import windIcon from './assets/wind.png';
import snowIcon from './assets/snow.png';
import humidityIcon from './assets/humidity.png';
import mistIcon from './assets/mist.png';
import { use } from 'react';


// weather Details
const WeatherDetails = ({ icon , temp , city , country , lat , lon , hum , wind })=>{
  return(
    <>
  <div className="image">
  <img src={icon} alt="" /></div>
  <div className="temp">{temp} °C </div>
  <div className="city">{city}</div>
  <div className="country">{country}</div>
  <div className="cords">
    <div>
      <span>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span>Longitude</span>
      <span>{lon}</span>
    </div>
  </div>
  <div className="data-container">
  <div className="element">
    <img src={humidityIcon} className='icon' />
    <div className="data">
          <div className="hum-perc">{hum} %</div>
          <div className="text">Humidity</div>
        </div>
        
  </div>
  <div className="element">
    <img src={windIcon} className='icon' />
    <div className="data">
          <div className="hum-perc">{wind} %</div>
          <div className="text">Humidity</div>
        </div>
        
  </div>
  
  </div>

  </>

  )

  


}

// Main app



function App() {
  let api_key = "da9c907cf222bef15c25dd39e25a4df8";

  const [text , setText] = useState("Chennai");
  const [icon , setIcon] = useState(clearIcon);
  const [temp , setTemp] = useState(0);
  const [city , setCity] =  useState("Chennai");
  const [country , setCountry] = useState("IN");
  const [lat , setLat] = useState(0);
  const [lon , setLon] = useState(0);
  const [hum , setHum] = useState(0);
  const [wind , setWind] = useState(0);
  const [loading , setLoading] = useState(false);
  const [cityNotFound , setCityNotFound] = useState(false);
  const [error , setError] = useState(null)


  // search function

const search=async() =>{
  setLoading(true)
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{

    const res = await fetch(api_url);
    const data = await res.json();

    if(data.cod==="404"){
    console.error("City not Found")
    setCityNotFound(true);
    setLoading(false);
    return

    }

    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLon(data.coord.lon);
    setHum(data.main.humidity);
    setWind(data.wind.speed);
    const weatherCode = data.weather[0].main;
    
    if(weatherCode === "Clouds" ){
      setIcon(cloudIcon)
    }
    else if(weatherCode === "Drizzle"){
      setIcon(drizzleIcon)
    }
    else if(weatherCode === "Clear"){
      setIcon(clearIcon)
    }
    else if(weatherCode === "Rain"){
      setIcon(rainIcon)
    }
    else if(weatherCode === "Mist" || "Haze"){
      setIcon(mistIcon)
    }
    else if(weatherCode === "Snow"){
      setIcon(snowIcon)
    }

    setCityNotFound(false)

  }

    catch(error){
      console.error("An error occurred", error.message);
      setError("An  error occurred while fetching the data");
    }
    finally{
      setLoading(false)
    }


  }

 
    




const searchHandler = (e)=>{

  setText(e.target.value)

}

const keyDownHandler = (e)=>{

  if(e.key == "Enter"){
    search()
  }

}

useEffect(()=>{
  search()

},[])

  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input type="text" className='city-input' value={text} placeholder='Enter Location' onChange={searchHandler} onKeyDown={keyDownHandler} />
          <div className="search-icon">
          <img src={searchIcon} alt=""  onClick={search}/>
          </div>
          

        </div>
        {!loading && !cityNotFound && <WeatherDetails icon = {icon} temp = {temp} city={city} country = {country} lat={lat} lon ={lon} hum = {hum} wind ={wind} />}
        {loading && <div className='loading-message'>Loading...</div>}
        {cityNotFound && <div className='city-not-found'>City Not Found</div>}
        {error && <div className="error-message">{error}</div>}


        <p className='copyright'>
          Designed by <span>Ziyahid</span> 
        </p>
        
      </div>
    </>
  )
}

export default App
