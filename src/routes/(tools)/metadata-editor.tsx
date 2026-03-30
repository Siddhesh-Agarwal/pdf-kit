import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { ToolHeader } from "@/components/tool-header";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getMetadata, setMetadata } from "@/lib/pdf";
import { downloadBlob } from "@/lib/utils";
import { type MetadataForm, metadataFormSchema } from "@/models";

export const Route = createFileRoute("/(tools)/metadata-editor")({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<MetadataForm>({
    resolver: zodResolver(metadataFormSchema),
  });

  const handleFileAdded = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setLoading(true);
      getMetadata(newFiles[0]).then((metadata) => {
        form.reset({
          title: metadata.title,
          author: metadata.author,
          subject: metadata.subject,
          creator: metadata.creator,
          producer: metadata.producer,
          creationDate: metadata.creationDate,
          modificationDate: metadata.modificationDate,
        });
        setLoading(false);
      });
    }
  };

  async function handleSubmit(values: MetadataForm) {
    if (!file) return;
    const blob = await setMetadata(file, values);
    downloadBlob(blob, `updated-${file.name}`);
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <ToolHeader toolName="/metadata-editor" />

        {/* Drop Zone */}
        {!file ? (
          <DropZoneFileInput multiple={false} onFilesChanged={handleFileAdded} />
        ) : (
          <div className="space-y-6">
            <FileItem file={file} onRemove={() => setFile(null)} />
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2Icon className="w-8 h-8 text-green-400 animate-spin" />
              </div>
            ) : (
              <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    control={form.control}
                    name="title"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="author"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Author</FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="subject"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="creator"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Creator</FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="producer"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Producer</FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="creationDate"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Creation Date</FieldLabel>
                        <DateInput
                          id={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="modificationDate"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Modification Date</FieldLabel>
                        <DateInput
                          id={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Update Metadata
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
