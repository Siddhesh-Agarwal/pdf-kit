import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, Repeat2Icon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod/v3";
import { DropZoneFileInput } from "@/components/DropZoneFileInput";
import { FileItem } from "@/components/FileItem";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getMetadata, setMetadata } from "@/lib/pdf";
import { downloadBlob } from "@/lib/utils";

const formSchema = z
  .object({
    title: z.string(),
    author: z.string(),
    subject: z.string(),
    creator: z.string(),
    producer: z.string(),
    creationDate: z.date(),
    modificationDate: z.date(),
  })
  .partial();

export const Route = createFileRoute("/metadata-editor")({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (!file) return;
    const blob = await setMetadata(file, values);
    downloadBlob(blob, `updated-${file.name}`);
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 mb-6">
            <Repeat2Icon className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-green-500/75 bg-clip-text mb-3">
            Metadata Editor
          </h1>
          <p className="text-muted-foreground text-lg">
            Edit the metadata of a PDF (title, author, subject, etc.) in seconds.
          </p>
        </div>

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
