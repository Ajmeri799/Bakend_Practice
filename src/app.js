import express from "express";
// aN1VkaIEGrOC27bA db pass
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//import routes
import healthcheckRouter from "./controllers/healthcheck.controllers.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errors.middlewares.js";
//routes
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);
export { app };
