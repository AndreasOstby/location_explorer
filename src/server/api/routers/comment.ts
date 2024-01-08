import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { comments } from "~/server/db/schema";


export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string().min(1), location_id: z.number() }))
    .mutation(async ({ ctx, input }) => {

      // TODO: check if location exists and user has access to it

      await ctx.db.insert(comments).values({
        text: input.text,
        createdById: ctx.session.user.id,
        locationId: input.location_id,
      });

    }),



  getLatest: publicProcedure
  .input(z.object({ location_id: z.number() }))
  .query(({ ctx, input }) => {
    return ctx.db.query.comments.findMany({
      orderBy: (comments, { desc}) => [desc(comments.createdAt)],
      where: ( comment, {eq}) =>  eq(comment.locationId, input.location_id) ,
      with: {
        createdBy: {
          columns: {
            name: true,
            image: true,
            isVerified: true,
          },
        },
      },
      limit: 10,
    });
  }),
});
