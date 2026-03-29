import { tools } from "@/data";
import { cn } from "@/lib/utils";

export type ToolName = (typeof tools)[number]["to"];

export function ToolHeader({ toolName }: { toolName: ToolName }) {
  const tool = tools.find((t) => t.to === toolName);
  if (!tool) throw new Error(`No tool found for name: ${toolName}`);

  const Icon = tool.icon;

  return (
    <div className="text-center mb-12">
      <div className={cn("inline-flex items-center justify-center size-16 rounded-2xl border mb-6", tool.iconBg)}>
        <Icon className={cn("w-8 h-8", tool.arrow)} />
      </div>
      <h1 className={cn("text-4xl font-bold bg-clip-text mb-3", tool.text)}>
        {tool.label}
      </h1>
      <p className="text-muted-foreground text-lg">
        {tool.description}
      </p>
    </div>
  );
}
