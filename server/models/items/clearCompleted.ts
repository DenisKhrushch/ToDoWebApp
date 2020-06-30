import * as jwt from "jsonwebtoken";
import * as Koa from "koa";
import { Item } from "./../../../client/src/interfaces/Item";

export const clearCompleted = async (ctx: Koa.Context) => {
  const token = ctx.headers.authorization.split(" ")[1];
  const { username } = <any>jwt.verify(token, <string>process.env.JWT_SECRET);
  const { items } = await ctx.mongo
    .db("usersdb")
    .collection("users")
    .findOne({ username });
  const filtered: Item[] = items.filter((item: Item) => item.active);
  filtered.length
    ? await ctx.mongo
        .db("usersdb")
        .collection("users")
        .updateOne({ username }, { $set: { items: filtered } })
    : await ctx.mongo
        .db("usersdb")
        .collection("users")
        .updateOne({ username }, { $set: { items: [] } });
  const updated = await ctx.mongo
    .db("usersdb")
    .collection("users")
    .findOne({ username });
  ctx.body = updated.items.reverse();
};
