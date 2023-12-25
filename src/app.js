import express from "express";
import cors from "cors";
import morgan from "morgan";
import cowsay from "cowsay";

import * as middleware from "./utils/middleware.js";
import helloRoute from "./routes/helloRouter.js";

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// request logger middleware
app.use(morgan("tiny"));

// healthcheck endpoint
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.use("/hello", helloRoute);

app.get("/:text", function (req, res) {
  let text;

  try {
    text = req.params.text;
  } catch (e) {
    text = "Hi Awesome People!";
  }
  const responseText = `
    <pre>${cowsay.say({ text })}</pre>
    <br/><br/>
  `;

  res.send(responseText);
});

// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
