import * as jwt from "jsonwebtoken";
import * as Koa from "koa";
import { Item } from "./../../../client/src/interfaces/Item";

export const edit = async (ctx: Koa.Context) => {
  const { id, value } = await ctx.request.body;
  const token = ctx.headers.authorization.split(" ")[1];
  const { username } = <any>jwt.verify(token, <string>process.env.JWT_SECRET);
  const { items } = await ctx.mongo
    .db("usersdb")
    .collection("users")
    .findOne({ username });
  const item: Item = items.find((item: Item) => item.id == id);
  item.value = value;
  await ctx.mongo
    .db("usersdb")
    .collection("users")
    .updateOne({ username }, { $set: { items } });
  ctx.body = items.reverse();
};
