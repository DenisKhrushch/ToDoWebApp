require("dotenv").config();
import * as Koa from "koa";
import * as cors from "@koa/cors";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";
//@ts-ignore
import * as mongo from "koa-mongo";
import { auth } from "./middleware/authenticated";
import { errorHandler } from "./middleware/errorHandler";
import { add } from "./models/items/add";
import { remove } from "./models/items/remove.item";
import { check } from "./models/items/check.item";
import { edit } from "./models/items/edit.item";
import { clearCompleted } from "./models/items/clearCompleted";
import { getList } from "./models/items/get.items.list";
import { loginUser } from "./models/users/login.user";
import { registerUser } from "./models/users/register.user";

const app: Koa = new Koa();
const router: Router = new Router();

app
  .use(errorHandler)
  .use(mongo({ uri: process.env.DB_URI }))
  .use(cors())
  .use(bodyParser())
  .use(router.routes());

router
  .get("/list", auth, getList)
  .post("/add", auth, add)
  .post("/delete", auth, remove)
  .post("/check", auth, check)
  .post("/edit", auth, edit)
  .get("/clear-completed", auth, clearCompleted)
  .post("/register", registerUser)
  .post("/login", loginUser);

app.listen(process.env.PORT);
