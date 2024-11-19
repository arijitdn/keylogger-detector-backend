import createRouter from "../../lib/createRouter";

export default function generalApiRouterV1() {
  const app = createRouter();

  app.get("/health", (_req, res): any => {
    return res.json({
      message: "API is healthy and online...",
    });
  });

  return app;
}
