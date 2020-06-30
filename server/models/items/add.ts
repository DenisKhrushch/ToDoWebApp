import * as jwt from "jsonwebtoken";
import * as Koa from "koa";
import { Item } from "./../../../client/src/interfaces/Item";

export const add = async (ctx: Koa.Context) => {
  const item: Item = await ctx.request.body;
  item.id = Date.now();
  item.active = true;
  const token = ctx.headers.authorization.split(" ")[1];
  const { username } = <any>jwt.verify(token, <string>process.env.JWT_SECRET);
  await ctx.mongo
    .db("usersdb")
    .collection("users")
    .updateOne({ username }, { $push: { items: item } });
  const { items } = await ctx.mongo
    .db("usersdb")
    .collection("users")
    .findOne({ username });
  ctx.body = items.reverse();
};
