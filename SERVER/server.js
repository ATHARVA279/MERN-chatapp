import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;
const app = express();

import authRoute from "./Routes/auth.routes.js";
import connectMongoDb from "./db/connectMongoDb.js";
import messageRoute from "./Routes/message.routes.js";
import userRoute from "./Routes/user.routes.js";


dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  connectMongoDb();
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);
