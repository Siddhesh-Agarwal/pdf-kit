import { PDFDocument } from "pdf-lib";

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

  return new Blob([mergedBytes as BlobPart], { type: "application/pdf" });
}

export async function splitPDF(pdf: File, pageNumbers: number[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.load(await pdf.arrayBuffer());
  const copiedPages = await pdfDoc.copyPages(pdfDoc, pageNumbers);
  const mergedPdf = await PDFDocument.create();
  copiedPages.forEach((page) => mergedPdf.addPage(page));
  const mergedBytes = await mergedPdf.save();

  return new Blob([mergedBytes as BlobPart], { type: "application/pdf" });
}
