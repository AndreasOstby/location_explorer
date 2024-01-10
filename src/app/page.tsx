"use client";

// import { getServerAuthSession } from "~/server/auth";
import { useState } from "react";
import { LocationType } from "~/server/api/routers/location";
import { api } from "~/trpc/react";
import { Line } from "./_components/Line";
import { Maps } from "./_components/Maps";
import { Sidebar } from "./_components/Sidebar";
import { Slider } from "../@/components/ui/slider";

export default function Home() {
  // const session = await getServerAuthSession();

  const [searchRadius, setSearchRadius] = useState(10000);
  const [locationSearchArea, setLocationSearchArea] = useState({
    lat: 59.9255950220818,
    lng: 10.73426445859592,
  });

  const locationGeo = api.location.geoSpatialQuery.useQuery({
    ...locationSearchArea,
    radius: searchRadius,
  });

  return (
    <main className="flex">
      <Sidebar>
        <div className="flex h-full w-full flex-col gap-4">
          <div className="m-4 flex flex-col justify-center gap-4">
            <h3>Position</h3>
            <Line />
            <Maps
              className=" aspect-square w-full max-w-[300px]"
              lat={60}
              lng={11}
              id={"SIDEBAR_MAP"}
              picker={{
                onChange: (position) => {
                  setLocationSearchArea({ ...position });
                  // locationGeo.refetch();
                },
                radius: searchRadius,
              }}
            ></Maps>
            <Slider
              defaultValue={[1000]}
              max={10_000}
              step={100}
              onValueCommit={(ev) => {
                console.log(ev[0]);
                if (!ev[0] || ev[0] === searchRadius) return;
                setSearchRadius(ev[0]);
              }}
            ></Slider>
          </div>
        </div>
      </Sidebar>
      <section className=" w-full max-w-[1200px] px-6">
        <div>
          {/* {JSON.stringify(locationGeo.data?.rows, null, 2)} */}
          {locationGeo.data &&
            (locationGeo.data.rows as LocationType[]).map((location) => (
              <div key={location.id}>
                {location.name} {location.distance} {location.coordinates}
              </div>
            ))}
          <div>
            {"" + locationGeo.isFetched}
            {locationSearchArea.lat} {locationSearchArea.lng} {searchRadius}
          </div>
        </div>
      </section>
    </main>
  );
}
