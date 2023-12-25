import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello World 25th dec 6.45 pm!" });
});

export default routes;
