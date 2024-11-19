import { Request, Response } from "express";
import createRouter from "../../lib/createRouter";
import { detectKeylogger } from "../../lib/detectKeylogger";

export default function detectionApiRouterV1() {
  const app = createRouter();

  app.post("/", (req: Request, res: Response): any => {
    const { appName, permissions, activityLogs } = req.body;

    if (!appName || !permissions || !activityLogs) {
      return res.status(400).json({
        message: "Invalid inputs provided",
      });
    }

    const result = detectKeylogger({
      appName,
      permissions,
      activityLogs,
    });

    return res.json({
      appName,
      isSuspicious: result.isSuspicious,
      reasons: result.reasons,
    });
  });

  return app;
}
