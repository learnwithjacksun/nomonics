import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";
import process from "process";
import { userRouter, authRouter, comicRouter } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cookieParser());

connectDB();

const allowedOrgins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://nomonics.netlify.app",
];
app.use(
  cors({
    origin: allowedOrgins,
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.json({
    message: "API is running ✅",
    success: true,
    status: 200,
  });
});

app.use("/v1/user", userRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/comics", comicRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
