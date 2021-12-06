import { useState } from 'react'
import ReactMapGL from 'react-map-gl'

const Map = () => {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    })
    return (
        <ReactMapGL
            mapStyle="mapbox://styles/ekankamdev/ckwuxa9c808ad17o2v64yzmoz"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        ></ReactMapGL>
    )
}

export default Map
