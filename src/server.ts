import dotenv from "dotenv";
import jsonServer from "json-server";

import authRoute from "@api/routes/auth.route";
import userRoute from "@api/routes/user.route";
import todoRoute from "@api/routes/todo.route";

dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router("@api/database/database.json");
const middlewares = jsonServer.defaults({
  static: "./build",
});

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/*": "/$1",
  })
);

server.use("/auth", authRoute);

server.use("/users", userRoute);

server.use("/todos", todoRoute);

server.use(router);

server.listen(process.env.BACKEND_PORT, async () => {
  console.info(
    `The server is listening at ${process.env.BACKEND_URL} in "${process.env.NODE_ENV}" mode 🚀`
  );
});
