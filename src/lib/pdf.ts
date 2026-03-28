import { PDFDocument } from "pdf-lib";

function getBlob(mergedBytes: Uint8Array<ArrayBufferLike>) {
  const arr = new Uint8Array(mergedBytes);
  return new Blob([arr], { type: "application/pdf" });
}

export async function mergePDFs(pdfs: File[]): Promise<Blob> {
  if (pdfs.length === 0) {
    return new Blob([], { type: "application/pdf" });
  }
  const mergedPdf = await PDFDocument.create();
  for (const pdf of pdfs) {
    const arrayBuffer = await pdf.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  const mergedBytes = await mergedPdf.save();
  return getBlob(mergedBytes);
}

export async function splitPDF(pdf: File, pageNumbers: number[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.load(await pdf.arrayBuffer());
  const mergedPdf = await PDFDocument.create();
  const copiedPages = await mergedPdf.copyPages(pdfDoc, pageNumbers);
  copiedPages.forEach((page) => mergedPdf.addPage(page));
  const mergedBytes = await mergedPdf.save();
  return getBlob(mergedBytes);
}

export type Metadata = {
  author: string;
  title: string;
  subject: string;
  creator: string;
  producer: string;
  creationDate: Date;
  modificationDate: Date;
};

export async function getMetadata(pdf: File): Promise<Partial<Metadata>> {
  const pdfDoc = await PDFDocument.load(await pdf.arrayBuffer());
  return {
    author: pdfDoc.getAuthor(),
    title: pdfDoc.getTitle(),
    subject: pdfDoc.getSubject(),
    creator: pdfDoc.getCreator(),
    producer: pdfDoc.getProducer(),
    creationDate: pdfDoc.getCreationDate(),
    modificationDate: pdfDoc.getModificationDate(),
  };
}

export async function setMetadata(pdf: File, metadata: Partial<Metadata>): Promise<Blob> {
  const pdfDoc = await PDFDocument.load(await pdf.arrayBuffer());
  if (metadata.author) pdfDoc.setAuthor(metadata.author);
  if (metadata.title) pdfDoc.setTitle(metadata.title);
  if (metadata.subject) pdfDoc.setSubject(metadata.subject);
  if (metadata.creator) pdfDoc.setCreator(metadata.creator);
  if (metadata.producer) pdfDoc.setProducer(metadata.producer);
  if (metadata.creationDate) pdfDoc.setCreationDate(metadata.creationDate);
  if (metadata.modificationDate) pdfDoc.setModificationDate(metadata.modificationDate);
  const mergedBytes = await pdfDoc.save();
  return getBlob(mergedBytes);
}
