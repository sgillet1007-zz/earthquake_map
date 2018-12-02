import React, { Component } from 'react'
import moment from 'moment'

class EarthquakeList extends Component {
  render() {
    const quakeListItems = this.props.renderedEarthquakes.sort((a,b) => b.time - a.time).map(quake => {
        return (
          <div key={quake.id}>
              <h3>{`${moment(quake.time).format('LLL')} @ ${quake.place}`}</h3>
              <div>
              <p>{`Magnitude: ${quake.magnitude.toString()}, Lat/Long: ${quake.lat} / ${quake.long}, Depth: ${quake.depth} km`}</p>
              </div>
              <hr />
          </div>
        )}
    )
    return (
      <div id='quake-list-container'>
        {quakeListItems}
      </div>
    )
  }
}

export default EarthquakeList
