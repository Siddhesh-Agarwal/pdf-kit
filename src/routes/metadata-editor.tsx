import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/metadata-editor")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/metadata-editor"!</div>;
}
