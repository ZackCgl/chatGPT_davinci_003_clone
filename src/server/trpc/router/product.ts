import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.man.findMany();
  }),
  createUser: publicProcedure.input(
    z.object({ 
      name: z.string()
    })).mutation(({ ctx, input }) => {
    return ctx.prisma.man.create({
      data: {name: input?.name}});
  }),
 removeUser: publicProcedure.mutation(({ ctx }) => {
    return ctx.prisma.man.deleteMany()
 }),
 removeSpecUser: publicProcedure.input(z.object({id: z.string()})).mutation(({ ctx, input }) => {
  return  ctx.prisma.man.delete({where: {id: input.id}})
})});
