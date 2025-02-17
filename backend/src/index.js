import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/db-connect.js";
import transactionRoutes from "./routes/transaction-routes.js";
import path from "path";
import http from "http";

dotenv.config();
const app = express();
const port = process.env.PORT ;
const __dirname = path.resolve();




app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", transactionRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
