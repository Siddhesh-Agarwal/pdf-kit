import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import { tools } from "@/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border text-muted-foreground text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Free PDF tools, no sign-up required
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight mb-6">
            Your PDF Toolkit,
            <br />
            Simplified
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Merge, split, and compress PDF files instantly — right in your browser, private and
            fast.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map(({ to, label, description, icon: Icon, classes }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "group relative flex flex-col p-6 rounded-2xl border border-border backdrop-blur-sm",
                "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-linear-to-br",
                classes.gradient,
                classes.border,
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-5",
                  "transition-transform duration-200 group-hover:scale-110",
                  classes.iconBg,
                  classes.icon,
                )}
              >
                <Icon className={cn("w-6 h-6", classes.icon)} />
              </div>

              {/* Label + Arrow */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground">{label}</h2>
                <ChevronRightIcon
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 group-hover:translate-x-1",
                    classes.icon,
                  )}
                />
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
