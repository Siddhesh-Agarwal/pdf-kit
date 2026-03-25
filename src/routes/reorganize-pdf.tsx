import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reorganize-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/reorganize-pdf"!</div>;
}
