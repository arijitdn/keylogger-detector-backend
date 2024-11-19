import createRouter from "./lib/createRouter";
import apiV1Router from "./routes";

const app = createRouter();
const port = process.env.PORT || 3000;

app.use("/api/v1", apiV1Router());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
