import { MergeIcon, PackageOpenIcon, ScissorsIcon } from "lucide-react";

export const navLinks = [
  {
    to: "/merge-pdf",
    label: "Merge PDF",
    icon: MergeIcon,
    description: "Combine multiple PDFs into a single file in seconds.",
  },
  {
    to: "/split-pdf",
    label: "Split PDF",
    icon: ScissorsIcon,
    description: "Extract specific pages or split a PDF into multiple files.",
  },
  {
    to: "/compress-pdf",
    label: "Compress PDF",
    icon: PackageOpenIcon,
    description: "Reduce PDF file size while preserving quality.",
  },
];