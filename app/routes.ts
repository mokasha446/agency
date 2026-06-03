import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("careers", "routes/careers.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("services/:id", "routes/services.$id.tsx"),
] satisfies RouteConfig;
