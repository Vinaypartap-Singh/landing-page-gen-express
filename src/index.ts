import "dotenv";
import express, { Express, Request, Response, urlencoded } from "express";
import { Liquid } from "liquidjs";
import path from "path";
import { AbstractThemeOptions } from "./data/contants";
import RouteHandler from "./routes";

const app: Express = express();
const PORT = 3000;

// Liquid Template Engine

const engine = new Liquid({
  root: path.resolve(__dirname, "templates"),
  extname: ".liquid",
});

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes

app.use(RouteHandler);

app.get("/", async (req: Request, res: Response) => {
  const html = await engine.renderFile("abstract/index", AbstractThemeOptions);

  res.send(html);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
