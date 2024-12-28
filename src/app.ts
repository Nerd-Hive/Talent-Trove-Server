import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import type { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { authRouter } from "./api/auth/auth.route";
import { jobApplicationRouter } from "./api/job_application/job_application.route";
import { jobRouter } from "./api/job/job.route";
import { userRouter } from "./api/profile/profile.route";
import { winstonLogger } from "./config";
import { PORT } from "./config/envs";
import {
  globalErrorHandler,
  globalNotFoundHandler,
} from "./middlewares/common";
import swaggerDocs from "./swagger";

export const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/job-applications", jobApplicationRouter);
app.get("/", (req: Request, res: Response) => {
  winstonLogger.info("Log: ");
  res.status(200).json({ data: "Hello, world!" });
});

app.use(globalNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
