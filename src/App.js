import React, { Component } from 'react';
import './App.css';
import WorldMap from './components/map';
import EarthquakeList from './components/earthquakelist';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      earthquakes: [],
      renderedEarthquakes: []
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
    }}).sort((a, b) => a.time - b.time)
    })
    )

    this.timerID = setInterval(
			() => this.tick(),
			900
		);

  }

	componentWillUnmount(){
		clearInterval(this.timerID);
  }
  
  tick =() => {
		let currentIndex = this.state.renderedEarthquakes.length;
		if(this.state.renderedEarthquakes.length < this.state.earthquakes.length){
			const nextQuake = this.state.earthquakes[currentIndex];
			this.setState({ 
				renderedEarthquakes: this.state.renderedEarthquakes.concat(nextQuake)
			})
		}
  }

  render() {
    const worldMapData = {
      basemap : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png',
      attribution : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      mapCenter : [37, -30],
      zoomLevel : 2,
      renderedEarthquakes: this.state.renderedEarthquakes
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Earthquakes (Past 24 hours)</h1>
        </header>
        <WorldMap data={worldMapData} />
        <EarthquakeList renderedEarthquakes={this.state.renderedEarthquakes} />
      </div>
    );
  }
}

export default App;
