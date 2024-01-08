import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);
