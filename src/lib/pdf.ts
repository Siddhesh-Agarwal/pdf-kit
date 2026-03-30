import { degrees, PDFDocument, rgb } from "pdf-lib";
import type { MetadataForm, WatermarkForm } from "@/models";

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

export async function reorganizePDF(pdf: File, pageIndices: number[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.load(await pdf.arrayBuffer());
  const newPdf = await PDFDocument.create();

  // Copy pages in the specified order
  const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  return getBlob(pdfBytes);
}

export async function getMetadata(pdf: File): Promise<Partial<MetadataForm>> {
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

export async function setMetadata(pdf: File, metadata: Partial<MetadataForm>): Promise<Blob> {
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

export async function rotatePDF(
  pdf: File,
  rotations: { pageIndex: number; angle: 90 | 180 | 270 }[],
): Promise<Blob> {
  const pdfDoc = await PDFDocument.load(await pdf.arrayBuffer());
  for (const { pageIndex, angle } of rotations) {
    const page = pdfDoc.getPage(pageIndex);
    page.setRotation(degrees(angle));
  }
  const pdfBytes = await pdfDoc.save();
  return getBlob(pdfBytes);
}

export async function addWatermark(pdf: File, options: WatermarkForm): Promise<Blob> {
  const pdfDoc = await PDFDocument.load(await pdf.arrayBuffer());
  const pages = pdfDoc.getPages();
  const { text, fontSize, opacity, color, position } = options;

  const r = parseInt(color.slice(1, 3), 16) / 255;
  const g = parseInt(color.slice(3, 5), 16) / 255;
  const b = parseInt(color.slice(5, 7), 16) / 255;

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = text.length * fontSize * 0.5;

    let x: number;
    let y: number;
    let rotate = 0;

    if (position === "center") {
      x = (width - textWidth) / 2;
      y = height / 2;
    } else if (position === "diagonal") {
      x = (width - textWidth) / 2;
      y = height / 2;
      rotate = -45;
    } else {
      x = (width - textWidth) / 2;
      y = 40;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      color: rgb(r, g, b),
      opacity,
      rotate: degrees(rotate),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return getBlob(pdfBytes);
}
