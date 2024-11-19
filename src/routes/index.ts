import createRouter from "../lib/createRouter";
import generalApiRouterV1 from "./general";
import detectionApiRouterV1 from "./detection";

export default function apiV1Router() {
  const app = createRouter();

  app.use("/", generalApiRouterV1());
  app.use("/detect", detectionApiRouterV1());

  return app;
}
