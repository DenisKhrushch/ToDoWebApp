import * as bcrypt from "bcrypt";
import * as Koa from "koa";

export const registerUser = async (ctx: Koa.Context) => {
  const { name, surname, username, password } = await ctx.request.body;
  const user = await ctx.mongo
    .db("usersdb")
    .collection("users")
    .findOne({ username });
  if (user) {
    ctx.response.status = 400;
    ctx.body = { MESSAGE: "USER HAS ALREADY EXISTS" };
  } else {
    const hash = bcrypt.hashSync(password, 10);
    await ctx.mongo
      .db("usersdb")
      .collection("users")
      .insertOne({ name, surname, username, password: hash, items: [] });
    ctx.response.status = 201;
    ctx.body = { MESSAGE: "USER WAS CREATED" };
  }
};
