import * as jwt from "jsonwebtoken";
import * as Koa from "koa";

export const remove = async (ctx: Koa.Context) => {
  const id = await ctx.request.body;

  const token = ctx.headers.authorization.split(" ")[1];
  const { username } = <any>jwt.verify(token, <string>process.env.JWT_SECRET);
  await ctx.mongo
    .db("usersdb")
    .collection("users")
    .updateOne({ username }, { $pull: { items: id } });
  const { items } = await ctx.mongo
    .db("usersdb")
    .collection("users")
    .findOne({ username });
  ctx.body = items.reverse();
};
