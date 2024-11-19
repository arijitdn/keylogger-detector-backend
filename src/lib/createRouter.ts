import express from "express";
import helmet from "helmet";

const createRouter = () => {
  const app = express();
  app.use(express.json());
  app.use(helmet());

  return app;
};

export default createRouter;
