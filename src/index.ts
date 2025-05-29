import "dotenv/config";
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import { Liquid } from "liquidjs";
import path from "path";
import { AbstractThemeOptions } from "./data/contants";
import { AbstractThemeOptionsSubDomain } from "./data/subdomainData";
import RouteHandler from "./routes";

// Add subdomain type to express request
declare global {
  namespace Express {
    interface Request {
      subdomainUser?: string;
    }
  }
}

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Liquid Template Engine
const engine = new Liquid({
  root: path.resolve(__dirname, "templates"),
  extname: ".liquid",
});

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

// Subdomain detection middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host;
  const subdomain = host?.split(".")[0];

  if (
    subdomain &&
    subdomain !== "www" &&
    subdomain !== "localhost:3000" &&
    !/^\d+\.\d+\.\d+\.\d+$/.test(subdomain) // ignore IP addresses
  ) {
    req.subdomainUser = subdomain;
  }

  next();
});

// Routes
app.use(RouteHandler);

// Prepare list of valid subdomains
const validSubdomains = Object.keys(
  AbstractThemeOptionsSubDomain
) as (keyof typeof AbstractThemeOptionsSubDomain)[];

// Home route
app.get("/", async (req: Request, res: Response) => {
  const subdomain = req.subdomainUser;

  if (subdomain && validSubdomains.includes(subdomain as any)) {
    const themeData =
      AbstractThemeOptionsSubDomain[
        subdomain as keyof typeof AbstractThemeOptionsSubDomain
      ];

    const html = await engine.renderFile("abstract/index", {
      ...themeData,
      subdomain,
    });

    return res.send(html);
  }

  const html = await engine.renderFile("abstract/index", AbstractThemeOptions);
  res.send(html);
});

// Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
