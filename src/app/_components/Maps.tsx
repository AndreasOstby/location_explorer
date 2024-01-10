"use client";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function Maps({
  lat,
  lng,
  id,
  className,
  picker,
}: {
  lat: number;
  lng: number;
  id: string;
  className?: string;
  picker?: {
    onChange: (position: { lat: number; lng: number }) => void;
    radius: number;
  };
}) {
  const [position, setPosition] = useState({ lat, lng });
  const [radiusCircle, setRadiusCircle] = useState<
    google.maps.Circle | undefined
  >(undefined);

  const map = useMap(id);

  useLayoutEffect(() => {
    if (!map) return;
    if (!picker) return;

    setRadiusCircle(
      new google.maps.Circle({
        fillColor: "blue",
        strokeColor: "blue",
        fillOpacity: 0.3,
        strokeOpacity: 0.3,
        strokeWeight: 5,
        map,
        center: position,
        radius: picker.radius,
        editable: false,
        clickable: false,
      }),
    );
  }, [map]);

  useLayoutEffect(() => {
    if (!map || !picker) return;

    radiusCircle?.setCenter(position);
  }, [position]);
  useLayoutEffect(() => {
    if (!map || !picker) return;

    radiusCircle?.setRadius(picker.radius);
  }, [picker?.radius]);
  return (
    <Map
      className={className}
      center={{ lat, lng }}
      zoom={12}
      onClick={(ev) => {
        if (!ev.detail.latLng || !picker) return;
        setPosition({ lat: ev.detail.latLng.lat, lng: ev.detail.latLng.lng });
        picker.onChange(position);
      }}
      id={id}
    >
      <Marker position={position} />
    </Map>
    // <></>
  );
}
