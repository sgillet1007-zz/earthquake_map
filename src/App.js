import React, { Component } from 'react';
import './App.css';
import WorldMap from './components/map';
import EarthquakeList from './components/earthquakelist';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      earthquakes: []
    }
  }

  componentDidMount() {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson')
    .then(res => res.json())
    .then(data => this.setState({ earthquakes: data.features.map(f => {
		return {
			id: f.id,
			place: f.properties.place,
			type: f.properties.type,
			time: f.properties.time,
			magnitude: f.properties.mag,
			lat: f.geometry.coordinates[1],
			long: f.geometry.coordinates[0],
			depth: f.geometry.coordinates[2],
			url: f.properties.url
		}})})
    )
  }

  render() {
    const earthquakes = this.state.earthquakes
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Earthquakes (Past 24 hours)</h1>
        </header>
        <WorldMap earthquakes={earthquakes} />
        <EarthquakeList quakes={earthquakes} />
      </div>
    );
  }
}

export default App;
