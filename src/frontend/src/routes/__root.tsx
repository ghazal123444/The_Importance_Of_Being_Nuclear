import { Layout } from "@/components/Layout";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const RootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
