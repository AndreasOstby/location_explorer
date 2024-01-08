"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export function Maps({ lat, lng }: { lat: number; lng: number }) {
  const position = { lat, lng };

  return (
    <Map center={position} zoom={12}>
      <Marker position={position} />
    </Map>
    // <></>
  );
}
