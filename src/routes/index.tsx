import { createFileRoute, Link } from "@tanstack/react-router";
import { Merge, Scissors, PackageOpen, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const tools = [
  {
    to: "/merge-pdf" as const,
    label: "Merge PDF",
    description: "Combine multiple PDFs into a single file in seconds.",
    icon: Merge,
    gradient: "from-indigo-500/20 to-indigo-600/10",
    border: "hover:border-indigo-500/60",
    iconBg: "bg-indigo-500/20 border-indigo-500/30 text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    arrow: "text-indigo-400",
  },
  {
    to: "/split-pdf" as const,
    label: "Split PDF",
    description: "Extract specific pages or split a PDF into multiple files.",
    icon: Scissors,
    gradient: "from-violet-500/20 to-violet-600/10",
    border: "hover:border-violet-500/60",
    iconBg: "bg-violet-500/20 border-violet-500/30 text-violet-400",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    arrow: "text-violet-400",
  },
  {
    to: "/compress-pdf" as const,
    label: "Compress PDF",
    description: "Reduce PDF file size while preserving quality.",
    icon: PackageOpen,
    gradient: "from-emerald-500/20 to-emerald-600/10",
    border: "hover:border-emerald-500/60",
    iconBg: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    arrow: "text-emerald-400",
  },
];

function RouteComponent() {
  return (
    <div className="min-h-screen">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Free PDF tools, no sign-up required
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight mb-6">
            Your PDF Toolkit,<br />Simplified
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Merge, split, and compress PDF files instantly — right in your browser, private and fast.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {tools.map(({ to, label, description, icon: Icon, gradient, border, iconBg, badge, arrow }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "group relative flex flex-col p-6 rounded-2xl border border-slate-700/60 backdrop-blur-sm",
                "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                "bg-gradient-to-br",
                gradient,
                border,
              )}
            >
              {/* Icon */}
              <div className={cn(
                "inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-5",
                "transition-transform duration-200 group-hover:scale-110",
                iconBg,
              )}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Label + Arrow */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-white">{label}</h2>
                <ChevronRight className={cn("w-4 h-4 transition-transform duration-200 group-hover:translate-x-1", arrow)} />
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>

              {/* Badge */}
              <div className="mt-auto">
                <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border", badge)}>
                  <Zap className="w-3 h-3" />
                  Free & instant
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
