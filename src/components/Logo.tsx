import { FileTextIcon } from "lucide-react";

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 group">
      <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-transform duration-200 group-hover:scale-105">
        <FileTextIcon className="w-4 h-4 text-white" />
      </div>
      <span className="font-bold text-foreground text-lg tracking-tight">
        PDF<span className="text-indigo-400">Kit</span>
      </span>
    </span>
  );
}
