import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { getCenter } from 'geolib'

const Map = ({ searchResults }) => {
    const [selectedLocation, setSelectedLocation] = useState({})

    // Transform the search results object into the { latitude: 52.516272, longitude: 13.377722 } object
    const coordinates = searchResults?.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    // The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8,
    })

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/ekankamdev/ckwuxa9c808ad17o2v64yzmoz"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults?.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetTop={-10}
                    >
                        <p
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin"
                        >
                            📌
                        </p>
                        .
                    </Marker>
                    {/* The popup that should show if we click on a marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
