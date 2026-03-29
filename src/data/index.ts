import { FilePenLineIcon, MergeIcon, Repeat2Icon, ScissorsIcon } from "lucide-react";

export const tools = [
  {
    // violet
    to: "/split-pdf",
    label: "Split PDF",
    icon: ScissorsIcon,
    description: "Extract specific pages or split a PDF into multiple files.",
    gradient: "from-violet-500/20 to-violet-600/10",
    border: "hover:border-violet-500/60",
    iconBg: "bg-violet-500/20 border-violet-500/30",
    arrow: "text-violet-400",
    text: "text-violet-500/75"
  },
  {
    // indigo
    to: "/merge-pdf",
    label: "Merge PDF",
    icon: MergeIcon,
    description: "Combine multiple PDFs into a single file in seconds.",
    gradient: "from-indigo-500/20 to-indigo-600/10",
    border: "hover:border-indigo-500/60",
    iconBg: "bg-indigo-500/20 border-indigo-500/30",
    arrow: "text-indigo-400",
    text: "text-indigo-500/75"
  },
  {
    // blue
    to: "/reorganize-pdf",
    label: "Reorganize PDF",
    icon: Repeat2Icon,
    description: "Remove, Copy, and Reorder pages in a PDF.",
    gradient: "from-blue-500/20 to-blue-600/10",
    border: "hover:border-blue-500/60",
    iconBg: "bg-blue-500/20 border-blue-500/30",
    arrow: "text-blue-400",
    text: "text-blue-500/75"
  },
  {
    // green
    to: "/metadata-editor",
    label: "Metadata Editor",
    icon: FilePenLineIcon,
    description: "Edit the metadata of a PDF (title, author, subject, etc.).",
    gradient: "from-green-500/20 to-green-600/10",
    border: "hover:border-green-500/60",
    iconBg: "bg-green-500/20 border-green-500/30",
    arrow: "text-green-400",
    text: "text-green-500/75"
  },
] as const;
