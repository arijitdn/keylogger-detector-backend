import createRouter from "./lib/createRouter";
import apiV1Router from "./routes";

const app = createRouter();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json({
    message:
      "Welcome to Keylogger Detection API. Please use /api/v1 route to access the API.",
  });
});

app.use("/api/v1", apiV1Router());

app.get("*", (req, res) => {
  const routeUrl = req.url;

  res.status(404).json({
    message: `Route ${routeUrl} not found`,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
