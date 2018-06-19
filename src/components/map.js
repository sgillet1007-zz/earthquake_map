import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';

const CartoDB_PositronNoLabels = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png';
const CartoDB_attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
const mapCenter = [37, -30];
const zoomLevel = 2;
const earthquakeCircles = qs => {
    return qs.map(q =>(
        <CircleMarker key={q.id} center={[q.lat, q.long]} radius={(q.magnitude * 2)} />
    ))
}

class WorldMap extends Component {
    render() {
	    return (
	        <div>
	            <Map center={mapCenter} zoom={zoomLevel}>
	                <TileLayer attribution={CartoDB_attribution} url={CartoDB_PositronNoLabels} />
	                {earthquakeCircles(this.props.earthquakes)}
	            </Map>
	        </div>
	    )
    }
}

export default WorldMap
