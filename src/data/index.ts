import { MergeIcon, PackageOpenIcon, ScissorsIcon } from "lucide-react";

export const tools = [
  {
    to: "/merge-pdf",
    label: "Merge PDF",
    icon: MergeIcon,
    description: "Combine multiple PDFs into a single file in seconds.",
    gradient: "from-indigo-500/20 to-indigo-600/10",
    border: "hover:border-indigo-500/60",
    iconBg: "bg-indigo-500/20 border-indigo-500/30 text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    arrow: "text-indigo-400",
  },
  {
    to: "/split-pdf",
    label: "Split PDF",
    icon: ScissorsIcon,
    description: "Extract specific pages or split a PDF into multiple files.",
    gradient: "from-violet-500/20 to-violet-600/10",
    border: "hover:border-violet-500/60",
    iconBg: "bg-violet-500/20 border-violet-500/30 text-violet-400",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    arrow: "text-violet-400",
  },
  {
    to: "/compress-pdf",
    label: "Compress PDF",
    icon: PackageOpenIcon,
    description: "Reduce PDF file size while preserving quality.",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    border: "hover:border-emerald-500/60",
    iconBg: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    arrow: "text-emerald-400",
  },
];
