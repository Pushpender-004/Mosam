import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }){
     let [city, setCity] = useState("")
     let [error, setError] = useState(false)

    const API_URL = "https://api.openweathermap.org/data/2.5/weather"
    const API_KEY = "9472f580ab51730cfc9a2880ff324f4b"

    let getWeatherInfo = async ()=>{
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
       let jsonResponse = await response.json()
    //    console.log(jsonResponse)
       let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.tempMax,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_Like,
        weather: jsonResponse.weather[0].description,
       }
       console.log(result)
       return result;
        } catch(err){
            throw err;
        }
       
    }

   
    let handlechnage = (evt) => {
        setCity(evt.target.value)
    } 
    let submitchange = async (evt)=>{
        try {
              evt.preventDefault();
        console.log(city)
        setCity("")
        let newInfo = await getWeatherInfo()
        updateInfo(newInfo)
        } catch(err){
            setError(true)
        }
      
    }
    return(
        <div className="search">
            {/* <h2>Weather app</h2> */}
            <form onSubmit={submitchange}>
                <TextField id="city" label="city Name" variant="outlined" value={city} onChange={handlechnage} />
                <br></br>
                 <Button variant="contained" onClick={submitchange}>Search</Button>
                 {error && <p style={{color: "red"}}>No such place exists!</p>}
            </form>
        </div>
    )
}