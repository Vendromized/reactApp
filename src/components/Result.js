import React from 'react';
import './Result.css'

const Result = (props) => {

  const { temp, date, city, sunrise, sunset, pressure, wind, err } = props.weather;
  let content = null;

  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()

  if (!err && city) {
    content = (
      <>
        <h3>Wyniki wyszukiwania dla <em>{city}</em></h3>
        <h4>Dane dla dnia i godziny: {date}</h4>
        <h4>Aktualna temperatura: {temp}&#176;C</h4>
        <h4>Wschód słońca dziś o: {sunriseTime}</h4>
        <h4>Zachód słońca dziś o: {sunsetTime}</h4>
        <h4>Ciśnienie to: {pressure} hPa</h4>
        <h4>Aktualna siła wiatru to: {wind} m/s</h4>
      </>
    )
  }

  return (
    <>
      <div className="result">
        {err ? `Nie mamy w bazie miasta ${city}` : content}
      </div>
    </>
  );
}

export default Result;