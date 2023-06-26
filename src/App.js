import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import rainBg from "./assets/rain.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setbg] = useState(hotBg);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      const threshold = units ==='metric'?20:60;
      if(data.description === "overcast clouds" || data.description ==="scattered clouds" || data.description ==="moderate rain" || data.description ==="shower rain" || data.description ==="rain" || data.description ==="thunderstorm") setbg(rainBg);
      else if(data.temp <= threshold) setbg(coldBg);
      else setbg(hotBg);

    };


    fetchWeatherData();
  }, [units,city]);

  const handleUnitsClick = (e) => {
    const button = e.target;
    // console.log(button.innerrText)
    const currentUnit = button.innerText;

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "F" : "C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {

    if (e.keyCode === 13) {
      setCity(e.target.value);
      e.target.blur();
    }
    
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input type="text" onKeyDown={enterKeyPressed} name="city" placeholder="Enter City" />
              <button onClick={(e) => handleUnitsClick(e)}>F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>
                  {weather.name}, {weather.country}
                </h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  {weather.temp.toFixed()} °{units === "metric" ? "C" : "F"}
                </h1>
              </div>
            </div>

            {/* desc */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
