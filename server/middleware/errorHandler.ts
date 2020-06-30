import * as Koa from "koa";
export const errorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
};
