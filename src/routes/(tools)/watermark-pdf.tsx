import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { getTool, ToolHeader } from "@/components/tool-header";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addWatermark } from "@/lib/pdf";
import { cn, downloadBlob } from "@/lib/utils";
import { type WatermarkForm, WatermarkPosition, watermarkFormSchema } from "@/models";

export const Route = createFileRoute("/(tools)/watermark-pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  const tool = getTool("/watermark-pdf");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<WatermarkForm>({
    resolver: zodResolver(watermarkFormSchema),
    defaultValues: {
      text: "CONFIDENTIAL",
      fontSize: 48,
      opacity: 0.3,
      color: "#888888",
      position: "center",
    },
  });

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  async function handleDownload(values: WatermarkForm) {
    if (!file) return;
    setIsProcessing(true);
    try {
      const blob = await addWatermark(file, values);
      downloadBlob(blob, `watermarked-${file.name}`);
    } catch (error) {
      console.error("Error adding watermark:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ToolHeader toolName="/watermark-pdf" />

        {!file ? (
          <DropZoneFileInput multiple={false} onFilesChanged={handleFileAdded} />
        ) : (
          <div className="space-y-6">
            <FileItem file={file} onRemove={() => setFile(null)} />

            <form className="space-y-6" onSubmit={form.handleSubmit(handleDownload)}>
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <p className="text-sm text-card-foreground font-medium uppercase tracking-wider">
                  Watermark Options
                </p>

                <Controller
                  control={form.control}
                  name="text"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Watermark Text</FieldLabel>
                      <Input {...field} placeholder="CONFIDENTIAL" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    control={form.control}
                    name="fontSize"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Font Size ({field.value}px)</FieldLabel>
                        <Input
                          type="range"
                          min={12}
                          max={120}
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-full"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="opacity"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Opacity ({Math.round(field.value * 100)}%)
                        </FieldLabel>
                        <Input
                          type="range"
                          min={5}
                          max={100}
                          value={Math.round(field.value * 100)}
                          onChange={(e) => field.onChange(Number(e.target.value) / 100)}
                          className="w-full"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    control={form.control}
                    name="color"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full rounded border border-border cursor-pointer"
                          />
                          <span className="font-mono">{field.value}</span>
                        </div>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="position"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Position</FieldLabel>
                        <div className="flex gap-1">
                          {WatermarkPosition.map((pos) => (
                            <Button
                              key={pos}
                              type="button"
                              variant={field.value === pos ? "default" : "outline"}
                              size="sm"
                              className={
                                field.value !== pos ? tool.classes.outlineHover : undefined
                              }
                              onClick={() => field.onChange(pos)}
                            >
                              {pos.charAt(0).toUpperCase() + pos.slice(1)}
                            </Button>
                          ))}
                        </div>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              </div>

              <Button
                size="lg"
                type="submit"
                disabled={isProcessing}
                className={cn("w-full", tool.classes.button)}
              >
                {isProcessing ? <Spinner /> : <DownloadIcon className="size-4" />}
                Add Watermark & Download
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
