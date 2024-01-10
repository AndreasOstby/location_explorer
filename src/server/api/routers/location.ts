import { sql } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure
} from "~/server/api/trpc";
import { locations } from "~/server/db/schema";

export type LocationType = typeof locations.$inferSelect & {
  distance: number;
};

export const locationRouter = createTRPCRouter({

  geoSpatialQuery: publicProcedure
  .input(z.object({ lat: z.number(), lng: z.number(), radius: z.number() }))
  .query(async ({ ctx, input }) => {
    const result = await ctx.db.execute<typeof locations>(sql`SELECT *, ST_Distance_Sphere(ST_GeomFromText(coordinates), ST_GeomFromText('POINT(${input.lat} ${input.lng})')) AS distance
      FROM location_explorer_location
      WHERE ST_Distance_Sphere(ST_GeomFromText(coordinates), ST_GeomFromText('POINT(${input.lat} ${input.lng})')) < ${input.radius}
      ORDER BY distance 
      LIMIT 10;`);
    return result;

  }
  ),
});