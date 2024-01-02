"use client";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

 
export function Maps() {
  const position = {lat: 61.2176, lng: -149.8997};

  return (
    <APIProvider apiKey={''}>
      <Map center={position} zoom={10}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}
