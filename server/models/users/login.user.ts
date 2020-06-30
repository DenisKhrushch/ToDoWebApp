import * as jwt from "jsonwebtoken";
import * as Koa from "koa";
import * as bcrypt from "bcrypt";

export const loginUser = async (ctx: Koa.Context) => {
  const { username, password } = await ctx.request.body;
  const user = await ctx.mongo
    .db("usersdb")
    .collection("users")
    .findOne({ username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(user, <string>process.env.JWT_SECRET);
      ctx.body = { token: token };
    } else {
      ctx.response.status = 400;
      ctx.body = { MESSAGE: "INCORRECT PASSWORD OR USERNAME" };
    }
  } else {
    ctx.response.status = 400;
    ctx.body = { MESSAGE: "INCORRECT PASSWORD OR USERNAME" };
  }
};
