import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';

const CartoDB_PositronNoLabels = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png';
const CartoDB_attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
const mapCenter = [37, -30];
const zoomLevel = 2;

class WorldMap extends Component {

	createEarthquakeMarkers = quakes => {
		 return quakes.map(q => <CircleMarker key={q.id} center={[q.lat, q.long]} radius={(q.magnitude * 2)} />)
	}
	
	render() {
	    return (
	        <div>
	            <Map center={mapCenter} zoom={zoomLevel}>
	                <TileLayer attribution={CartoDB_attribution} url={CartoDB_PositronNoLabels} />
					{this.createEarthquakeMarkers(this.props.renderedEarthquakes)}
	            </Map>
	        </div>
	    )
    }
}

export default WorldMap
