import * as jwt from "jsonwebtoken";
import * as Koa from "koa";

export const auth = async (ctx: any, next: Koa.Next) => {
  if (!ctx.headers.authorization) ctx.throw(403, "No token.");
  const token = ctx.headers.authorization.split(" ")[1];
  try {
    ctx.request.jwtPayload = jwt.verify(token, <string>process.env.JWT_SECRET);
  } catch (err) {
    ctx.throw(err.status || 403, err.text);
  }
  await next();
};
