import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showPopup, togglePopup] = useState(false);
  // Transform the search results object into the {latitude:52.51 , longitude:13.355} object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/peter911/cksg2hy1l0fng17s3pg32rxfp"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedLocation(result)}
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {selectedLocation.long === result.long && (
            <Popup
              latitude={result.lat}
              longitude={result.long}
              closeButton={true}
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              anchor="top"
            >
              {result.title}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
