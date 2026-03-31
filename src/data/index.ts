import {
  DropletsIcon,
  FilePenLineIcon,
  MergeIcon,
  Repeat2Icon,
  RotateCwIcon,
  ScissorsIcon,
} from "lucide-react";

export const tools = [
  {
    // violet
    to: "/split-pdf",
    label: "Split PDF",
    icon: ScissorsIcon,
    description: "Extract specific pages or split a PDF into multiple files.",
    classes: {
      gradient: "from-violet-500/20 to-violet-600/10",
      border: "border-violet-500/30 hover:border-violet-500/60",
      iconBg: "bg-violet-500/20 border-violet-500/30",
      icon: "text-violet-400",
      text: "text-violet-500/75",
      button: "bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/20",
      outlineHover: "hover:bg-violet-500/10",
    },
  },
  {
    // indigo
    to: "/merge-pdf",
    label: "Merge PDF",
    icon: MergeIcon,
    description: "Combine multiple PDFs into a single file in seconds.",
    classes: {
      gradient: "from-indigo-500/20 to-indigo-600/10",
      border: "border-indigo-500/30 hover:border-indigo-500/60",
      iconBg: "bg-indigo-500/20 border-indigo-500/30",
      icon: "text-indigo-400",
      text: "text-indigo-500/75",
      button: "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20",
      outlineHover: "hover:bg-indigo-500/10",
    },
  },
  {
    // blue
    to: "/reorganize-pdf",
    label: "Reorganize PDF",
    icon: Repeat2Icon,
    description: "Remove, Copy, and Reorder pages in a PDF.",
    classes: {
      gradient: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30 hover:border-blue-500/60",
      iconBg: "bg-blue-500/20 border-blue-500/30",
      icon: "text-blue-400",
      text: "text-blue-500/75",
      button: "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20",
      outlineHover: "hover:bg-blue-500/10",
    },
  },
  {
    // green
    to: "/rotate-pdf",
    label: "Rotate PDF",
    icon: RotateCwIcon,
    description: "Rotate pages in a PDF by 90°, 180°, or 270°.",
    classes: {
      gradient: "from-green-500/20 to-green-600/10",
      border: "border-green-500/30 hover:border-green-500/60",
      iconBg: "bg-green-500/20 border-green-500/30",
      icon: "text-green-400",
      text: "text-green-500/75",
      button: "bg-green-600 hover:bg-green-500 shadow-lg shadow-green-500/20",
      outlineHover: "hover:bg-green-500/10",
    },
  },
  {
    // yellow
    to: "/watermark-pdf",
    label: "Watermark PDF",
    icon: DropletsIcon,
    description: "Add a text watermark to every page of a PDF.",
    classes: {
      gradient: "from-yellow-500/20 to-yellow-600/10",
      border: "border-yellow-500/30 hover:border-yellow-500/60",
      iconBg: "bg-yellow-500/20 border-yellow-500/30",
      icon: "text-yellow-400",
      text: "text-yellow-500/75",
      button: "bg-yellow-600 hover:bg-yellow-500 shadow-lg shadow-yellow-500/20",
      outlineHover: "hover:bg-yellow-500/10",
    },
  },
  {
    // orange
    to: "/metadata-editor",
    label: "Metadata Editor",
    icon: FilePenLineIcon,
    description: "Edit the metadata of a PDF (title, author, subject, etc.).",
    classes: {
      gradient: "from-orange-500/20 to-orange-600/10",
      border: "border-orange-500/30 hover:border-orange-500/60",
      iconBg: "bg-orange-500/20 border-orange-500/30",
      icon: "text-orange-400",
      text: "text-orange-500/75",
      button: "bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-500/20",
      outlineHover: "hover:bg-orange-500/10",
    },
  },
] as const;
