import hr from "@tsmx/human-readable";
import { FileTextIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

export function FileItem({ file, onRemove }: { file: File; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
      <div className="flex-1 flex items-center gap-2 truncate">
        <FileTextIcon className="size-4 text-indigo-400 shrink-0" />
        <span className="text-sm text-card-foreground truncate">{file.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {hr.fromBytes(file.size, { fixedPrecision: 1 })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="w-6 h-6 text-slate-600 hover:text-red-400 hover:bg-transparent shrink-0"
        >
          <XIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
