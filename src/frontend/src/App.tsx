import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";
import { RootRoute } from "./routes/__root";
import { HomeRoute } from "./routes/index";
import { StudyRoute } from "./routes/study";
import { StudySeismicRoute } from "./routes/study-seismic";

const routeTree = RootRoute.addChildren([
  HomeRoute,
  StudyRoute,
  StudySeismicRoute,
]);

const router = createRouter({ routeTree, history: createHashHistory() });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
