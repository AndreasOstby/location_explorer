"use client";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

 
export function Maps({lat, lng}: {lat: number, lng: number}) {
  const position = {lat, lng};

  return (
    // <APIProvider apiKey={process.env.GOOGLE_MAPS_KEY!}>
      <Map center={position} zoom={15}>
        <Marker position={position} />
      </Map>
    // </APIProvider>
    // <div>Map</div>
  );
}
