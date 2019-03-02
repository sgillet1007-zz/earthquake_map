import React from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';

const WorldMap = props => {
	const {renderedEarthquakes, basemap, attribution, mapCenter, zoomLevel} = props.data
	const createEarthquakeMarkers = quakes => {
		return quakes && quakes.map(q => <CircleMarker key={q.id} center={[q.lat, q.long]} radius={(q.magnitude * 2)} />)
	}

	return (
		<div>
			<Map center={mapCenter} zoom={zoomLevel}>
				<TileLayer attribution={attribution} url={basemap} />
				{createEarthquakeMarkers(renderedEarthquakes)}
			</Map>
		</div>
	)  
}

export default WorldMap
