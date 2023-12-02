import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import { ApiError } from "./middlewares/api-error.js";
import authRoute from "./routes/authRoute.js";
import classRoute from "./routes/classRoute.js";
import courseRoute from "./routes/courseRoute.js";
import departmentRoute from "./routes/departmentRoute.js";
import enrolRoute from "./routes/enrolRoute.js";
import exerciseRoute from "./routes/exerciseRoute.js";
import exerciseSubmitRoute from "./routes/exerciseSubmitRoute.js";
import roleRoute from "./routes/roleRoute.js";
import topicRoute from "./routes/topicRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import lectureRoute from "./routes/lectureRoute.js";
import userRoute from "./routes/userRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to DB
connectDB();

app.use("/api/auth", authRoute);
app.use("/api/role", roleRoute);
app.use("/api/department", departmentRoute);
app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/enrol", enrolRoute);
app.use("/api/class", classRoute);
app.use("/api/topic", topicRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/lecture", lectureRoute);
app.use("/api/exercise", exerciseRoute);
app.use("/api/exercise-submit", exerciseSubmitRoute);

app.use((req, res, next) => {
  return next(new ApiError(404, "Not found"));
});

app.use((error, req, res, next) => {
  // console.log("error: ", error);
  const message = error.message || "Error Server!";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
