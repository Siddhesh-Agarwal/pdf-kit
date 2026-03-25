import { MergeIcon, ScissorsIcon } from "lucide-react";

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
];
