import * as jwt from "jsonwebtoken";
import * as Koa from "koa";

export const getList = async (ctx: Koa.Context) => {
  const token = ctx.headers.authorization.split(" ")[1];
  const { username } = <any>jwt.verify(token, <string>process.env.JWT_SECRET);
  const { items } = await ctx.mongo
    .db("usersdb")
    .collection("users")
    .findOne({ username });
  ctx.body = items.reverse();
};
