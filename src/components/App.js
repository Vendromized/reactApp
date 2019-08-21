import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import Result from './Result.js';

//Klucz API openweathermap.org
const APIkey = '000205da0ce3c12b24fadaaf11e3f6ac'

class App extends Component {
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.value.length <= 2) return null
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIkey}&units=metric`;

      fetch(API)
        .then(response => {
          if (response.ok) {
            return response
          }
          throw Error("Nie udało się")
        })
        .then(response => response.json())
        .then(data => {
          const date = new Date().toLocaleString()
          this.setState(prevState => ({
            err: false,
            pressure: data.main.pressure,
            temp: data.main.temp,
            date: date,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            wind: data.wind.speed,
            city: prevState.value,
          }))
        })
        .catch(err => {
          console.log(err);
          this.setState(prevState => ({
            err: true,
            city: prevState.value
          }))
        })
    }
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <Form value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        {this.state.value.length < 3 ? null : <Result weather={this.state} />}
      </div>
    );
  }
}

export default App;