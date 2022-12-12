import { protectedProcedure } from './../trpc';
import { z } from "zod";
import { Configuration, OpenAIApi } from"openai"
import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.man.findMany();
  }),
  getWomen: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.women.findMany();
  }),
  createUser: protectedProcedure.input(
    z.object({ 
      name: z.string()
    })).mutation(({ ctx, input }) => {
    return ctx.prisma.man.create({
      data: {name: input?.name}});
  }),
 removeUser: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.man.deleteMany()
 }),
 removeSpecUser: protectedProcedure.input(z.object({id: z.string()})).mutation(({ ctx, input }) => {
  return  ctx.prisma.man.delete({where: {id: input.id}})
}),
createWomen: protectedProcedure.input(
  z.object({ 
    name: z.string()
  })).mutation(({ ctx, input }) => {
  return ctx.prisma.women.create({
    data: {name: input?.name}});
}),
})
