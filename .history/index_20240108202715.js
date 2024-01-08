import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

const httpServer = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL)
     .then(() => {
          console.log("MongoDB Connected !");
          httpServer.listen(port, () => {
               console.log(`Server is running on port ${port}`);
          })
     })
     .catch((err) => { console.log(err); process.exit(1); })



